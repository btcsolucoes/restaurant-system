import sql from '../lib/db';

export default async function handler(req, res) {
  try {
    const result = await sql`SELECT NOW()`;

    res.status(200).json({
      status: "ok",
      db: result
    });
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
}
