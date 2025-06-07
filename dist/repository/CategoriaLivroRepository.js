"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroRepository = void 0;
const CategoriaLivro_1 = require("../model/CategoriaLivro");
class CategoriaLivroRepository {
    static instance;
    categorias = [
        new CategoriaLivro_1.CategoriaLivro(1, "Romance"),
        new CategoriaLivro_1.CategoriaLivro(2, "Computação"),
        new CategoriaLivro_1.CategoriaLivro(3, "Letras"),
        new CategoriaLivro_1.CategoriaLivro(4, "Gestão")
    ];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaLivroRepository;
        }
        return this.instance;
    }
    listarCategorias() {
        return this.categorias;
    }
    buscarPorId(id) {
        return this.categorias.find(cat => cat.id === id);
    }
}
exports.CategoriaLivroRepository = CategoriaLivroRepository;
