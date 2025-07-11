import { CategoriaUsuario } from "../model/entity/CategoriaUsuario";
import { executarComandoSQL } from "../database/mysql";

export class CategoriaUsuarioRepository{
    private static instance: CategoriaUsuarioRepository;

    private constructor(){
        this.createTable();
    }

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
            console.error("Erro ao criar tabela CategoriaUsuario:", err);
        }
    }

    async insertCategoriaUsuario(nome: string): Promise<CategoriaUsuario> {
        try{
            const resultado = await executarComandoSQL(
                "INSERT INTO biblioteca.CategoriaUsuario (nome) VALUES (?)",
                [nome]
            );
            const newCategoriaUsuario = new CategoriaUsuario(nome, resultado.insertId);
            +console.log("Categoria de usuario inserida com sucesso:", newCategoriaUsuario);
            return newCategoriaUsuario;
        }catch(err){
            console.error("Erro ao inserir categoria de usuário no repositório: ", err);
            throw err;
        }
    }

    async listarCategorias(): Promise<CategoriaUsuario[]>{
        try{
            const resultado = await executarComandoSQL("SELECT * FROM biblioteca.CategoriaUsuario", []);
            return resultado.map((row: any) => {
            const categoria = new CategoriaUsuario(row.nome, row.id);
            return categoria;
        });
        }catch(err){
            console.error("Erro ao listar categorias de usuário no repositório: ", err);
            throw err;
        }
    }

    async buscarPorId(id: number): Promise <CategoriaUsuario | undefined>{
        try{
            const resultado = await executarComandoSQL("SELECT * FROM biblioteca.CategoriaUsuario WHERE id = ?", [id]);
            if (resultado.length > 0) {
                const row = resultado[0];
                return new CategoriaUsuario(row.nome, row.id);
            }
        }catch(err){
            console.error("Erro ao listar categorias de usuário no repositório: ", err);
            throw err;
        }
    }

    async deletarCategoria(id: number): Promise<boolean> {
        try {
            const resultado: any = await executarComandoSQL(
                "DELETE FROM biblioteca.CategoriaUsuario WHERE id = ?",
                [id]
            );
            return resultado.affectedRows > 0; 
        } catch (err) {
            console.error("Erro ao deletar categoria de usuário no repositório:", err);
            throw err;
        }
    }
}