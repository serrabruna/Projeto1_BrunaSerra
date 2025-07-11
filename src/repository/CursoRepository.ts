import { Curso } from "../model/entity/Curso";
import { executarComandoSQL } from "../database/mysql";

export class CursoRepository{
    private static instance: CursoRepository;

    private constructor(){
        this.createTable();
    }

    public static getInstance(): CursoRepository {
        if(!this.instance){
            this.instance = new CursoRepository;
        }
        return this.instance;
    }

    private async createTable(){
        const query = ` CREATE TABLE IF NOT EXISTS biblioteca.Curso (
            id INT PRIMARY KEY AUTO_INCREMENT,
            nome VARCHAR(255) NOT NULL UNIQUE
            )`;
        try {
            const resultado = await executarComandoSQL(query, []);
            console.log("Tabela Curso criada com sucesso:", resultado);
        } catch (err) {
                console.error("Erro ao criar tabela Curso:", err);
            }
    }

    async insertCurso(nome: string): Promise<Curso>{
        try{
            const resultado = await executarComandoSQL(
            "INSERT INTO biblioteca.Curso (nome) VALUES (?)",
            [nome]
        );
        const newCurso = new Curso(nome, resultado.insertId);
        +console.log("Curso inserido com sucesso:", newCurso);
        return newCurso;
        }catch(err){
            console.log("Erro ao inserir curso no repositório: ", err);
            throw err;
        }
    }

    async listarCursos(): Promise<Curso[]>{
        try{
            const resultado = await executarComandoSQL("SELECT * FROM biblioteca.Curso", []);
            return resultado.map((row: any) => {
                const curso = new Curso(row.nome, row.id);
                return curso;
            });
        }catch(err){
            console.error("Erro ao listar cursos no repositório: ", err);
            throw err;
        }
    }
    
    async buscarPorId(id: number): Promise <Curso | undefined>{
        try{
            const resultado = await executarComandoSQL("SELECT * FROM biblioteca.Curso WHERE id = ?", [id]);
            if (resultado.length > 0) {
                const row = resultado[0];
                return new Curso(row.nome, row.id);
            }
            return undefined;
        }catch(err){
            console.error("Erro ao buscar curso no repositório: ", err);
            throw err;
        }
    }

    async deletarCurso(id: number): Promise<boolean> {
        try {
            const resultado: any = await executarComandoSQL(
                "DELETE FROM biblioteca.Curso WHERE id = ?",
                [id]
            );
            return resultado.affectedRows > 0; 
        } catch (err) {
            console.error("Erro ao deletar curso no repositório:", err);
            throw err;
        }
    }
}
