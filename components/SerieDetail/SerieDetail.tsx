"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Heart, Star } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import styles from "./SerieDetail.module.css";

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
  status?: string;
  language?: string;
  runtime?: number | null;
};

// Definimos las propiedades que recibe el componente
type SerieDetailProps = {
  serie: Serie;
};

export default function SerieDetail({ serie }: SerieDetailProps) {
  const router = useRouter();

  // Obtenemos las funciones para manejar favoritos
  const {
    agregarFavorito,
    eliminarFavorito,
    esFavorito,
  } = useFavorites();

  // Comprobamos si la serie ya esta guardada como favorita
  const favorito = esFavorito(serie.id);

  // Funcion para agregar o quitar una serie de favoritos
  const manejarFavorito = () => {
    if (favorito) {
      eliminarFavorito(serie.id);
    } else {
      agregarFavorito(serie.id);
    }
  };

  // Convierte el estado de la API a un texto mas amigable
  const obtenerEstado = () => {
    if (serie.status === "Running") {
      return "En emision";
    }

    if (serie.status === "Ended") {
      return "Finalizada";
    }

    return serie.status || "No disponible";
  };

  return (
    <section className={styles.detail}>

      {/* Boton para regresar a la pagina anterior */}
      <button
        className={styles.back}
        onClick={() => router.back()}
      >
        <ArrowLeft size={18} />
        Volver a series
      </button>

      {/* Contenedor principal de la informacion */}
      <div className={styles.container}>

        {/* Contenedor de la imagen */}
        <div className={styles.imageContainer}>
          {serie.image ? (
            <img
              src={serie.image.original}
              alt={`Imagen de ${serie.name}`}
              className={styles.image}
            />
          ) : (
            <div className={styles.noImage}>
              Sin imagen
            </div>
          )}
        </div>

        {/* Informacion de la serie */}
        <div className={styles.info}>

          {/* Nombre de la serie */}
          <h1>{serie.name}</h1>

          {/* Boton para manejar favoritos */}
          <button
            className={styles.favoriteButton}
            onClick={manejarFavorito}
          >
            {favorito ? (
              <>
                <Heart
                  size={18}
                  fill="currentColor"
                />
                Quitar de favoritos
              </>
            ) : (
              <>
                <Heart size={18} />
                Agregar a favoritos
              </>
            )}
          </button>

          {/* Descripcion de la serie */}
          {serie.summary && (
            <div
              dangerouslySetInnerHTML={{
                __html: serie.summary,
              }}
            />
          )}

          {/* Informacion adicional de la serie */}
          <div className={styles.detailsInfo}>

            {/* Estado de la serie */}
            <div className={styles.detailItem}>
              <strong>Estado</strong>

              <span
                className={
                  serie.status === "Running"
                    ? styles.statusRunning
                    : serie.status === "Ended"
                    ? styles.statusEnded
                    : ""
                }
              >
                {obtenerEstado()}
              </span>
            </div>

            {/* Ano de estreno */}
            <div className={styles.detailItem}>
              <strong>Estreno</strong>

              <span>
                {serie.premiered
                  ? serie.premiered.substring(0, 4)
                  : "No disponible"}
              </span>
            </div>

            {/* Calificacion de la serie */}
            <div className={styles.detailItem}>
              <strong>Calificacion</strong>

              <span className={styles.rating}>
                <Star
                  size={17}
                  fill="currentColor"
                />

                {serie.rating?.average !== null &&
                serie.rating?.average !== undefined
                  ? serie.rating.average
                  : "Sin calificacion"}
              </span>
            </div>

            {/* Generos de la serie */}
            <div className={styles.detailItem}>
              <strong>Generos</strong>

              {serie.genres.length > 0 ? (
                <div className={styles.genres}>
                  {serie.genres.map((genero) => (
                    <span
                      key={genero}
                      className={styles.genre}
                    >
                      {genero}
                    </span>
                  ))}
                </div>
              ) : (
                <span>No disponible</span>
              )}
            </div>

            {/* Idioma de la serie */}
            <div className={styles.detailItem}>
              <strong>Idioma</strong>

              <span>
                {serie.language || "No disponible"}
              </span>
            </div>

            {/* Duracion de los episodios */}
            <div className={styles.detailItem}>
              <strong>Duracion</strong>

              <span>
                {serie.runtime
                  ? `${serie.runtime} minutos`
                  : "No disponible"}
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}