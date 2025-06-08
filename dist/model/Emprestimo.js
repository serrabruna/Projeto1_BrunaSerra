"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emprestimo = void 0;
class Emprestimo {
    static proximoId = 0;
    id;
    cpfUsuario;
    codigoExemplar;
    dataEmprestimo;
    dataDevolucao;
    dataEntrega;
    diasAtraso;
    suspencaoAte;
    constructor(cpfUsuario, codigoExemplar) {
        this.id = Emprestimo.proximoId++;
        this.cpfUsuario = cpfUsuario;
        this.codigoExemplar = codigoExemplar;
        this.dataEmprestimo = new Date();
        this.dataDevolucao = new Date();
        this.dataEntrega = new Date();
    }
}
exports.Emprestimo = Emprestimo;
