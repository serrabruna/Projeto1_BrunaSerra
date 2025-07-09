import { CategoriaUsuario } from "../model/entity/CategoriaUsuario";
import { executarComandoSQL } from "../database/mysql";

export class CategoriaUsuarioRepository{
    private static instance: CategoriaUsuarioRepository;

    constructor(){}

    public static getInstance(): CategoriaUsuarioRepository {
        if(!this.instance){
            this.instance = new CategoriaUsuarioRepository;
        }
        return this.instance;
    }

    async createTable() {
        const query = ` CREATE TABLE IF NOT EXISTS biblioteca.CategoriaUsuario (
            id INT PRIMARY KEY AUTO_INCREMENT,
            nome VARCHAR(255) NOT NULL UNIQUE
            )`;
        try {
            const resultado = await executarComandoSQL(query, []);
            console.log("Tabela CategoriaUsuario criada com sucesso:", resultado);
        } catch (err) {
            console.error("Erro ao executar a query:", err);
        }
    }

    async insertCategoriaUsuario(nome: string): Promise<CategoriaUsuario> {
        const resultado = await executarComandoSQL(
            "INSERT INTO biblioteca.CategoriaUsuario (nome) VALUES (?)",
            [nome]
        );
        const newCategoriaUsuario = new CategoriaUsuario(nome);
        newCategoriaUsuario.id = resultado.insertId;
        +console.log("Categoria de usuario inserida com sucesso:", newCategoriaUsuario);
        return newCategoriaUsuario;
    }

    async listarCategorias(): Promise<CategoriaUsuario[]>{
        const resultado = await executarComandoSQL("SELECT * FROM biblioteca.CategoriaUsuario", []);
        return resultado.map((row: any) => new CategoriaUsuario(row.nome));
    }

    async buscarPorId(id: number): Promise <CategoriaUsuario | undefined>{
        const resultado = await executarComandoSQL("SELECT * FROM biblioteca.CategoriaUsuario WHERE id = ?", [id]);
        if (resultado.length > 0) {
            const row = resultado[0];
            return new CategoriaUsuario(row.nome);
        }
        return undefined;
    }
}