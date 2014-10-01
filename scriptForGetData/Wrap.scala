package bundle

import scala.collection.immutable


object Wrap {

  import scalaj.http.{HttpOptions, Http}
  import java.io.FileWriter
  import scala.xml.{Elem, XML}
  import scala.concurrent._
  import scala.concurrent.duration._

  implicit val formats = org.json4s.DefaultFormats

  import scala.Some

  import scala.collection.immutable.Iterable

  import ExecutionContext.Implicits.global
  import java.net.URLEncoder

  import JsonExtractor._

  case class XmlSFData(title: String, year: String, location: String, fun: String, comp: String,
                       distributor: String, director: String, writer: String, actor1: String, actor2: String,
                       actor3: String, uuid: String, coordinates: Option[(String, String)] = None)


  def fromXml(node: scala.xml.Node): XmlSFData = {
    val title = (node \ "title").text
    val year = (node \ "release_year").text
    val location = (node \ "locations").text
    val fun = (node \ "fun_facts").text
    val comp = (node \ "production_company").text
    val distributor = (node \ "distributor").text
    val director = (node \ "director").text
    val writer = (node \ "writer").text
    val actor1 = (node \ "actor_1").text
    val actor2 = (node \ "actor_2").text
    val actor3 = (node \ "actor_3").text
    val uuid = node.attribute("_uuid").get.text

    XmlSFData(title, year, location, fun, comp, distributor, director, writer,
      actor1, actor2, actor3, uuid)
  }

  @annotation.tailrec
  def retry[T](n: Int)(fn: => T): T = {
    scala.util.Try {
      fn
    } match {
      case scala.util.Success(x) => x
      case _ if n > 1 => retry(n - 1)(fn)
      case scala.util.Failure(e) => throw e
    }
  }

  def getCoordinatesYQL(m: XmlSFData) = {
    def isEmpty(s: String) = s == null || s == ""
    YQL( s"""select * from geo.placefinder where text="${m.location}" """.toString)
      .map(xml.XML.loadString)
      .map {
      xml =>
        val latitude = (xml \\ "results" \\ "latitude").text
        val longitude = (xml \\ "results" \\ "longitude").text

        if (isEmpty(longitude) || isEmpty(latitude)) (m, None)
        else (m, Some(latitude, longitude))
    }
  }

  def YQL(query: String) = {
    val url = "http://query.yahooapis.com/v1/public/yql"

    Future {
      blocking {
        retry(4) {
          Http(url).params("format" -> "xml", "q" -> query)
            .option(HttpOptions.connTimeout(1000 * 60 * 20))
            .option(HttpOptions.readTimeout(1000 * 60 * 35)).asString
        }
      }
    }
  }


  def getImage4Actor(s: String) = {
    def encodeURIComponent(originalS: String) = {
      val encodeString: String =
        try {
          URLEncoder.encode(originalS, "UTF-8")
            .replaceAll("\\+", "%20")
            .replaceAll("\\%21", "!")
            .replaceAll("\\%27", "'")
            .replaceAll("\\%28", "(")
            .replaceAll("\\%29", ")")
            .replaceAll("\\%7E", "~")
        } catch {
          case e: Throwable => {
            println("error formating")
            ""
          }
        }
      encodeString
    }


    val q = s"""select * from html where url="http://en.wikipedia.org/wiki/$s"  xpath="//*[@id="mw-content-text"]/table/tbody/tr[2]/td/a/img" """

    YQL(encodeURIComponent(q))
  }


  object JsonMaker {

    import org.json4s.native.JsonMethods._
    import org.json4s.JsonDSL.WithDouble._
    import org.json4s.native.Serialization.{read, write}

    def using[A <: {def close() : Unit}, B](param: A)(f: A => B): B =
      try {
        f(param)
      } finally {
        param.close()
      }


    def writeToFile(fileName: String, data: String) =
      retry(10) {
        using(new FileWriter(fileName)) {
          fileWriter => fileWriter.write(data)
        }
      }

    case class MovieData(sfdata: Seq[XmlSFData], tomatodata: ExtractorJson)

    def makeMoviesJson(movies: Map[String, (scala.Seq[XmlSFData], ExtractorJson)]) = {

      val __movies = movies.map {
        case (title, (sfdatas, jsonTomate)) =>
          title -> MovieData(sfdatas, jsonTomate)
      }.toMap

      val movJson = write(__movies)
      writeToFile("moviesComplete.json", movJson)
      movJson
    }

    def makeActorsJson(actors: List[(String, String)]) = {
      val _actors = actors.map {
        case (k, v) => k -> v
      }.toMap

      val actorJson = compact(render(_actors))
      writeToFile("actors.json", actorJson)
      actorJson
    }
  }


  object StartRequest {

    import JsonMaker._

    val data = XML.load("https://data.sfgov.org/api/views/yitu-d5am/rows.xml?accessType=DOWNLOAD")
    val movieNodes = (data \ "row" \ "row")


    def _reqYQLCoord(nodos: scala.xml.NodeSeq): Map[String, immutable.Seq[XmlSFData]] = {
      val _r = nodos
        .map(fromXml)
        .filter {
        m => m.location != "" && m.location != null
      }.map(getCoordinatesYQL)

      Await.result(Future.sequence(_r), Duration.Inf)
        .map {
        case (ob, loc) => ob.copy(coordinates = loc)
      }
        .groupBy(_.title)
    }


    def reqTomatosYQLAppend(_reqYQL: Map[String, Seq[Wrap.XmlSFData]]) =
      _reqYQL.map {
        case (k, v) =>
          val tomatoResponse = dataMovieFromTomatoApi(k)
          k ->(v, tomatoResponse)
      }
        .filter {
        case ((_, (_, tomato))) => tomato.nonEmpty
      }
        .map {
        case (k, (y, t)) => k ->(y, t.get)
      }

    def movieFinalResult(reqTmto: Map[String, (scala.Seq[XmlSFData], ExtractorJson)]) = makeMoviesJson(reqTmto)
  }

  //-----------------------------------------------------------------------------------------------------------------------------------


  object JsonExtractor {

    import org.json4s._
    import org.json4s.native.JsonMethods._


    implicit val formats = DefaultFormats


    case class Valoration(critics_rating: Option[String], critics_score: Option[Int],
                          audience_rating: Option[String], audience_score: Option[Int])

    case class Poster(thumbnail: Option[String], profile: Option[String],
                      detailed: Option[String], original: Option[String])

    case class Actor(name: Option[String], characters: Option[List[String]])

    case class Link(alternate: Option[String])

    case class ExtractorJson(year: Option[Int], synopsis: Option[String], ratings: Option[Valoration],
                             posters: Option[Poster], abridged_cast: Option[List[Actor]], links: Option[Link])


    def dataMovieFromTomatoApi(movieTitle: String) = {
      //NEED REFACTOR--->REPLACE DIJON JSON FOR JSON4s
      def tomatoesApi(query: String) = {
        val url =
          "http://api.rottentomatoes.com/api/public/v1.0/movies.json?" +
            "apikey=yfc5seqbm688kqewcpq8zsxc"
        Thread.sleep(120) //necessary cause limitation number request per second from the api
        retry(4) {
          Http(url).params("q" -> query, "page limit" -> "1")
            .option(HttpOptions.connTimeout(1000 * 60 * 20))
            .option(HttpOptions.readTimeout(1000 * 60 * 35)).asString
        }
      }


      val json = try {
        val _json = ((parse(tomatoesApi(movieTitle))) \\ "movies")(0)
        Some(_json.extract[ExtractorJson])
      } catch {
        case e: Exception => println("error obteniendo valores " + e)
          None
      }


      json
    }
  }

}






