"use client";

import { useEffect, useState } from "react";
//obtener la informacion de una serie por ID.
import { obtenerSeriePorId } from "@/services/tvApi";
import SerieGrid from "@/components/SerieGrid/SerieGrid";
import Loading from "@/components/Loading/Loading";
//guardar y administrar los IDs de las series favoritas.
import { useFavorites } from "@/hooks/useFavorites";


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

  return (
    <main>
      <h1>Mis favoritos</h1>

      {cargando && <Loading />}

      {error && (
        <p style={{ textAlign: "center", color: "red" }}>
          {error}
        </p>
      )}

      {/* Mensaje cuando el usuario todava no tiene favoritos*/}
      {!cargando && !error && series.length === 0 && (
        <p style={{ textAlign: "center" }}>
          Todavía no tienes series favoritas.
        </p>
      )}
      {/* Mostramos las series cuando ya fueron cargadas */}
      {!cargando && !error && series.length > 0 && (
        <SerieGrid series={series} />
      )}
    </main>
  );
}