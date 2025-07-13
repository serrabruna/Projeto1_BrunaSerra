export class UsuarioRequestDto {
    nome?: string;
    email?: string;
    categoriaId?: number;
    cursoId?: number;

    constructor(nome?: string, email?: string, categoriaId?: number, cursoId?: number) {
        this.nome = nome;
        this.email = email;
        this.categoriaId = categoriaId;
        this.cursoId = cursoId;
    }
}