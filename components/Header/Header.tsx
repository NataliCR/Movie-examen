// Importamos Link para crear enlaces entre las paginas
import Link from "next/link";
// Importamos los iconos
import { Clapperboard, Heart } from "lucide-react";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Clapperboard size={24} />
          <span>Series Explorer</span>
        </Link>

           {/* Menu principal de navegacion */}
        <nav className={styles.nav}>
           {/* Enlace hacia la pagina de inicio */}
          <Link href="/">Inicio</Link>

          {/* Enlace hacia el catalogo de series */}
          <Link href="/series">Series</Link>

          {/* Enlace hacia la pagina de series favoritas */}
          <Link href="/favoritos" className={styles.favorites}>
            <Heart size={18} />
            <span>Favoritos</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}