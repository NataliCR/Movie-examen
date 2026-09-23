import { notFound } from "next/navigation";
import { obtenerSeriePorId } from "@/services/tvApi";
// Componente detalles de la serie
import SerieDetail from "@/components/SerieDetail/SerieDetail";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

// Es una funcion asincrona porque necesita consultar la API.
export default async function SeriePage({ params }: Props) {
   // Obtenemos el ID que viene en la URL. Por ejemplo, si la URL es /series/123, id sera "123".
  const { id } = await params;

  try {
    const serie = await obtenerSeriePorId(Number(id)); // la información de la serie mediante la API.

    // Mostramos la informacion de la serie
    return (
      <main>
        <SerieDetail serie={serie} />
      </main>
    );
  } catch {
    notFound();
  }
}