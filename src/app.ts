import 'dotenv/config'
import cors from "cors";
import express, { Application, json } from "express";
import categoriaVigenteRoute from './routes/categoria.route';
import peliculaRoute from './routes/pelicula.route';
import usuarioRoute from './routes/usuario.route';
import perfilRoutes from './routes/perfil.routes';

const app: Application = express();

app.use(cors({
  origin: "http://localhost:5173" // backoffice React
}));

app.use(express.json());
app.use(json());

app.use('/api/v1/usuarios', usuarioRoute);
app.use('/api/v1/categorias', categoriaVigenteRoute);
app.use('/api/v1/peliculas', peliculaRoute);
app.use("/uploads", express.static("uploads"));

app.use("/api/v1/perfiles", perfilRoutes);

export default app;