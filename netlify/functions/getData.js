// netlify/functions/getData.js
import pkg from "pg";
const { Client } = pkg;

export async function handler(event, context) {
  const client = new Client({
    connectionString: process.env.NETLIFY_DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // Neon için gerekli
  });

  try {
    await client.connect();
    const result = await client.query("SELECT * FROM cards;");
    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify(result.rows),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
