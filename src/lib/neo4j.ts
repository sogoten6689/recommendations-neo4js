import neo4j from "neo4j-driver";

const driver = neo4j.driver(
  process.env.NEO4J_URI || "bolt://localhost:7687",
  neo4j.auth.basic(
    process.env.NEO4J_USERNAME || "neo4j",
    process.env.NEO4J_PASSWORD || "password"
  )
);

export async function fetchMovies(size: number, from: number) {
  const session = driver.session();
  try {
    // Lấy danh sách phim
    const result = await session.run(
      `
      MATCH (m:Movie)-[:IN_GENRE]->(g:Genre)
      RETURN 
        m.title AS title, 
        m.year AS year, 
        m.imdbId AS imdbId,
        m.runtime AS runtime,
        m.imdbRating AS imdbRating,
        m.plot AS plot,
        m.poster AS poster,
        m.released AS released,
        m.budget AS budget,
        COLLECT(g.name) AS genres
      ORDER BY m.year DESC
      SKIP ${from*size}
      LIMIT ${size}
      `
    );

    // Lấy tổng số phim để phân trang
    const countResult = await session.run(
      "MATCH (m:Movie) RETURN count(m) AS total"
    );
    const total = countResult.records[0].get("total").toNumber();

    return {
      movies: result.records.map((record) => ({
        imdbId: record.get("imdbId"),
        title: record.get("title"),
        year: record.get("year"),
        runtime: record.get("runtime"),
        imdbRating: record.get("imdbRating"),
        plot: record.get("plot"),
        poster: record.get("poster"),
        released: record.get("released"),
        budget: record.get("budget"),
        genres: record.get("genres").join(", "),
      })),
      total,
    };
  } finally {
    await session.close();
  }
}

export async function fetchUsers(size: number, from: number) {
  const session = driver.session();
  try {
    const result = await session.run(`
      MATCH (u:User)
      RETURN u.name AS username
        SKIP ${from}
        LIMIT ${size}
    `);
    return result.records.map(record => ({
      title: record.get("username"),
    }));
  } catch (error) {
    console.error("Error fetching persons:", error);
    return [];
  } finally {
    await session.close();
  }
}

export async function fetchRecommendedMovies(userId: number) {
  const session = driver.session();
  try {
    const result = await session.run(`
     MATCH (u:User {userId: ${userId}})-[:LIKES]->(g:Genre)<-[:IN_GENRE]-(m:Movie)
      RETURN m.title AS title, m.imdbRating AS rating, collect(g.name) AS genres
      ORDER BY m.imdbRating DESC
      LIMIT 10
    `);
    
    return {
      movies: result.records.map((record) => ({
        imdbId: record.get("imdbId"),
        title: record.get("title"),
        year: record.get("year"),
        runtime: record.get("runtime"),
        imdbRating: record.get("imdbRating"),
        plot: record.get("plot"),
        poster: record.get("poster"),
        released: record.get("released"),
        budget: record.get("budget"),
        genres: record.get("genres").join(", "),
      })),
    };
  } catch (error) {
    console.error("Error fetching persons:", error);
    return [];
  } finally {
    await session.close();
  }
}
