equire("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10
});

app.get("/api/libros", async (req, res) => {
  try {
    const [filas] = await pool.query(
      "SELECT id_libros, titulo, autor, genero, disponible FROM libros ORDER BY id_libros DESC"
    );
    res.json(filas);
  } catch (error) {
    console.error("Error al obtener libros:", error);
    res.status(500).json({ mensaje: "Error al obtener el catálogo de libros" });
  }
});

app.get("/api/libros/buscar", async (req, res) => {
  try {
    const termino = `%${req.query.q || ""}%`;
    const [filas] = await pool.query(
      "SELECT id_libros, titulo, autor, genero, disponible FROM libros WHERE titulo LIKE ? OR autor LIKE ?",
      [termino, termino]
    );
    res.json(filas);
  } catch (error) {
    console.error("Error al buscar libros:", error);
    res.status(500).json({ mensaje: "Error al buscar libros" });
  }
});

app.post("/api/libros", async (req, res) => {
  try {
    const { titulo, autor, genero, disponible } = req.body;

    if (!titulo || !autor) {
      return res.status(400).json({ mensaje: "Título y autor son obligatorios" });
    }

    const [resultado] = await pool.query(
      "INSERT INTO libros (titulo, autor, genero, disponible) VALUES (?, ?, ?, ?)",
      [titulo, autor, genero || null, disponible !== undefined ? disponible : true]
    );

    res.status(201).json({ id: resultado.insertId, mensaje: "Libro agregado correctamente" });
  } catch (error) {
    console.error("Error al agregar libro:", error);
    res.status(500).json({ mensaje: "Error al agregar el libro" });
  }
});

const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
