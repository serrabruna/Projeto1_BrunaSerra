import { Estoque } from "../model/entity/Estoque";
import { executarComandoSQL } from "../database/mysql";

export class EstoqueRepository {
  private static instance: EstoqueRepository;

  constructor() {}

  public static getInstance(): EstoqueRepository {
    if (!this.instance) {
      this.instance = new EstoqueRepository();
    }
    return this.instance;
  }

  async createTable(){
      const query = `CREATE TABLE IF NOT EXISTS biblioteca.Estoque (
          codigo INT PRIMARY KEY,
          livro_isbn VARCHAR(13) NOT NULL,
          quantidade INT NOT NULL,
          quantidade_emprestada INT DEFAULT 0,
          status ENUM('disponivel', 'emprestado') DEFAULT 'disponivel',
          FOREIGN KEY (livro_isbn) REFERENCES biblioteca.Livro(isbn)
      )`
      try {
          await executarComandoSQL(query, []);
          console.log("Tabela Estoque criada com sucesso.");
      }catch (err) {
        console.error("Erro ao criar a tabela Estoque:", err);
      }   
  }

  async insertExemplar(codigo: number, livro_isbn: string, quantidade: number, quantidade_emprestada: number): Promise<Estoque>{
      try {
          const resultado: any = await executarComandoSQL(
              "INSERT INTO biblioteca.Estoque (codigo, livro_isbn, quantidade, quantidade_emprestada, status) VALUES (?, ?, ?, ?, 'disponivel')",
              [codigo, livro_isbn, quantidade, quantidade_emprestada]
          );
          const newExemplar = new Estoque(codigo, livro_isbn, quantidade, quantidade_emprestada);
          console.log("Exemplar inserido com sucesso:", newExemplar);
          return newExemplar;
      }catch (err) {
          console.error("Erro ao inserir exemplar:", err);
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
        
        try {
            const resultado: any = await executarComandoSQL(query, [
                estoque.quantidade,
                estoque.quantidade_emprestada,
                estoque.status,
                estoque.codigo
            ]);
            if (resultado.affectedRows > 0) {
                // Retorna o estado atualizado do estoque do BD
                return this.buscarPorCodigo(estoque.codigo!); // 'codigo!' afirma que não será undefined
            }
            return undefined; // Retorna undefined se o registro não for encontrado/afetado
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
