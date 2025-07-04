"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UsuarioRepository_1 = require("./repository/UsuarioRepository");
async function main() {
    const repo = new UsuarioRepository_1.UsuarioRepository();
    await repo.createTable(); // cria a tabela se não existir
    // insere um usuário
    await repo.insertUsuario("12345678901", "João da Silva", "joao@ifsp.edu.br", 1, // categoriaId
    2 // cursoId
    );
}
main();
