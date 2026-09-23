"use client";

export default function Error({
  error,
  reset,
}: {
  
  error: Error & { digest?: string }; // Objeto que contiene información sobre el error ocurrido.
  reset: () => void;  // Función que permite intentar cargar nuevamente la página.
}) {
  return (
    <main>
      <h2>Algo salió mal</h2>

      <button onClick={() => reset()}>
        Intentar nuevamente
      </button>
    </main>
  );
}