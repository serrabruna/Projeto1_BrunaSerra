"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EmprestimoRepository_1 = require("./repository/EmprestimoRepository");
const LivroRepository_1 = require("./repository/LivroRepository");
const EstoqueRepository_1 = require("./repository/EstoqueRepository");
const CategoriaLivroRepository_1 = require("./repository/CategoriaLivroRepository");
const CategoriaUsuarioRepository_1 = require("./repository/CategoriaUsuarioRepository");
const UsuarioRepository_1 = require("./repository/UsuarioRepository");
const CursoRepository_1 = require("./repository/CursoRepository");
async function main() {
    const emprestimo = new EmprestimoRepository_1.EmprestimoRepository();
    const livro = new LivroRepository_1.LivroRepository();
    const estoque = new EstoqueRepository_1.EstoqueRepository();
    const categoriaL = new CategoriaLivroRepository_1.CategoriaLivroRepository();
    const categoriaU = new CategoriaUsuarioRepository_1.CategoriaUsuarioRepository();
    const curso = new CursoRepository_1.CursoRepository();
    const usuario = new UsuarioRepository_1.UsuarioRepository();
    await categoriaU.createTable();
    await curso.createTable();
    await usuario.createTable();
    await estoque.createTable();
    await emprestimo.createTable();
}
main();
