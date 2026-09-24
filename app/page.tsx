import Link from "next/link";
import {
  Clapperboard,
  Search,
  Heart,
  Library,
  ArrowRight,
  Drama,
  Laugh,
  Zap,
  Rocket,
  Swords,
  Ghost,
  Skull,
  HeartHandshake,
  WandSparkles,
  Shield,
  Baby,
  Star,
  Sparkles,
  TrendingUp,
} from "lucide-react";

type Serie = {
  id: number;
  name: string;
  image?: {
    medium: string;
    original: string;
  };
  genres: string[];
  premiered?: string;
  rating?: {
    average: number | null;
  };
};

async function obtenerSeriesDestacadas(): Promise<Serie[]> {
  const ids = [169, 2993, 465];

  try {
    const resultados = await Promise.all(
      ids.map(async (id) => {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`, {
          cache: "force-cache",
        });

        if (!response.ok) {
          throw new Error("No se pudo obtener la serie.");
        }

        return response.json();
      }),
    );

    return resultados;
  } catch {
    return [];
  }
}

// Obtiene las series con mejor calificacion
async function obtenerSeriesMejorCalificadas(): Promise<Serie[]> {
  try {
    const response = await fetch("https://api.tvmaze.com/shows", {
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error("No se pudieron obtener las series.");
    }

    const series: Serie[] = await response.json();

    return series
      .filter((serie) => serie.rating?.average)
      .sort((a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0))
      .slice(0, 4);
  } catch {
    return [];
  }
}

// Obtiene una seleccion de series populares
async function obtenerSeriesPopulares(): Promise<Serie[]> {
  try {
    const response = await fetch("https://api.tvmaze.com/shows", {
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error("No se pudieron obtener las series.");
    }

    const series: Serie[] = await response.json();

    return series.slice(0, 4);
  } catch {
    return [];
  }
}

export default async function Home() {
  const [seriesDestacadas, seriesMejorCalificadas, seriesPopulares] =
    await Promise.all([
      obtenerSeriesDestacadas(),
      obtenerSeriesMejorCalificadas(),
      obtenerSeriesPopulares(),
    ]);

  return (
    <main className="home">
      {/* Hero principal */}

      <section className="hero">
        <div className="heroContent">
          <p className="subtitle">
            <Clapperboard size={18} />
            SERIES EXPLORER
          </p>

          <h1>
            Encuentra tu próxima
            <span> serie favorita</span>
          </h1>

          <p className="description">
            Explora series, descubre nuevos títulos y guarda tus favoritas en un
            solo lugar.
          </p>

          <Link href="/series" className="exploreButton">
            <Search size={20} />
            Explorar series
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="posterArea">
          {seriesDestacadas.length > 0 ? (
            seriesDestacadas.map((serie, index) => (
              <Link
                key={serie.id}
                href={`/serie/${serie.id}`}
                className={`poster poster${index + 1}`}
              >
                {serie.image ? (
                  <img
                    src={serie.image.original}
                    alt={`Póster de ${serie.name}`}
                  />
                ) : (
                  <div className="posterPlaceholder">
                    <Clapperboard size={40} />
                    <span>{serie.name}</span>
                  </div>
                )}
              </Link>
            ))
          ) : (
            <div className="posterFallback">
              <Clapperboard size={70} strokeWidth={1.5} />
            </div>
          )}
        </div>
      </section>

      {/* Funciones principales */}

      <section className="features">
        <div className="feature">
          <div className="featureIcon">
            <Search size={38} strokeWidth={1.8} />
          </div>

          <h2>Busca series</h2>

          <p>
            Encuentra rápidamente tus series favoritas mediante nuestro
            buscador.
          </p>
        </div>

        <div className="feature">
          <div className="featureIcon">
            <Heart size={38} strokeWidth={1.8} />
          </div>

          <h2>Guarda favoritas</h2>

          <p>
            Guarda las series que más te gustan para consultarlas cuando
            quieras.
          </p>
        </div>

        <div className="feature">
          <div className="featureIcon">
            <Library size={38} strokeWidth={1.8} />
          </div>

          <h2>Conoce cada serie</h2>

          <p>
            Consulta información como género, estreno, idioma, duración y
            calificación.
          </p>
        </div>
      </section>

      {/* Series mejor calificadas */}

      <section className="seriesSection">
        <div className="sectionTitle">
          <span></span>

          <div className="sectionHeading">
            <Star size={25} />

            <h2>Series mejor calificadas</h2>
          </div>

          <p>Descubre algunas de las series con las mejores calificaciones.</p>
        </div>

        <div className="homeSeriesGrid">
          {seriesMejorCalificadas.map((serie) => (
            <Link
              key={serie.id}
              href={`/serie/${serie.id}`}
              className="homeSeriesCard"
            >
              <div className="homeSeriesImage">
                {serie.image ? (
                  <img
                    src={serie.image.medium}
                    alt={`Imagen de ${serie.name}`}
                  />
                ) : (
                  <Clapperboard size={40} />
                )}
              </div>

              <div className="homeSeriesInfo">
                <h3>{serie.name}</h3>

                <div className="homeSeriesRating">
                  <Star size={16} fill="currentColor" />

                  <span>{serie.rating?.average ?? "Sin calificacion"}</span>
                </div>

                {serie.premiered && <p>{serie.premiered.substring(0, 4)}</p>}
              </div>
            </Link>
          ))}
        </div>

        <div className="sectionButtonContainer">
          <Link href="/series" className="sectionButton">
            Ver todas las series
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Series populares */}

      <section className="seriesSection popularSection">
        <div className="sectionTitle">
          <span></span>

          <div className="sectionHeading">
            <TrendingUp size={25} />

            <h2>Series populares</h2>
          </div>

          <p>
            Explora algunas de las series disponibles en nuestra plataforma.
          </p>
        </div>

        <div className="homeSeriesGrid">
          {seriesPopulares.map((serie) => (
            <Link
              key={serie.id}
              href={`/serie/${serie.id}`}
              className="homeSeriesCard"
            >
              <div className="homeSeriesImage">
                {serie.image ? (
                  <img
                    src={serie.image.medium}
                    alt={`Imagen de ${serie.name}`}
                  />
                ) : (
                  <Clapperboard size={40} />
                )}
              </div>

              <div className="homeSeriesInfo">
                <h3>{serie.name}</h3>

                {serie.genres.length > 0 && (
                  <p>{serie.genres.slice(0, 2).join(" • ")}</p>
                )}

                {serie.rating?.average && (
                  <div className="homeSeriesRating">
                    <Star size={16} fill="currentColor" />

                    <span>{serie.rating.average}</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="sectionButtonContainer">
          <Link href="/series" className="sectionButton">
            Explorar catalogo
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Explorar por genero */}

      <section className="genresSection">
        <div className="sectionTitle">
          <span></span>

          <h2>Explora por género</h2>

          <p>
            Encuentra series de diferentes géneros y descubre nuevos títulos.
          </p>
        </div>

        <div className="genreCards">
          <div className="genreCard">
            <div className="genreIcon dramaIcon">
              <Drama size={28} />
            </div>

            <h3>Drama</h3>

            <p>
              Historias intensas, emocionales y llenas de personajes
              interesantes.
            </p>
          </div>

          <div className="genreCard">
            <div className="genreIcon comedyIcon">
              <Laugh size={28} />
            </div>

            <h3>Comedia</h3>

            <p>Series divertidas para entretenerte y pasar un buen momento.</p>
          </div>

          <div className="genreCard">
            <div className="genreIcon actionIcon">
              <Zap size={28} />
            </div>

            <h3>Accion</h3>

            <p>Aventuras, desafios y situaciones llenas de emocion.</p>
          </div>

          <div className="genreCard">
            <div className="genreIcon scienceIcon">
              <Rocket size={28} />
            </div>

            <h3>Ciencia ficcion</h3>

            <p>Tecnologia, espacio y mundos imaginarios que explorar.</p>
          </div>

          <div className="genreCard">
            <div className="genreIcon adventureIcon">
              <Swords size={28} />
            </div>

            <h3>Aventura</h3>

            <p>Viajes, descubrimientos y experiencias llenas de emocion.</p>
          </div>

          <div className="genreCard">
            <div className="genreIcon thrillerIcon">
              <Ghost size={28} />
            </div>

            <h3>Thriller</h3>

            <p>Misterios, suspenso y situaciones que mantienen la intriga.</p>
          </div>

          <div className="genreCard">
            <div className="genreIcon horrorIcon">
              <Skull size={28} />
            </div>

            <h3>Terror</h3>

            <p>Historias sobrenaturales y situaciones que generan suspenso.</p>
          </div>

          <div className="genreCard">
            <div className="genreIcon romanceIcon">
              <HeartHandshake size={28} />
            </div>

            <h3>Romance</h3>

            <p>
              Historias centradas en relaciones, sentimientos y conexiones entre
              personajes.
            </p>
          </div>

          <div className="genreCard">
            <div className="genreIcon fantasyIcon">
              <WandSparkles size={28} />
            </div>

            <h3>Fantasia</h3>

            <p>Mundos fantasticos, magia y aventuras fuera de lo cotidiano.</p>
          </div>

          <div className="genreCard">
            <div className="genreIcon crimeIcon">
              <Shield size={28} />
            </div>

            <h3>Crimen</h3>

            <p>
              Investigaciones, casos y personajes relacionados con diferentes
              delitos.
            </p>
          </div>

          <div className="genreCard">
            <div className="genreIcon mysteryIcon">
              <Search size={28} />
            </div>

            <h3>Misterio</h3>

            <p>Casos, secretos y enigmas que descubrir durante la historia.</p>
          </div>

          <div className="genreCard">
            <div className="genreIcon familyIcon">
              <Baby size={28} />
            </div>

            <h3>Familia</h3>

            <p>
              Series pensadas para disfrutar historias junto con toda la
              familia.
            </p>
          </div>
          <div className="genreCard">
            <div className="genreIcon animeIcon">
              <Sparkles size={24} />
            </div>

            <h3>Anime</h3>

            <p>Series de animacion japonesa y diferentes estilos de anime.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
