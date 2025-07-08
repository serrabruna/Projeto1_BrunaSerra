"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UsuarioRepository_1 = require("./repository/UsuarioRepository");
async function main() {
    const repo = new UsuarioRepository_1.UsuarioRepository();
    await repo.createTable();
    await repo.insertUsuario("20799319031", "João da Silva", "joao@ifsp.edu.br", 1, 2);
}
main();
