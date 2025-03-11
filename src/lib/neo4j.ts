import neo4j from "neo4j-driver";

const driver = neo4j.driver(
  process.env.NEO4J_URI || "bolt://localhost:7687",
  neo4j.auth.basic(
    process.env.NEO4J_USERNAME || "neo4j",
    process.env.NEO4J_PASSWORD || "password"
  )
);

export async function fetchMovies() {
  const session = driver.session();
  try {
    const result = await session.run(`
      MATCH (m:Movie)-[:IN_GENRE]->(g:Genre)
        RETURN m.title AS title, m.year AS year, g.name AS genre
        LIMIT 10
    `);
    console.log(result);
    

    return result.records.map(record => ({
      title: record.get("title"),
      year: record.get("year"),
    }));
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  } finally {
    await session.close();
  }
}
