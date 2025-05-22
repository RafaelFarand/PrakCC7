import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/route.js";
import db from "./config/database.js";

const app = express();
const PORT = process.env.PORT || 8080; // Cloud Run uses PORT from env

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Middleware CORS - izinkan asal frontend App Engine
app.use(cors({
  origin: 'https://fe-040-dot-b-02-451105.uc.r.appspot.com',
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ Tangani preflight request (OPTIONS)
app.options('*', cors());

// Middleware parsing JSON
app.use(express.json());

// Router API
app.use(router);

// Static file untuk frontend (opsional jika hosting frontend terpisah)
app.use(express.static(path.join(__dirname, "../frontend"))); 

// Cek koneksi database
(async () => {
  try {
    await db.authenticate();
    console.log("Database connected");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
})();

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

// Listen (gunakan PORT dari environment)
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
