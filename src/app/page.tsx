import MoviesList from "@/components/movies-list";
import Title from "antd/es/typography/Title";

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <Title>Recommendation Movies by your style</Title>
      <MoviesList />
    </div>
  );
}
