"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioRepository = void 0;
const CategoriaUsuario_1 = require("../model/CategoriaUsuario");
class CategoriaUsuarioRepository {
    static instance;
    categorias = [
        new CategoriaUsuario_1.CategoriaUsuario(1, "Professor"),
        new CategoriaUsuario_1.CategoriaUsuario(2, "Aluno"),
        new CategoriaUsuario_1.CategoriaUsuario(3, "Bibliotecário")
    ];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaUsuarioRepository;
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
exports.CategoriaUsuarioRepository = CategoriaUsuarioRepository;
