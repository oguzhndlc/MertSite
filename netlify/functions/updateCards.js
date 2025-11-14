// netlify/functions/updateCards.js
import pkg from "pg";
const { Client } = pkg;

export async function handler(event, context) {
  console.log("Fonksiyon tetiklendi. HTTP Method:", event.httpMethod);

  if (event.httpMethod !== "PUT" && event.httpMethod !== "POST") {
    console.warn("Method Not Allowed:", event.httpMethod);
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  let body = {};
  try {
    body = JSON.parse(event.body || "{}");
  } catch (err) {
    console.error("JSON parse hatası:", err);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Geçersiz JSON", details: err.message }),
    };
  }

  const { id, photo_url, title, example } = body;
  console.log("Gelen veri:", { id, photo_url, title, example });

  if (!id) {
    console.warn("ID eksik");
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
    console.log("DB bağlantısı başarılı");

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
    console.log("Çalıştırılacak sorgu:", query);
    console.log("Sorgu değerleri:", values);

    const result = await client.query(query, values);
    console.log("Sorgu sonucu:", result.rows);

    await client.end();
    console.log("DB bağlantısı kapatıldı");

    if (!result.rows.length) {
      console.warn("ID bulunamadı:", id);
      return {
        statusCode: 404,
        body: JSON.stringify({ error: "ID bulunamadı" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        updated: result.rows[0],
      }),
    };
  } catch (error) {
    console.error("Update hata detayları:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message, stack: error.stack }),
    };
  }
}
