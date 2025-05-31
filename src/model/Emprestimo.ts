export class Emprestimo{
    id: number;
    cpfUsuario: string;
    codigoExemplar: string;
    dataEmprestimo: Date;
    dataDevolucao?:Date;

    constructor(id: number, cpfUsuario: string, codigoExemplar: string){
        this.id = id;
        this.cpfUsuario = cpfUsuario;
        this.codigoExemplar = codigoExemplar;
        this.dataEmprestimo = new Date();
    }
}