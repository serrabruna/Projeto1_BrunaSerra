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
    inserirExemplar(exemplar) {
        this.exemplares.push(exemplar);
    }
    buscarPorISBN(isbn) {
        return this.exemplares.find(exemplar => exemplar.livro_isbn === isbn);
    }
    buscarPorCodigo(codigo) {
        return this.exemplares.find(exemplar => exemplar.codigo === codigo);
    }
    listarEstoque() {
        return this.exemplares;
    }
    atualizarStatus(codigo, status) {
        const exemplar = this.buscarPorCodigo(codigo);
        if (!exemplar)
            return false;
        exemplar.status = status;
        return true;
    }
    remover(codigo) {
        const index = this.exemplares.findIndex(e => e.codigo === codigo);
        if (index === -1)
            return false;
        this.exemplares.splice(index, 1);
        return true;
    }
}
exports.EstoqueRepository = EstoqueRepository;
