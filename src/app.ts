import express from "express";
import { RegisterRoutes } from "./route/routes";
import { setupSwagger } from "./config/swagger";
import { UsuarioController } from './controller/UsuarioController';
import { CategoriaUsuarioController } from "./controller/CategoriaUsuarioController";
import { CursoController } from "./controller/CursoController";
import { LivroController } from "./controller/LivroController";
import { CategoriaLivroController } from "./controller/CategoriaLivroController";
import { EstoqueController } from "./controller/EstoqueController";
import { EmprestimoController } from "./controller/EmprestimoController";

const catUsuController = new CategoriaUsuarioController();
const cursoController = new CursoController();
const livroController = new LivroController();
const categoriaLivroController = new CategoriaLivroController();
const estoqueController = new EstoqueController();
const emprestimoController = new EmprestimoController();

const app = express();

const PORT = 3090;
app.use(express.json());

const apiRouter = express.Router();
RegisterRoutes(apiRouter);

app.use('/library', apiRouter);

RegisterRoutes(app);
setupSwagger(app);

app.listen(PORT, ()=> console.log("API online na porta: " + PORT));