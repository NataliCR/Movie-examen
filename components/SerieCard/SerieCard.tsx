"use client";

import Link from "next/link";
import { Heart, Star } from "lucide-react";
// Importamos el hook encargado de manejar las series favoritas
import { useFavorites } from "@/hooks/useFavorites";
import styles from "./SerieCard.module.css";

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

type SerieCardProps = {
  serie: Serie;
  paginaActual: number;
};

// Componente que muestra la informacion de una serie en forma de tarjeta
export default function SerieCard({ serie, paginaActual }: SerieCardProps) {
  
  // Obtenemos las funciones para agregar, eliminar y comprobar favoritos
  const { agregarFavorito, eliminarFavorito, esFavorito } = useFavorites();

  // Comprobamos si la serie actual esta guardada como favorita
  const favorito = esFavorito(serie.id);

  // Funcion que agrega o elimina la serie de favoritos
  const manejarFavorito = () => {
    if (favorito) {
      eliminarFavorito(serie.id);
    } else {
      agregarFavorito(serie.id);
    }
  };

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <Link href={`/serie/${serie.id}?pagina=${paginaActual}`}>
          {serie.image ? (
            <img
              src={serie.image.medium}
              alt={`Imagen de ${serie.name}`}
              className={styles.image}
            />
          ) : (
            <div className={styles.noImage}>Sin imagen</div>
          )}
        </Link>
        {/*Boton que activa favorito*/}
        <button
          className={styles.favoriteButton}
          onClick={manejarFavorito}
          aria-label={favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          <Heart size={22} fill={favorito ? "currentColor" : "none"} />
        </button>
      </div>
          {/* Enlace hacia los detalles de la serie */}
      <Link href={`/serie/${serie.id}?pagina=${paginaActual}`}>
        <div className={styles.content}>
          <h2>{serie.name}</h2>

          {serie.genres.length > 0 && (
            <p className={styles.genres}>
              {serie.genres.slice(0, 2).join(" • ")}
            </p>
          )}

          {serie.premiered && (
            <p className={styles.year}>{serie.premiered.substring(0, 4)}</p>
          )}

          {serie.rating?.average && (
            <p className={styles.rating}>
              <Star size={17} fill="currentColor" />
              {serie.rating.average}
            </p>
          )}
        </div>
      </Link>
    </article>
  );
}
