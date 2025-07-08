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
app.get("/library/estoque/resumo/:isbn", estoqueController.resumoPorISBN.bind(estoqueController));

//Emprestimo 
app.post("/library/emprestimos", emprestimoController.criarEmprestimo.bind(emprestimoController));
app.get("/library/emprestimos", emprestimoController.listarEmprestimos.bind(emprestimoController));
app.put("/library/emprestimos/:id/devolucao", emprestimoController.registrarDevolucao.bind(emprestimoController));

//Catalogos
app.get("/library/categorias-usuario", catUsuController.listarCategorias.bind(catUsuController));
app.get("/library/cursos", cursoController.listarCursos.bind(cursoController));
app.get("/library/categorias-livro", categoriaLivroController.listarCategorias.bind(categoriaLivroController));

app.listen(PORT, () => console.log("Servidor rodando em http://localhost:3090"));