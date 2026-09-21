const API_URL = "https://api.tvmaze.com";

type SeriesResponse = {
  id: number;
  name: string;
  image?: {
    medium: string;
    original: string;
  };
  summary?: string;
  genres: string[];
  premiered?: string;
  rating?: {
    average: number | null;
  };
};

export async function obtenerSeries(): Promise<SeriesResponse[]> {
  const response = await fetch(`${API_URL}/shows`);

  if (!response.ok) {
    throw new Error("No se pudieron obtener las series.");
  }

  const data: SeriesResponse[] = await response.json();

  return data;
}

export async function buscarSeries(
  nombre: string
): Promise<SeriesResponse[]> {
  const response = await fetch(
    `${API_URL}/search/shows?q=${encodeURIComponent(nombre)}`
  );

  if (!response.ok) {
    throw new Error("No se pudieron buscar las series.");
  }

  const data = await response.json();

  return data.map((resultado: { show: SeriesResponse }) => resultado.show);
}

export async function obtenerSeriePorId(
  id: number
): Promise<SeriesResponse> {
  const response = await fetch(`${API_URL}/shows/${id}`);

  if (!response.ok) {
    throw new Error("No se pudo obtener la información de la serie.");
  }

  const data: SeriesResponse = await response.json();

  return data;
}