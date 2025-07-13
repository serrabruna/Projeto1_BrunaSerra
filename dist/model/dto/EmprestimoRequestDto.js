"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoRequestDto = void 0;
class EmprestimoRequestDto {
    cpfUsuario;
    usuarioId;
    codigoExemplar;
    dataEmprestimo;
    dataDevolucaoPrevista;
    dataEntrega;
    diasAtraso;
    suspensaoAte;
    constructor(codigoExemplar, cpfUsuario, usuarioId, dataEmprestimo, dataDevolucaoPrevista, dataEntrega, diasAtraso, suspensaoAte, id) {
        this.cpfUsuario = cpfUsuario;
        this.usuarioId = usuarioId;
        this.codigoExemplar = codigoExemplar;
        this.dataEmprestimo = dataEmprestimo;
        this.dataDevolucaoPrevista = dataDevolucaoPrevista;
        this.dataEntrega = dataEntrega;
        this.diasAtraso = diasAtraso;
        this.suspensaoAte = suspensaoAte;
    }
}
exports.EmprestimoRequestDto = EmprestimoRequestDto;
