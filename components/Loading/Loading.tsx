import styles from "./Loading.module.css";

// Componente que se muestra mientras se cargan las series
export default function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner}></div>
      <p>Cargando series...</p>
    </div>
  );
}