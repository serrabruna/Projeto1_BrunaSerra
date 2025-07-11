"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmprestimoRepository_1 = require("./repository/EmprestimoRepository");
const LivroRepository_1 = require("./repository/LivroRepository");
const EstoqueRepository_1 = require("./repository/EstoqueRepository");
async function main() {
    const emprestimo = new EmprestimoRepository_1.EmprestimoRepository();
    const livro = new LivroRepository_1.LivroRepository();
    const estoque = new EstoqueRepository_1.EstoqueRepository();
    await livro.createTable();
    await estoque.createTable();
    await emprestimo.createTable();
}
main();
