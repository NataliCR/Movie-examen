import Link from "next/link";
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

        <nav className={styles.nav}>
          <Link href="/">Inicio</Link>

          <Link href="/series">Series</Link>

          <Link href="/favoritos" className={styles.favorites}>
            <Heart size={18} />
            <span>Favoritos</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}