// URL base de la API de TVMaze
const API_URL = "https://api.tvmaze.com";

// Definimos la estructura de datos que tiene una serie
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

// Funcion para obtener todas las series disponibles
export async function obtenerSeries(): Promise<SeriesResponse[]> {
  // Realizamos una solicitud a la API
  const response = await fetch(`${API_URL}/shows`);

  if (!response.ok) {
    throw new Error("No se pudieron obtener las series.");
  }

  // Convertimos la respuesta a un arreglo de series
  const data: SeriesResponse[] = await response.json();

  return data;
}

// Funcion para buscar series por nombre
export async function buscarSeries(
  nombre: string
): Promise<SeriesResponse[]> {
  // Realizamos la busqueda enviando el nombre a la API
  const response = await fetch(
    `${API_URL}/search/shows?q=${encodeURIComponent(nombre)}`
  );

  if (!response.ok) {
    throw new Error("No se pudieron buscar las series.");
  }

  // Convertimos la respuesta de la API a datos utilizables
  const data = await response.json();

  return data.map((resultado: { show: SeriesResponse }) => resultado.show);
}

// Funcion para obtener una serie especifica mediante su ID
export async function obtenerSeriePorId(
  id: number
): Promise<SeriesResponse> {
  // Realizamos una solicitud utilizando el ID de la serie
  const response = await fetch(`${API_URL}/shows/${id}`);

  if (!response.ok) {
    throw new Error("No se pudo obtener la información de la serie.");
  }

   // Convertimos la respuesta a los datos de una serie
  const data: SeriesResponse = await response.json();

  return data;
}