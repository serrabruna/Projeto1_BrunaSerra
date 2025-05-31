"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueRepository = void 0;
class EstoqueRepository {
    static instance;
    exemplares = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EstoqueRepository();
        }
        return this.instance;
    }
    InserirExemplar(exemplar) {
        this.exemplares.push(exemplar);
    }
    buscarPorCodigo(codigo) {
        return this.exemplares.find(exemplar => exemplar.codigo === codigo);
    }
    listarEstoque() {
        return this.exemplares;
    }
}
exports.EstoqueRepository = EstoqueRepository;
