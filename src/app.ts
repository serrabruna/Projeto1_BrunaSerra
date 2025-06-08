import express from "express";
import { UsuarioController } from './controller/UsuarioController';
import { CategoriaUsuarioController } from "./controller/CategoriaUsuarioController";
import { CursoController } from "./controller/CursoController";
import { LivroController } from "./controller/LivroController";
import { CategoriaLivroController } from "./controller/CategoriaLivroController";
import { EstoqueController } from "./controller/EstoqueController";
import { EmprestimoController } from "./controller/EmprestimoController";

const usuarioController = new UsuarioController();
const catUsuController = new CategoriaUsuarioController();
const cursoController = new CursoController();
const livroController = new LivroController();
const categoriaLivroController = new CategoriaLivroController();
const estoqueController = new EstoqueController();
const emprestimoController = new EmprestimoController();

const app = express();

const PORT = process.env.PORT ?? 3090;
app.use(express.json());

//Usuário
app.post("/library/usuarios", usuarioController.criarUsuario.bind(usuarioController));
app.get("/library/usuarios", usuarioController.listarUsuario.bind(usuarioController));
app.get("/library/usuarios/:cpf", usuarioController.buscarUsuario.bind(usuarioController));
app.put("/library/usuarios/:cpf", usuarioController.atualizarUsuario.bind(usuarioController));
app.delete("/library/usuarios/:cpf", usuarioController.removerUsuario.bind(usuarioController));

//Categoria Usuário
app.get("/library/categorias-usuario", catUsuController.listarCategorias.bind(catUsuController));

//Curso
app.get("/library/cursos", cursoController.listarCursos.bind(cursoController));

//Livro
app.post("/library/livros", livroController.criarLivro.bind(livroController));
app.get("/library/livros", livroController.listarLivro.bind(livroController));
app.get("/library/livros/:isbn", livroController.buscarLivro.bind(livroController));
app.put("/library/livros/:isbn", livroController.atualizarLivro.bind(livroController));
app.delete("/library/livros/:isbn", livroController.removerLivro.bind(livroController));


//Categoria Livro
app.get("/library/categoria-livro", categoriaLivroController.listarCategorias.bind(categoriaLivroController));

//Estoque
app.post("/library/estoque", estoqueController.criarExemplar.bind(estoqueController));
app.get("/library/estoque", estoqueController.listarDisponivel.bind(estoqueController));
app.get("/library/estoque/:codigo", estoqueController.buscarExemplar.bind(estoqueController));
app.put("/library/estoque/:codigo", estoqueController.atualizarStatus.bind(estoqueController));
app.delete("/library/estoque/:codigo", estoqueController.RemoverEstoque.bind(estoqueController));

//Emprestimo 
app.post("/library/emprestimos", emprestimoController.criarEmprestimo.bind(emprestimoController));
app.get("/library/emprestimos", emprestimoController.listarEmprestimos.bind(emprestimoController));
app.put("/library/emprestimos/:id/devolucao", emprestimoController.registrarDevolucao.bind(emprestimoController));

app.listen(PORT, () => console.log("Servidor rodando em http://localhost:3090"));