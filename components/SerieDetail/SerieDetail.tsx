"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Heart, Star } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import styles from "./SerieDetail.module.css";

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

type SerieDetailProps = {
  serie: Serie;
};

export default function SerieDetail({ serie }: SerieDetailProps) {
  const router = useRouter();
  const { agregarFavorito, eliminarFavorito, esFavorito } = useFavorites();

  const favorito = esFavorito(serie.id);

  const manejarFavorito = () => {
    if (favorito) {
      eliminarFavorito(serie.id);
    } else {
      agregarFavorito(serie.id);
    }
  };

  return (
    <section className={styles.detail}>
      <button className={styles.back} onClick={() => router.back()}>
        <ArrowLeft size={18} />
        Volver a series
      </button>

      <div className={styles.container}>
        <div className={styles.imageContainer}>
          {serie.image ? (
            <img
              src={serie.image.original}
              alt={`Imagen de ${serie.name}`}
              className={styles.image}
            />
          ) : (
            <div className={styles.noImage}>Sin imagen</div>
          )}
        </div>

        <div className={styles.info}>
          <h1>{serie.name}</h1>

          <button className={styles.favoriteButton} onClick={manejarFavorito}>
            {favorito ? (
              <>
                <Heart size={18} fill="currentColor" />
                Quitar de favoritos
              </>
            ) : (
              <>
                <Heart size={18} />
                Agregar a favoritos
              </>
            )}
          </button>

          {serie.summary && (
            <div
              dangerouslySetInnerHTML={{
                __html: serie.summary,
              }}
            />
          )}

          {serie.genres.length > 0 && (
            <p>
              <strong>Géneros:</strong> {serie.genres.join(", ")}
            </p>
          )}

          {serie.premiered && (
            <p>
              <strong>Estreno:</strong> {serie.premiered.substring(0, 4)}
            </p>
          )}

          {serie.rating?.average && (
            <p className={styles.rating}>
              <strong>Calificación:</strong>
              <Star size={17} fill="currentColor" />
              {serie.rating.average}
            </p>
          )}

          {serie.status && (
            <p>
              <strong>Estado:</strong> {serie.status}
            </p>
          )}

          {serie.language && (
            <p>
              <strong>Idioma:</strong> {serie.language}
            </p>
          )}

          {serie.runtime && (
            <p>
              <strong>Duración:</strong> {serie.runtime} minutos
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
