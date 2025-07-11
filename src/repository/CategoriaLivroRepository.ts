import { CategoriaLivro } from "../model/entity/CategoriaLivro";
import { executarComandoSQL } from "../database/mysql";

export class CategoriaLivroRepository{
    private static instance: CategoriaLivroRepository;

    private constructor(){
        this.createTable();
    }

    public static getInstance(): CategoriaLivroRepository {
        if(!this.instance){
            this.instance = new CategoriaLivroRepository;
        }
        return this.instance;
    }

    private async createTable(){
        const query = ` CREATE TABLE IF NOT EXISTS biblioteca.CategoriaLivro (
            id INT PRIMARY KEY AUTO_INCREMENT,
            nome VARCHAR(255) NOT NULL UNIQUE
            )`;
        try {
            const resultado = await executarComandoSQL(query, []);
            console.log("Tabela CategoriaLivro criada com sucesso:", resultado);
        } catch (err) {
            console.error("Erro ao criar tabela CategoriaLivro:", err);
        }
    }

    async insertCategoriaLivro(nome: string): Promise<CategoriaLivro> {
        const resultado = await executarComandoSQL(
            "INSERT INTO biblioteca.CategoriaLivro (nome) VALUES (?)",
            [nome]
        );
        const newCategoriaLivro = new CategoriaLivro(nome, resultado.insertId);
        +console.log("Categoria de livro inserida com sucesso:", newCategoriaLivro);
        return newCategoriaLivro;
    }

    async listarCategorias(): Promise<CategoriaLivro[]>{
        const resultado = await executarComandoSQL("SELECT * FROM biblioteca.CategoriaLivro", []);
        return resultado.map((row: any) => new CategoriaLivro(row.id, row.nome));
    }

    async buscarPorId(id: number): Promise<CategoriaLivro | undefined>{
        const resultado = await executarComandoSQL("SELECT * FROM biblioteca.CategoriaLivro WHERE id = ?", [id]);
        if (resultado.length > 0) {
            const row = resultado[0];
            return new CategoriaLivro(row.id, row.nome);
        }
        return undefined;
    }
}
