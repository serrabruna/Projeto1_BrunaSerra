export class EmprestimoDto {
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
        cpfUsuario: any,
        usuarioId: any, 
        codigoExemplar: any,
        dataEmprestimo: Date,
        dataDevolucaoPrevista: Date,
        dataEntrega?: Date,
        diasAtraso?: any,
        suspensaoAte?: Date,
        id?: any
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