"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emprestimo = void 0;
class Emprestimo {
    id;
    cpfUsuario;
    usuarioId;
    codigoExemplar;
    dataEmprestimo;
    dataDevolucaoPrevista;
    dataEntrega;
    diasAtraso;
    suspensaoAte;
    constructor(cpfUsuario, usuarioId, codigoExemplar, dataEmprestimo, dataDevolucaoPrevista, dataEntrega, diasAtraso, suspensaoAte, id) {
        this.cpfUsuario = cpfUsuario;
        this.usuarioId = usuarioId;
        this.codigoExemplar = codigoExemplar;
        this.dataEmprestimo = dataEmprestimo;
        this.dataDevolucaoPrevista = dataDevolucaoPrevista;
        this.dataEntrega = dataEntrega;
        this.diasAtraso = diasAtraso;
        this.suspensaoAte = suspensaoAte;
        this.id = id;
    }
}
exports.Emprestimo = Emprestimo;
