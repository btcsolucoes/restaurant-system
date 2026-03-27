const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;
const databaseUrl = process.env.DATABASE_URL;

let pool = null;
if (databaseUrl) {
  pool = new Pool({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false }
  });
}

app.get("/", (req, res) => {
  res.send("Backend online");
});

app.get("/api/v1/health", async (req, res) => {
  try {
    let db = "not_configured";

    if (pool) {
      await pool.query("SELECT 1");
      db = "ok";
    }

    res.json({
      status: "ok",
      database: db
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message
    });
  }
});

app.get("/api/v1/menu", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Croissant Especial",
      description: "Croissant amanteigado com recheio premium.",
      price: 24.9,
      imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 2,
      name: "Cappuccino Cremoso",
      description: "Café especial com leite vaporizado.",
      price: 14.5,
      imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80"
    }
  ]);
});

app.listen(port, () => {
  console.log(`Backend rodando na porta ${port}`);
});
