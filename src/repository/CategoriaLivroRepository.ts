import { CategoriaLivro } from "../model/entity/CategoriaLivro";
import { executarComandoSQL } from "../database/mysql";
import { error } from "console";

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
        try{
            const resultado = await executarComandoSQL(
                "INSERT INTO biblioteca.CategoriaLivro (nome) VALUES (?)",
                [nome]
            );
            const newCategoriaLivro = new CategoriaLivro(nome, resultado.insertId);
            +console.log("Categoria de livro inserida com sucesso:", newCategoriaLivro);
            return newCategoriaLivro;
        }catch(err){
            console.error("Erro ao inserir categoria de livro no repositório", err)
            throw err;
        }
    }

    async listarCategorias(): Promise<CategoriaLivro[]>{
        try{
             const resultado = await executarComandoSQL("SELECT * FROM biblioteca.CategoriaLivro", []);
                return resultado.map((row: any) => {
                        const categoria = new CategoriaLivro(row.nome, row.id);
                        return categoria;
                });
        }catch(err){
            console.error("Erro ao listar categorias de livros no repositório: ", err);
            throw err;
        }
    }

    async buscarPorId(id: number): Promise <CategoriaLivro | undefined>{
        try{
            const resultado = await executarComandoSQL("SELECT * FROM biblioteca.CategoriaLivro WHERE id = ?", [id]);
            if (resultado.length > 0) {
                const row = resultado[0];
                return new CategoriaLivro(row.nome, row.id);
            }
        }catch(err){
            console.error("Erro ao listar categorias de livro no repositório: ", err);
            throw err;
        }
    }

    async deletarCategoria(id: number): Promise<boolean> {
        try {
            const resultado: any = await executarComandoSQL(
                "DELETE FROM biblioteca.CategoriaLivro WHERE id = ?",
                [id]
            );
            return resultado.affectedRows > 0; 
        } catch (err) {
            console.error("Erro ao deletar categoria de livro no repositório:", err);
            throw err;
        }
    }
}
