import { notFound } from "next/navigation";
import { obtenerSeriePorId } from "@/services/tvApi";
import SerieDetail from "@/components/SerieDetail/SerieDetail";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SeriePage({ params }: Props) {
  const { id } = await params;

  try {
    const serie = await obtenerSeriePorId(Number(id));

    return (
      <main>
        <SerieDetail serie={serie} />
      </main>
    );
  } catch {
    notFound();
  }
}