'use client'
import { Movie } from "@/models/movie";
import { Card, List } from "antd";
import Title from "antd/es/typography/Title";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Suggests() {
  // const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  // const [selectedUser, setSelectedUser] = useState();
  const defaultPoster = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";

  useEffect(() => {
    // fetch("/api/users?size=10&from=0")
    //   .then((res) => res.json())
    //   .then((data) => setUsers(data));
    setMovies([]);
  }, []);

  // const handleUserChange = (userId: number) => {
  //   // setSelectedUser(userId);
  //   // fetch(`/api/recommendations?userId=${userId}`)
  //   //   .then((res) => res.json())
  //   //   .then((data) => setMovies(data));
  // };


  return (
    <div style={{ padding: 20 }}>
      <Title>Recommendation Movies by your style</Title>
    <div>
      <h2>Chọn User để xem đề xuất</h2>
      {/* <Select onChange={handleUserChange} style={{ width: 200 }}>
        {users.map((user) => (
          <Option key={user.id} value={user.id}>{user.name}</Option>
        ))}
      </Select> */}

      <h2>Phim Được Đề Xuất</h2>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={movies}
        renderItem={(movie: Movie) => (
          <List.Item>
            <Card
              hoverable
              cover={<Image src={movie.poster || defaultPoster} alt={movie.title} width={240} height={360} />}
            >
              <Card.Meta title={movie.title} description={`Rating: ${movie.imdbRating}`} />
            </Card>
          </List.Item>
        )}
      />
    </div>
    </div>
  );
}
