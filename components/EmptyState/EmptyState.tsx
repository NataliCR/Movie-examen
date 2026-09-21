import styles from "./EmptyState.module.css";

type EmptyStateProps = {
  mensaje: string;
};

export default function EmptyState({
  mensaje,
}: EmptyStateProps) {
  return (
    <div className={styles.empty}>
      <div className={styles.icon}>Sin resultados</div>

      <h2>No encontramos resultados</h2>

      <p>{mensaje}</p>
    </div>
  );
}