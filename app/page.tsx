import Link from "next/link";
import {
  Clapperboard,
  Search,
  Heart,
  Library,
  ArrowRight,
} from "lucide-react";

type Serie = {
  id: number;
  name: string;
  image?: {
    medium: string;
    original: string;
  };
};

async function obtenerSeriesDestacadas(): Promise<Serie[]> {
  const ids = [169, 2993, 465];

  try {
    const resultados = await Promise.all(
      ids.map(async (id) => {
        const response = await fetch(
          `https://api.tvmaze.com/shows/${id}`,
          {
            cache: "force-cache",
          }
        );

        if (!response.ok) {
          throw new Error("No se pudo obtener la serie.");
        }

        return response.json();
      })
    );

    return resultados;
  } catch {
    return [];
  }
}

export default async function Home() {
  const seriesDestacadas = await obtenerSeriesDestacadas();

  return (
    <main className="home">
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
            Explora series, descubre nuevos títulos y guarda tus
            favoritas en un solo lugar.
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

      <section className="features">
        <div className="feature">
          <div className="featureIcon">
            <Search size={38} strokeWidth={1.8} />
          </div>

          <h2>Busca series</h2>

          <p>
            Encuentra rápidamente tus series favoritas mediante
            nuestro buscador.
          </p>
        </div>

        <div className="feature">
          <div className="featureIcon">
            <Heart size={38} strokeWidth={1.8} />
          </div>

          <h2>Guarda favoritas</h2>

          <p>
            Guarda las series que más te gustan para consultarlas
            cuando quieras.
          </p>
        </div>

        <div className="feature">
          <div className="featureIcon">
            <Library size={38} strokeWidth={1.8} />
          </div>

          <h2>Conoce cada serie</h2>

          <p>
            Consulta información como género, estreno, idioma,
            duración y calificación.
          </p>
        </div>
      </section>

      <section className="genresSection">
        <div className="sectionTitle">
          <span></span>

          <h2>Explora por género</h2>

          <p>
            Encuentra series de diferentes géneros y descubre
            nuevos títulos.
          </p>
        </div>

        <div className="genreList">
          <Link href="/series" className="genreButton">
            Drama
          </Link>

          <Link href="/series" className="genreButton">
            Comedia
          </Link>

          <Link href="/series" className="genreButton">
            Acción
          </Link>

          <Link href="/series" className="genreButton">
            Ciencia ficción
          </Link>
        </div>
      </section>
    </main>
  );
}