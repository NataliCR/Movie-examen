import styles from "./ErrorMessage.module.css";

type ErrorMessageProps = {
  mensaje: string;
  onRetry?: () => void;
};

// Componente que muestra un mensaje cuando ocurre un error
export default function ErrorMessage({
  mensaje,
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className={styles.error}>
      <p>{mensaje}</p>

      {onRetry && (
        <button onClick={onRetry}>
          Intentar nuevamente
        </button>
      )}
    </div>
  );
}