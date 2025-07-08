export class UsuarioDto {
    id: number;
    cpf: string;
    nome: string;
    email: string;
    categoriaId: number;
    cursoId: number;
    status: 'ativo' | 'inativo' | 'suspenso';
    diaSuspensao: number;
    suspensaoAte?: Date;

    constructor(id: any, cpf: any, nome: any, email: any, categoriaId: any, cursoId: any, status: any, diaSuspensao: any, suspensaoAte: any) {
        this.id = id;
        this.cpf = cpf;
        this.nome = nome;
        this.email = email;
        this.categoriaId = categoriaId;
        this.cursoId = cursoId;
        this.status = status;
        this.diaSuspensao = diaSuspensao;
        this.suspensaoAte = suspensaoAte;
    }
}