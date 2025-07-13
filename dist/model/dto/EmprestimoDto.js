"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoDto = void 0;
class EmprestimoDto {
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
exports.EmprestimoDto = EmprestimoDto;
