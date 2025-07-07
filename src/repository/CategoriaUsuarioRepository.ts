import { CategoriaUsuario } from "../model/entity/CategoriaUsuario";

export class CategoriaUsuarioRepository{
    private static instance: CategoriaUsuarioRepository;
    private categorias: CategoriaUsuario[] = [
        new CategoriaUsuario(1, "Professor"),
        new CategoriaUsuario(2, "Aluno"),
        new CategoriaUsuario(3, "Bibliotecário")
    ];

    private constructor(){}

    public static getInstance(): CategoriaUsuarioRepository {
        if(!this.instance){
            this.instance = new CategoriaUsuarioRepository;
        }
        return this.instance;
    }

    listarCategorias(): CategoriaUsuario[]{
        return this.categorias;
    }

    buscarPorId(id: number): CategoriaUsuario | undefined{
        return this.categorias.find(cat => cat.id === id);
    }
}