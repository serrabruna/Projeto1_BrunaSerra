import { Curso } from "../model/entity/Curso";
import { executarComandoSQL } from "../database/mysql";

export class CursoRepository{
    private static instance: CursoRepository;

    constructor(){}

    public static getInstance(): CursoRepository {
        if(!this.instance){
            this.instance = new CursoRepository;
        }
        return this.instance;
    }

    async createTable(){
        const query = ` CREATE TABLE IF NOT EXISTS biblioteca.Curso (
            id INT PRIMARY KEY AUTO_INCREMENT,
            nome VARCHAR(255) NOT NULL UNIQUE
            )`;
        try {
            const resultado = await executarComandoSQL(query, []);
            console.log("Tabela Curso criada com sucesso:", resultado);
        } catch (err) {
                console.error("Erro ao executar a query:", err);
            }
    }

    async insertCurso(nome: string): Promise<Curso>{
        const resultado = await executarComandoSQL(
            "INSERT INTO biblioteca.Curso (nome) VALUES (?)",
            [nome]
        );
        const newCurso = new Curso(nome);
        newCurso.id = resultado.insertId;
        +console.log("Curso inserido com sucesso:", newCurso);
        return newCurso;
    }

    async listarCursos(): Promise<Curso[]>{
            const resultado = await executarComandoSQL("SELECT * FROM biblioteca.Curso", []);
            return resultado.map((row: any) => new Curso(row.id, row.nome));
        }
    
    async buscarPorId(id: number): Promise <Curso | undefined>{
        const resultado = await executarComandoSQL("SELECT * FROM biblioteca.Curso WHERE id = ?", [id]);
        if (resultado.length > 0) {
            const row = resultado[0];
            return new Curso(row.id, row.nome);
        }
        return undefined;
        }
    }
