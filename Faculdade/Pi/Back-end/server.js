import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import sequelize from "./config/db.js";

import cursoRoutes from './routes/cursoRoutes.js';
import authRoutes from "./routes/authRoutes.js";
import eventoRoutes from "./routes/eventoRoutes.js";

const app = express();
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // necessário para form-data
app.use("/uploads", express.static("uploads"));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);


app.use("/auth", authRoutes);
app.use("/api/eventos", eventoRoutes);
app.use('/api/cursos', cursoRoutes); 

sequelize.sync({ alter: true }).then(() => {
  console.log('Modelos sincronizados com o banco de dados!');
});

app.get("/", (req, res) => res.send("API está funcionando!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
