import { Client } from 'pg';

export const handler = async (event, context) => {
  try {
    const { id } = JSON.parse(event.body);

      const parsedId = Number(id);
  if (Number.isNaN(parsedId)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Geçersiz id" })
    };
  }


    const client = new Client({
      connectionString: process.env.NETLIFY_DATABASE_URL, // ENV değişkeni
      ssl: { rejectUnauthorized: false }
    });

    await client.connect();

    const result = await client.query(
      'DELETE FROM cards WHERE id = $1 RETURNING *',
      [parsedId]
    );

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
        message: 'Silme başarılı',
        deleted: result.rows[0]
      })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
