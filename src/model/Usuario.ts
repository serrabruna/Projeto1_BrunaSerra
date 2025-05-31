export class Usuario{
    cpf: string;
    nome: string;
    email: string;
    categoria: string;
    curso: string;
    status: 'ativo' | 'inativo' | 'suspenso';
    diaSuspensao: number;
    
    constructor(cpf: string, nome: string, email: string, categoria: string, curso: string){
        this.cpf = cpf;
        this.nome = nome;
        this.email = nome;
        this.categoria = categoria;
        this.curso = curso;
        this.status = 'ativo';
        this.diaSuspensao = 0;
    }
}