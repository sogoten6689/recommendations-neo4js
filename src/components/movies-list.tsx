'use client'
import { Button, Col, Pagination, Row } from "antd";
import { useCallback, useEffect, useState } from "react";
import {Movie} from "@/models/movie"
import Card from "antd/es/card/Card";
import Image from "next/image";

export default  function MoviesList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const defaultPoster = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
  const fetchMovies = useCallback( async () => {
    setMovies([]);
    const res = await fetch(`/api/movies?size=${pageSize}&from=${(page - 1) * pageSize}`);
    const data = await res.json();
    console.log(data);
    
    
    if (res.ok) {
      setMovies(data.movies);
      setTotal(data.total); // API nên trả về tổng số phim để phân trang chính xác
    }
    
  },[page, pageSize]);

  useEffect(() => {
    fetchMovies();
  }, [page, pageSize, fetchMovies]);

  return (
    <>
    <Button onClick={fetchMovies}>Load dữ liệu </Button>
    <Row gutter={[16, 16]}>
      {movies && movies.map((movie: Movie) => (
        <Col key={movie.imdbId} xs={24} sm={12} md={8} lg={6} xl={4}>
            <Card
            key={movie.imdbId}
            hoverable
            style={{ width: 240 }}
            cover={<Image alt={movie.title} src={movie.poster||defaultPoster} width={240} height={360} />}
          >
            <h3>{movie.title}
              {/* ({movie.year}) */}
              </h3>
            <p><b>Genres:</b> {movie.genres}</p>  
            <p><b>IMDB Rating:</b> {movie.imdbRating}</p>
            <p><b>Runtime:</b> {movie.runtime ? (movie.runtime.low + ' mins') : 'N/A'} </p>
            <p><b>Released:</b> {movie.released}</p>
            <p><b>Budget:</b> {movie.budget ? (movie.budget.low + ' USD') : 'N/A'}</p>
            </Card>
            </Col>
          ))}
    </Row>

      {/* Pagination */}
      <Pagination
        current={page}
        pageSize={pageSize}
        total={total}
        onChange={(page, pageSize) => {
          setPage(page);
          setPageSize(pageSize);
        }}
        showSizeChanger
      />
    </>
  );
}
