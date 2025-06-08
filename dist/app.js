"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UsuarioController_1 = require("./controller/UsuarioController");
const CategoriaUsuarioController_1 = require("./controller/CategoriaUsuarioController");
const CursoController_1 = require("./controller/CursoController");
const LivroController_1 = require("./controller/LivroController");
const CategoriaLivroController_1 = require("./controller/CategoriaLivroController");
const EstoqueController_1 = require("./controller/EstoqueController");
const EmprestimoController_1 = require("./controller/EmprestimoController");
const usuarioController = new UsuarioController_1.UsuarioController();
const catUsuController = new CategoriaUsuarioController_1.CategoriaUsuarioController();
const cursoController = new CursoController_1.CursoController();
const livroController = new LivroController_1.LivroController();
const categoriaLivroController = new CategoriaLivroController_1.CategoriaLivroController();
const estoqueController = new EstoqueController_1.EstoqueController();
const emprestimoController = new EmprestimoController_1.EmprestimoController();
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 3090;
app.use(express_1.default.json());
//Usuário
app.post("/library/usuarios", usuarioController.criarUsuario.bind(usuarioController));
app.get("/library/usuarios", usuarioController.listarUsuario.bind(usuarioController));
app.get("/library/usuarios/:cpf", usuarioController.buscarUsuario.bind(usuarioController));
app.put("/library/usuarios/:cpf", usuarioController.atualizarUsuario.bind(usuarioController));
app.delete("/library/usuarios/:cpf", usuarioController.removerUsuario.bind(usuarioController));
//Livro
app.post("/library/livros", livroController.criarLivro.bind(livroController));
app.get("/library/livros", livroController.listarLivro.bind(livroController));
app.get("/library/livros/:isbn", livroController.buscarLivro.bind(livroController));
app.put("/library/livros/:isbn", livroController.atualizarLivro.bind(livroController));
app.delete("/library/livros/:isbn", livroController.removerLivro.bind(livroController));
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
//Catalogos
app.get("/library/categorias-usuario", catUsuController.listarCategorias.bind(catUsuController));
app.get("/library/cursos", cursoController.listarCursos.bind(cursoController));
app.get("/library/categorias-livro", categoriaLivroController.listarCategorias.bind(categoriaLivroController));
app.listen(PORT, () => console.log("Servidor rodando em http://localhost:3090"));
