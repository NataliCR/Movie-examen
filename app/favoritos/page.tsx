"use client";

import { useEffect, useState } from "react";
//obtener la informacion de una serie por ID.
import { obtenerSeriePorId } from "@/services/tvApi";
import SerieGrid from "@/components/SerieGrid/SerieGrid";
import Loading from "@/components/Loading/Loading";
//guardar y administrar los IDs de las series favoritas.
import { useFavorites } from "@/hooks/useFavorites";
import styles from "./favoritos.module.css";

//Tipo de serie
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

//Componente muestra las series que el usuario ha agregado a favorito
export default function FavoritosPage() {
const { favoritos } = useFavorites();

const [series, setSeries] = useState<Serie[]>([]);
const [cargando, setCargando] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
// Funcion para cargar la informacion de las series favoritas
const cargarFavoritos = async () => {
// Si no existen favoritos, dejamos la lista vacia
if (favoritos.length === 0) {
setSeries([]);
setCargando(false);
return;
}


  try {
    setCargando(true);
    setError("");

    // Obtenemos la informacion de cada serie favorita
    const resultados = await Promise.all(
      favoritos.map((id) => obtenerSeriePorId(id))
    );

    setSeries(resultados);
  } catch {
    setError("No se pudieron cargar los favoritos.");
  } finally {
    setCargando(false);
  }
};

cargarFavoritos();


}, [favoritos]);

return ( <main className={styles.favoritosPage}> <section className={styles.header}> <span className={styles.line}></span>

    <h1>Mis favoritos</h1>

    <p>
      Aquí encontrarás las series que has guardado como favoritas.
    </p>
  </section>

  {cargando && (
    <div className={styles.loading}>
      <Loading />
    </div>
  )}

  {error && (
    <p className={styles.error}>
      {error}
    </p>
  )}

  {/* Mensaje cuando el usuario todava no tiene favoritos*/}
  {!cargando && !error && series.length === 0 && (
    <section className={styles.empty}>
      <div className={styles.emptyIcon}>♡</div>

      <h2>No tienes favoritos todavía</h2>

      <p>
        Explora las series y agrega tus favoritas para
        encontrarlas fácilmente aquí.
      </p>
    </section>
  )}

  {/* Mostramos las series cuando ya fueron cargadas */}
  {!cargando && !error && series.length > 0 && (
    <section className={styles.seriesContainer}>
      <div className={styles.favoriteCount}>
        {series.length} {series.length === 1 ? "serie favorita" : "series favoritas"}
      </div>

      <SerieGrid series={series} />
    </section>
  )}
</main>

);
}
