"use client";

import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar/SearchBar";
import SerieGrid from "@/components/SerieGrid/SerieGrid";
import Loading from "@/components/Loading/Loading";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import EmptyState from "@/components/EmptyState/EmptyState";
import { buscarSeries, obtenerSeries } from "@/services/tvApi";
import styles from "./series.module.css";

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

export default function SeriesPage() {
  const [series, setSeries] = useState<Serie[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const [paginaActual, setPaginaActual] = useState(() => {
    if (typeof window === "undefined") {
      return 1;
    }

    const parametros = new URLSearchParams(window.location.search);
    const pagina = Number(parametros.get("pagina"));

    return pagina > 0 ? pagina : 1;
  });

  const seriesPorPagina = 20;

  const indiceInicial = (paginaActual - 1) * seriesPorPagina;
  const indiceFinal = indiceInicial + seriesPorPagina;

  const seriesPagina = series.slice(indiceInicial, indiceFinal);

  const totalPaginas = Math.ceil(series.length / seriesPorPagina);

  useEffect(() => {
    const cargarSeries = async () => {
      try {
        setCargando(true);
        setError("");

        const datos = await obtenerSeries();
        setSeries(datos);
      } catch {
        setError("No se pudieron cargar las series.");
      } finally {
        setCargando(false);
      }
    };

    cargarSeries();
  }, []);

  useEffect(() => {
    const nuevaUrl = `/series?pagina=${paginaActual}`;

    window.history.pushState(null, "", nuevaUrl);
  }, [paginaActual]);

  const manejarBusqueda = async (texto: string) => {
    try {
      setCargando(true);
      setError("");
      setBusqueda(texto);
      setPaginaActual(1);

      const resultados = await buscarSeries(texto);
      setSeries(resultados);
    } catch {
      setError("No se pudieron buscar las series.");
    } finally {
      setCargando(false);
    }
  };

  const mostrarTodas = async () => {
    try {
      setCargando(true);
      setError("");
      setBusqueda("");
      setPaginaActual(1);

      const datos = await obtenerSeries();
      setSeries(datos);
    } catch {
      setError("No se pudieron cargar las series.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <main>
      <h1>Explorar series</h1>

      <p
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        Descubre nuevas series y encuentra tu próxima favorita.
      </p>

      <SearchBar onSearch={manejarBusqueda} />

      {busqueda && (
        <div className={styles.searchResults}>
          <p>
            Resultados para: <strong>{busqueda}</strong>
          </p>

          <button className={styles.showAllButton} onClick={mostrarTodas}>
            Ver todas las series
          </button>
        </div>
      )}

      {cargando && <Loading />}

      {error && <ErrorMessage mensaje={error} onRetry={mostrarTodas} />}

      {!cargando && !error && series.length === 0 && (
        <EmptyState mensaje="No se encontraron series con esa búsqueda." />
      )}

      {!cargando && !error && series.length > 0 && (
        <>
          <SerieGrid series={seriesPagina} paginaActual={paginaActual} />

          {totalPaginas > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.paginationButton}
                onClick={() => setPaginaActual(paginaActual - 1)}
                disabled={paginaActual === 1}
              >
                ← Anterior
              </button>

              <span className={styles.pageInfo}>
                Página <strong>{paginaActual}</strong> de{" "}
                <strong>{totalPaginas}</strong>
              </span>

              <button
                className={styles.paginationButton}
                onClick={() => setPaginaActual(paginaActual + 1)}
                disabled={paginaActual === totalPaginas}
              >
                Siguiente →
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
