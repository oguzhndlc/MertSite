// netlify/functions/updateCards.js
import pkg from "pg";
const { Client } = pkg;

export async function handler(event, context) {
  if (event.httpMethod !== "PUT" && event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  const body = JSON.parse(event.body || "{}");
  const { id, photo_url, title, example } = body;

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "ID gerekli" }),
    };
  }

  const client = new Client({
    connectionString: process.env.NETLIFY_DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();

    const query = `
      UPDATE cards
      SET
        photo_url = $1,
        title = $2,
        example = $3,
        updated_at = NOW()
      WHERE id = $4
      RETURNING *;
    `;

    const values = [photo_url, title, example, id];
    const result = await client.query(query, values);

    await client.end();

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        updated: result.rows[0],
      }),
    };
  } catch (error) {
    console.error("Update error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
