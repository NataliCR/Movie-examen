"use client";

import { useEffect, useState } from "react";
import { obtenerSeriePorId } from "@/services/tvApi";
import SerieGrid from "@/components/SerieGrid/SerieGrid";
import Loading from "@/components/Loading/Loading";
import { useFavorites } from "@/hooks/useFavorites";

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

export default function FavoritosPage() {
  const { favoritos } = useFavorites();

  const [series, setSeries] = useState<Serie[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarFavoritos = async () => {
      if (favoritos.length === 0) {
        setSeries([]);
        setCargando(false);
        return;
      }

      try {
        setCargando(true);
        setError("");

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

      {!cargando && !error && series.length === 0 && (
        <p style={{ textAlign: "center" }}>
          Todavía no tienes series favoritas.
        </p>
      )}

      {!cargando && !error && series.length > 0 && (
        <SerieGrid series={series} />
      )}
    </main>
  );
}