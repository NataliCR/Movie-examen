"use client";

import { Calendar, Star, Tv, RotateCcw } from "lucide-react";

import styles from "./SerieFilters.module.css";

// Tipo para cada genero
type Genero = {
  nombre: string;
  valor: string;
};

type SerieFiltersProps = {
  generoSeleccionado: string;
  cambiarGenero: (genero: string) => void;
  anioSeleccionado: string;
  cambiarAnio: (anio: string) => void;
  calificacionSeleccionada: string;
  cambiarCalificacion: (calificacion: string) => void;
  estadoSeleccionado: string;
  cambiarEstado: (estado: string) => void;
  limpiarFiltros: () => void;
};

export default function SerieFilters({
  generoSeleccionado,
  cambiarGenero,
  anioSeleccionado,
  cambiarAnio,
  calificacionSeleccionada,
  cambiarCalificacion,
  estadoSeleccionado,
  cambiarEstado,
  limpiarFiltros,
}: SerieFiltersProps) {
  // Lista de generos disponibles
  const generos: Genero[] = [
    { nombre: "Todos", valor: "Todos" },
    { nombre: "Drama", valor: "Drama" },
    { nombre: "Comedia", valor: "Comedy" },
    { nombre: "Accion", valor: "Action" },
    { nombre: "Aventura", valor: "Adventure" },
    { nombre: "Ciencia ficcion", valor: "Science-Fiction" },
    { nombre: "Thriller", valor: "Thriller" },
    { nombre: "Terror", valor: "Horror" },
    { nombre: "Romance", valor: "Romance" },
    { nombre: "Fantasia", valor: "Fantasy" },
    { nombre: "Crimen", valor: "Crime" },
    { nombre: "Misterio", valor: "Mystery" },
    { nombre: "Familia", valor: "Family" },
    { nombre: "Anime", valor: "Anime" },
  ];

  // Genera automaticamente los anos desde 1980 hasta el ano actual
  const anioActual = new Date().getFullYear();

  const anios = [
    "Todos",
    ...Array.from({ length: anioActual - 1980 + 1 }, (_, indice) =>
      String(anioActual - indice),
    ),
  ];

  // Lista de rangos de calificacion disponibles
  const calificaciones = [
    { nombre: "Todas", valor: "Todos" },
    { nombre: "5.0 - 5.9", valor: "5" },
    { nombre: "6.0 - 6.9", valor: "6" },
    { nombre: "7.0 - 7.9", valor: "7" },
    { nombre: "8.0 - 8.9", valor: "8" },
    { nombre: "9.0 - 9.9", valor: "9" },
  ];

  // Lista de estados disponibles
  const estados = [
    { nombre: "Todos", valor: "Todos" },
    { nombre: "En emision", valor: "Running" },
    { nombre: "Finalizada", valor: "Ended" },
  ];

  return (
    <section className={styles.filters}>
      {/* Boton para limpiar todos los filtros */}
      <div className={styles.clearContainer}>
        <button
          type="button"
          className={styles.clearButton}
          onClick={limpiarFiltros}
        >
          <RotateCcw size={17} />
          Limpiar filtros
        </button>
      </div>

      {/* Encabezado */}
      <div className={styles.header}>
        <h2>Filtrar series</h2>
        <p>
          Selecciona diferentes opciones para encontrar la serie que buscas.
        </p>
      </div>

      {/* Filtro por genero */}
      <div className={styles.filterGroup}>
        <div className={styles.filterTitle}>
          <Tv size={19} />
          <h3>Genero</h3>
        </div>

        <div className={styles.buttons}>
          {generos.map((genero) => (
            <button
              key={genero.valor}
              className={`${styles.button} ${
                generoSeleccionado === genero.valor ? styles.active : ""
              }`}
              onClick={() => cambiarGenero(genero.valor)}
            >
              {genero.nombre}
            </button>
          ))}
        </div>
      </div>

      {/* Filtros de ano, calificacion y estado */}
      <div className={styles.secondaryFilters}>
        {/* Filtro por ano */}
        <div className={styles.filterGroup}>
          <div className={styles.filterTitle}>
            <Calendar size={19} />
            <h3>Año</h3>
          </div>

          <select
            className={styles.select}
            value={anioSeleccionado}
            onChange={(evento) => cambiarAnio(evento.target.value)}
          >
            {anios.map((anio) => (
              <option key={anio} value={anio}>
                {anio}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por calificacion */}
        <div className={styles.filterGroup}>
          <div className={styles.filterTitle}>
            <Star size={19} />
            <h3>Calificacion</h3>
          </div>

          <select
            className={styles.select}
            value={calificacionSeleccionada}
            onChange={(evento) => cambiarCalificacion(evento.target.value)}
          >
            {calificaciones.map((calificacion) => (
              <option key={calificacion.valor} value={calificacion.valor}>
                {calificacion.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Filtro por estado */}
        <div className={styles.filterGroup}>
          <div className={styles.filterTitle}>
            <Tv size={19} />
            <h3>Estado</h3>
          </div>

          <select
            className={styles.select}
            value={estadoSeleccionado}
            onChange={(evento) => cambiarEstado(evento.target.value)}
          >
            {estados.map((estado) => (
              <option key={estado.valor} value={estado.valor}>
                {estado.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Mensaje informativo */}
      <p className={styles.filterMessage}>
        Los filtros se aplican automaticamente.
      </p>
    </section>
  );
}
