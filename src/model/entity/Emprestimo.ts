export class Emprestimo {
    id?: number; 
    cpfUsuario: string; 
    usuarioId: number; 
    codigoExemplar: number; 
    dataEmprestimo: Date; 
    dataDevolucaoPrevista: Date; 
    dataEntrega?: Date;   
    diasAtraso?: number; 
    suspensaoAte?: Date; 

    constructor(
        cpfUsuario: string,
        usuarioId: number, 
        codigoExemplar: number,
        dataEmprestimo: Date,
        dataDevolucaoPrevista: Date,
        dataEntrega?: Date,
        diasAtraso?: number,
        suspensaoAte?: Date,
        id?: number
    ) {
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