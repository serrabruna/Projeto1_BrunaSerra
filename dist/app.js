"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UsuarioController_1 = require("./controller/UsuarioController");
const CategoriaUsuarioController_1 = require("./controller/CategoriaUsuarioController");
const CursoController_1 = require("./controller/CursoController");
const usuarioController = new UsuarioController_1.UsuarioController();
const catUsuController = new CategoriaUsuarioController_1.CategoriaUsuarioController();
const cursoController = new CursoController_1.CursoController();
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 3090;
app.use(express_1.default.json());
//Usuário
app.post("/library/usuarios", usuarioController.criarUsuario.bind(usuarioController));
app.get("/library/usuarios", usuarioController.listarUsuario.bind(usuarioController));
app.get("/library/usuarios/:cpf", usuarioController.buscarUsuario.bind(usuarioController));
app.put("/library/usuarios/:cpf", usuarioController.atualizarUsuario.bind(usuarioController));
//Categoria Usuário
app.get("/library/categorias-usuario", catUsuController.listarCategorias.bind(catUsuController));
//Curso
app.get("/library/cursos", cursoController.listarCursos.bind(cursoController));
app.listen(PORT, () => console.log("Servidor rodando em http://localhost:3090"));
