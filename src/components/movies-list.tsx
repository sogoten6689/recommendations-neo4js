'use client'
import { Button } from "antd";
import { useEffect, useState } from "react";

export default  function MoviesList() {
  const [movies, setMovies] = useState<Movie[]>([]);

    async function fetchData() {
      const res = await fetch("/api/movies");
      const data = await res.json();
      setMovies(data);
    }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <Button onClick={fetchData}>Load dữ liệu </Button>
    <ul>
      {movies && movies.map((movie) => (
        <li key={movie.title}>{movie.title} ({movie.year.low + (movie.year.high ? `-${movie.year.high}` : '')})</li>
      ))}
    </ul>
    </>
  );
}
