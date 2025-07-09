"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CategoriaUsuarioRepository_1 = require("./repository/CategoriaUsuarioRepository");
async function main() {
    const catUsu = new CategoriaUsuarioRepository_1.CategoriaUsuarioRepository();
    await catUsu.createTable();
    await catUsu.insertCategoriaUsuario(1, "Professor");
}
main();
