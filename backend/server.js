import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/route.js";
import db from "./config/database.js";

const app = express();
const PORT = process.env.PORT || 5000; // ✅ Gunakan PORT dari environment

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(router);
app.use(express.static(path.join(__dirname, "../frontend"))); // ✅ Untuk file statis

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

app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});
