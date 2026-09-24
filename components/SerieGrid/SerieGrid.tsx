import SerieCard from "../SerieCard/SerieCard";
import styles from "./SerieGrid.module.css";

// Definimos la estructura de datos de una serie
type Serie = {
  id: number;
  name: string;
  image?: {
    medium: string;
    original: string;
  };
  summary?: string;
  genres: string[];
  premiered?: string;
  rating?: {
    average: number | null;
  };
};

type SerieGridProps = {
  series: Serie[];
  paginaActual?: number;
};

// Componente que organiza las series dentro de una cuadricula
export default function SerieGrid({
  series,
  paginaActual = 1,
}: SerieGridProps) {
  return (
    <div className={styles.grid}>
      {series.map((serie) => (
        <SerieCard key={serie.id} serie={serie} paginaActual={paginaActual} />
      ))}
    </div>
  );
}
