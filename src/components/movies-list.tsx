import { fetchMovies } from "@/lib/neo4j";

export default async function MoviesList() {
  const movies = await fetchMovies();

  return (
    <ul>
      {movies && movies.map((movie) => (
        <li key={movie.title}>{movie.title} ({movie.year})</li>
      ))}
    </ul>
  );
}
