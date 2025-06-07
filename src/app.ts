import express from "express";
import { UsuarioController } from './controller/UsuarioController';
import { CategoriaUsuarioController } from "./controller/CategoriaUsuarioController";
import { CursoController } from "./controller/CursoController";
import { LivroController } from "./controller/LivroController";
import { CategoriaLivroController } from "./controller/CategoriaLivroController";

const usuarioController = new UsuarioController();
const catUsuController = new CategoriaUsuarioController();
const cursoController = new CursoController();
const livroController = new LivroController();
const categoriaLivroController = new CategoriaLivroController();

const app = express();

const PORT = process.env.PORT ?? 3090;
app.use(express.json());

//Usuário
app.post("/library/usuarios", usuarioController.criarUsuario.bind(usuarioController));
app.get("/library/usuarios", usuarioController.listarUsuario.bind(usuarioController));
app.get("/library/usuarios/:cpf", usuarioController.buscarUsuario.bind(usuarioController));
app.put("/library/usuarios/:cpf", usuarioController.atualizarUsuario.bind(usuarioController));

//Categoria Usuário
app.get("/library/categorias-usuario", catUsuController.listarCategorias.bind(catUsuController));

//Curso
app.get("/library/cursos", cursoController.listarCursos.bind(cursoController));

//Livro
app.post("/library/livros", livroController.criarLivro.bind(livroController));
app.get("/library/livros", livroController.listarLivro.bind(livroController));
app.get("/library/livros/:isbn", livroController.buscarLivro.bind(livroController));
app.put("/library/livros/:isbn", livroController.atualizarLivro.bind(livroController));

//Categoria Livro
app.get("/library/categoria-livro", categoriaLivroController.listarCategorias.bind(categoriaLivroController));

app.listen(PORT, () => console.log("Servidor rodando em http://localhost:3090"));