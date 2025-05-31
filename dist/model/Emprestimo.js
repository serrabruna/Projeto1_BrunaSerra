"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emprestimo = void 0;
class Emprestimo {
    id;
    cpfUsuario;
    codigoExemplar;
    dataEmprestimo;
    dataDevolucao;
    constructor(id, cpfUsuario, codigoExemplar) {
        this.id = id;
        this.cpfUsuario = cpfUsuario;
        this.codigoExemplar = codigoExemplar;
        this.dataEmprestimo = new Date();
    }
}
exports.Emprestimo = Emprestimo;
