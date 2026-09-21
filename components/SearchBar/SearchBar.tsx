"use client";

import { FormEvent, useState } from "react";
import styles from "./SearchBar.module.css";

type SearchBarProps = {
  onSearch: (texto: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [texto, setTexto] = useState("");

  const manejarBusqueda = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const textoLimpio = texto.trim();

    if (textoLimpio === "") {
      return;
    }

    onSearch(textoLimpio);
  };

  return (
    <form className={styles.search} onSubmit={manejarBusqueda}>
      <input
        type="text"
        placeholder="Buscar una serie..."
        value={texto}
        onChange={(event) => setTexto(event.target.value)}
      />

      <button type="submit">
        Buscar
      </button>
    </form>
  );
}