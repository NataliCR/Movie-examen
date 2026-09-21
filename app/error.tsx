"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
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