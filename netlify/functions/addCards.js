import { Client } from 'pg';

export const handler = async (event, context) => {
  try {
    const {photo_url, title, example} = JSON.parse(event.body);

    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'id gerekli' })
      };
    }

    const client = new Client({
      connectionString: process.env.NETLIFY_DATABASE_URL, // ENV değişkeni
      ssl: { rejectUnauthorized: false }
    });

    await client.connect();

    // 1️⃣ İlk insert (photo_url boş veya geçici)
    const result = await client.query(
    'INSERT INTO cards (photo_url, title, example, updated_at) VALUES ($1,$2,$3,NOW()) RETURNING id',
    ["", title, example]
    );
    const id = result.rows[0].id;

    // 2️⃣ Gerçek photo_url ile güncelle
    const photo_urrl = `images/cards/galery_${id}.${photo_url}`;
    await client.query('UPDATE cards SET photo_url=$1 WHERE id=$2', [photo_urrl, id]);

    await client.end();

    if (result.rowCount === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Kayıt bulunamadı' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Kayıt eklendi',
        id: result.rows[0].id 
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};