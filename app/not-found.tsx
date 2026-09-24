import Link from "next/link";

// Componente que se muestra cuando la pagina solicitada no existe
export default function NotFound() {
  return (
    <main>
      <h1>Página no encontrada</h1>

      <p>
        La página que buscas no existe.
      </p>

      <Link href="/">
        Volver al inicio
      </Link>
    </main>
  );
}