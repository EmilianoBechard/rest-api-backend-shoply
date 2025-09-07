import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { corsMiddleware } from "./middlewares/cors.js"; // si querés usar tu middleware
import productsRouter from "./routes/productsRoutes.js";
import { usersRouter } from "./routes/userRoutes.js";
import fs from "fs";

// Configuración de __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
// Middleware global de errores
app.use((err, req, res, next) => {
  console.error("Error inesperado:", err);
  res.status(500).json({ error: "Error interno del servidor" });
});
// Middleware para parsear JSON
app.use(express.json());

// Middleware CORS
app.use(corsMiddleware());

// Carpeta para imágenes
const imagesPath = path.join(__dirname, "products_images");
if (!fs.existsSync(imagesPath)) fs.mkdirSync(imagesPath);

app.use("/products_images", express.static(imagesPath));

// Routers
app.use("/productos", productsRouter);
app.use("/usuarios", usersRouter);

const PORT = process.env.PORT ?? 8080;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server escuchando en http://localhost:${PORT}`);
});
