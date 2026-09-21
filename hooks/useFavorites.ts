"use client";

import { useEffect, useState } from "react";

export function useFavorites() {
  const [favoritos, setFavoritos] = useState<number[]>([]);

  useEffect(() => {
    const guardados = localStorage.getItem("series-favoritas");

    if (guardados) {
      setFavoritos(JSON.parse(guardados));
    }
  }, []);

  const agregarFavorito = (id: number) => {
    setFavoritos((actuales) => {
      if (actuales.includes(id)) {
        return actuales;
      }

      const nuevosFavoritos = [...actuales, id];

      localStorage.setItem(
        "series-favoritas",
        JSON.stringify(nuevosFavoritos)
      );

      return nuevosFavoritos;
    });
  };

  const eliminarFavorito = (id: number) => {
    setFavoritos((actuales) => {
      const nuevosFavoritos = actuales.filter(
        (favorito) => favorito !== id
      );

      localStorage.setItem(
        "series-favoritas",
        JSON.stringify(nuevosFavoritos)
      );

      return nuevosFavoritos;
    });
  };

  const esFavorito = (id: number) => {
    return favoritos.includes(id);
  };

  return {
    favoritos,
    agregarFavorito,
    eliminarFavorito,
    esFavorito,
  };
}