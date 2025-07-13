import { Estoque } from "../model/entity/Estoque";
import { executarComandoSQL } from "../database/mysql";

export class EstoqueRepository {
    private static instance: EstoqueRepository;

    private constructor() {
        this.createTable();
    }

    public static getInstance(): EstoqueRepository {
    if (!this.instance) {
        this.instance = new EstoqueRepository();
    }
    return this.instance;
    }

    private async createTable(): Promise<void> {
        const query = `
            CREATE TABLE IF NOT EXISTS biblioteca.Estoque (
                codigo INT AUTO_INCREMENT PRIMARY KEY,
                livro_isbn VARCHAR(13) NOT NULL UNIQUE,
                quantidade INT NOT NULL,
                quantidade_emprestada INT DEFAULT 0,
                status ENUM('disponivel', 'emprestado') DEFAULT 'disponivel'
            );`;
        try {
            await executarComandoSQL(query, []);
            console.log("Tabela Estoque criada com sucesso (modelo de resumo por ISBN).");
        } catch (err) {
            console.error("Erro ao criar a tabela Estoque:", err);
            throw err;
        }
    }

    async insertExemplar(livro_isbn: string, quantidade: number, quantidade_emprestada: number = 0): Promise<Estoque> {
        try {
            const resultado: any = await executarComandoSQL(
                "INSERT INTO biblioteca.Estoque (livro_isbn, quantidade, quantidade_emprestada, status) VALUES (?, ?, ?, ?)",
                [livro_isbn, quantidade, quantidade_emprestada, (quantidade > quantidade_emprestada) ? 'disponivel' : (quantidade_emprestada > 0 ? 'emprestado' : 'disponivel')]
            );
            const newExemplar = new Estoque(livro_isbn, quantidade, quantidade_emprestada, resultado.insertId);
            console.log("Registro de Estoque inserido com sucesso:", newExemplar);
            return newExemplar;
        } catch (err) {
            console.error("Erro ao inserir registro de estoque:", err);
            throw err;
        }
    }


    async buscarPorISBN(isbn: string): Promise<Estoque | undefined> {
        try {
            const resultado: any[] = await executarComandoSQL(
                "SELECT * FROM biblioteca.Estoque WHERE livro_isbn = ?",
                [isbn]
            );
            if (resultado.length > 0) {
                const row = resultado[0];
                return new Estoque(
                    row.livro_isbn,
                    row.quantidade,
                    row.quantidade_emprestada,
                    row.codigo
                );
            }
            return undefined;
        } catch (err) {
            console.error("Erro ao buscar estoque por ISBN:", err);
            throw err;
        }
    }

    async buscarPorCodigo(codigo: number): Promise<Estoque | undefined> {
        try {
            const resultado: any[] = await executarComandoSQL(
                "SELECT * FROM biblioteca.Estoque WHERE codigo = ?",
                [codigo]
            );
            if (resultado.length > 0) {
                const row = resultado[0];
                return new Estoque(
                    row.livro_isbn,
                    row.quantidade,
                    row.quantidade_emprestada,
                    row.codigo
                );
            }
            return undefined;
        } catch (err) {
            console.error("Erro ao buscar estoque por código:", err);
            throw err;
        }
    }
    
    async listarEstoque(): Promise<Estoque[]> {
        try {
            const resultado: any[] = await executarComandoSQL("SELECT * FROM biblioteca.Estoque", []);
            return resultado.map((row: any) => new Estoque(
                row.livro_isbn,
                row.quantidade,
                row.quantidade_emprestada,
                row.codigo
            ));
        } catch (err) {
            console.error("Erro ao listar estoque:", err);
            throw err;
        }
    }

    async atualizarDadosEstoque(estoque: Estoque): Promise<Estoque | undefined> {
        const query = `UPDATE biblioteca.Estoque SET quantidade = ?, quantidade_emprestada = ?, status = ?
            WHERE codigo = ?`;


        const params = [
        estoque.quantidade,
        estoque.quantidade_emprestada,
        estoque.status,
        estoque.codigo
    ];

        console.log("DEBUG REPO: Query de atualização de Estoque:", query); // <-- QUERO VER ESTE OUTPUT
        console.log("DEBUG REPO: Parâmetros de atualização de Estoque:", params); // <-- E ESTE
    
        
        try {
            const resultado: any = await executarComandoSQL(query, [
                estoque.quantidade,
                estoque.quantidade_emprestada,
                estoque.status,
                estoque.codigo
            ]);
            if (resultado.affectedRows > 0) {
                return this.buscarPorCodigo(estoque.codigo!);
            }
            return undefined; 
        } catch (err) {
            console.error("Erro ao atualizar dados do estoque:", err);
            throw err;
        }
    }

    async remover(codigo: number): Promise<boolean> {
        try {
            const resultado: any = await executarComandoSQL(
                "DELETE FROM biblioteca.Estoque WHERE codigo = ?",
                [codigo]
            );
            return resultado.affectedRows > 0;
        } catch (err) {
            console.error("Erro ao remover estoque:", err);
            throw err;
        }
    }
}
