import Link from "next/link";
import {
  Clapperboard,
  Search,
  Heart,
  Library,
} from "lucide-react";

export default function Home() {
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
            Explorar series
            <span>→</span>
          </Link>
        </div>

        <div className="heroIcon">
          <Clapperboard size={90} strokeWidth={1.5} />
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <div className="featureIcon">
            <Search size={40} strokeWidth={1.8} />
          </div>

          <h2>Busca series</h2>

          <p>
            Encuentra rápidamente tus series favoritas mediante
            nuestro buscador.
          </p>
        </div>

        <div className="feature">
          <div className="featureIcon">
            <Heart size={40} strokeWidth={1.8} />
          </div>

          <h2>Guarda favoritas</h2>

          <p>
            Guarda las series que más te gustan para consultarlas
            cuando quieras.
          </p>
        </div>

        <div className="feature">
          <div className="featureIcon">
            <Library size={40} strokeWidth={1.8} />
          </div>

          <h2>Conoce cada serie</h2>

          <p>
            Consulta información como género, estreno, idioma,
            duración y calificación.
          </p>
        </div>
      </section>
    </main>
  );
}