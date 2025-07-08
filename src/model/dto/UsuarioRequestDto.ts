export class UsuarioRequestDto {
    cpf?: string;
    nome?: string;
    email?: string;
    categoriaId?: number;
    cursoId?: number;

    constructor(cpf?: string, nome?: string, email?: string, categoriaId?: number, cursoId?: number) {
        this.cpf = cpf;
        this.nome = nome;
        this.email = email;
        this.categoriaId = categoriaId;
        this.cursoId = cursoId;
    }
}