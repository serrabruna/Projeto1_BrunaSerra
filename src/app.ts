import express from "express";
import { UsuarioController } from './controller/UsuarioController';

const usuarioController = new UsuarioController();

const app = express();

const PORT = process.env.PORT ?? 3090;
app.use(express.json());

app.post("/library/usuarios", usuarioController.criarUsuario.bind(usuarioController));
app.get("/library/usuarios", usuarioController.listarUsuario.bind(usuarioController));
app.get("/library/usuarios/:cpf", usuarioController.buscarUsuario.bind(usuarioController));
app.put("/library/usuarios/:cpf", usuarioController.atualizarUsuario.bind(usuarioController));

app.listen(PORT, () => console.log("Servidor rodando em http://localhost:3090/library"));