"use client";

import { useEffect, useState } from "react";
import SearchBar from "@/components/SearchBar/SearchBar";
import SerieGrid from "@/components/SerieGrid/SerieGrid";
import Loading from "@/components/Loading/Loading";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import EmptyState from "@/components/EmptyState/EmptyState";
import SerieFilters from "@/components/SerieFilters/SerieFilters";
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
  status?: string;
};

export default function SeriesPage() {
  const [series, setSeries] = useState<Serie[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");

  // Guarda el numero de pagina actual
  const [paginaActual, setPaginaActual] = useState(() => {
    if (typeof window === "undefined") {
      return 1;
    }

    const parametros = new URLSearchParams(window.location.search);
    const pagina = Number(parametros.get("pagina"));

    return pagina > 0 ? pagina : 1;
  });

  // Guarda el genero seleccionado
  const [generoSeleccionado, setGeneroSeleccionado] = useState("Todos");

  // Guarda el ano seleccionado
  const [anioSeleccionado, setAnioSeleccionado] = useState("Todos");

  // Guarda la calificacion minima seleccionada
  const [calificacionSeleccionada, setCalificacionSeleccionada] = useState("0");

  // Guarda el estado seleccionado
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("Todos");

  const seriesPorPagina = 20;

  // Filtramos las series dependiendo de las opciones seleccionadas
  const seriesFiltradas = series.filter((serie) => {
    // Comprueba el filtro de genero
    const coincideGenero =
      generoSeleccionado === "Todos" ||
      serie.genres.includes(generoSeleccionado);

    // Obtiene el ano de estreno
    const anioSerie = serie.premiered ? serie.premiered.substring(0, 4) : "";

    // Comprueba el filtro de ano
    const coincideAnio =
      anioSeleccionado === "Todos" || anioSerie === anioSeleccionado;

    // Obtiene la calificacion de la serie
    const calificacionSerie = serie.rating?.average ?? 0;

    // Comprueba la calificacion minima
    const coincideCalificacion =
      calificacionSerie >= Number(calificacionSeleccionada);

    // Comprueba el estado de la serie
    const coincideEstado =
      estadoSeleccionado === "Todos" || serie.status === estadoSeleccionado;

    return (
      coincideGenero && coincideAnio && coincideCalificacion && coincideEstado
    );
  });

  // Calculamos desde que posicion del arreglo comenzara la pagina
  const indiceInicial = (paginaActual - 1) * seriesPorPagina;

  // Calculamos donde termina la pagina
  const indiceFinal = indiceInicial + seriesPorPagina;

  // Obtenemos solamente las series correspondientes a la pagina actual
  const seriesPagina = seriesFiltradas.slice(indiceInicial, indiceFinal);

  // Calculamos cuantas paginas existen en total
  const totalPaginas = Math.ceil(seriesFiltradas.length / seriesPorPagina);

  // Funcion para obtener las series
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

  // Actualiza el numero de pagina en la direccion
  useEffect(() => {
    const nuevaUrl = `/series?pagina=${paginaActual}`;

    window.history.pushState(null, "", nuevaUrl);
  }, [paginaActual]);

  // Funcion que se ejecuta cuando el usuario realiza una busqueda
  const manejarBusqueda = async (texto: string) => {
    try {
      setCargando(true);
      setError("");
      setBusqueda(texto);
      setPaginaActual(1);

      // Buscamos las series utilizando el texto
      const resultados = await buscarSeries(texto);
      setSeries(resultados);
    } catch {
      setError("No se pudieron buscar las series.");
    } finally {
      setCargando(false);
    }
  };

  // Funcion para volver a mostrar todas las series
  const mostrarTodas = async () => {
    try {
      setCargando(true);
      setError("");
      setBusqueda("");
      setPaginaActual(1);

      // Reiniciamos los filtros
      setGeneroSeleccionado("Todos");
      setAnioSeleccionado("Todos");
      setCalificacionSeleccionada("0");
      setEstadoSeleccionado("Todos");

      // Obtenemos nuevamente todas las series
      const datos = await obtenerSeries();
      setSeries(datos);
    } catch {
      setError("No se pudieron cargar las series.");
    } finally {
      setCargando(false);
    }
  };

  // Funcion que se ejecuta cuando cambia el genero
  const manejarGenero = (genero: string) => {
    setGeneroSeleccionado(genero);
    setPaginaActual(1);
  };

  // Funcion que se ejecuta cuando cambia el ano
  const manejarAnio = (anio: string) => {
    setAnioSeleccionado(anio);
    setPaginaActual(1);
  };

  // Funcion que se ejecuta cuando cambia la calificacion
  const manejarCalificacion = (calificacion: string) => {
    setCalificacionSeleccionada(calificacion);
    setPaginaActual(1);
  };

  // Funcion que se ejecuta cuando cambia el estado
  const manejarEstado = (estado: string) => {
    setEstadoSeleccionado(estado);
    setPaginaActual(1);
  };

  // Funcion para limpiar todos los filtros
  const limpiarFiltros = () => {
    setGeneroSeleccionado("Todos");
    setAnioSeleccionado("Todos");
    setCalificacionSeleccionada("0");
    setEstadoSeleccionado("Todos");
    setPaginaActual(1);
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

      <SerieFilters
        generoSeleccionado={generoSeleccionado}
        cambiarGenero={manejarGenero}
        anioSeleccionado={anioSeleccionado}
        cambiarAnio={manejarAnio}
        calificacionSeleccionada={calificacionSeleccionada}
        cambiarCalificacion={manejarCalificacion}
        estadoSeleccionado={estadoSeleccionado}
        cambiarEstado={manejarEstado}
        limpiarFiltros={limpiarFiltros}
      />

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

      {!cargando && !error && seriesFiltradas.length === 0 && (
        <EmptyState mensaje="No se encontraron series con los filtros seleccionados." />
      )}

      {!cargando && !error && seriesFiltradas.length > 0 && (
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
