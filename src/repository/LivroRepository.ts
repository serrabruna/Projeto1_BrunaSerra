import { Livro } from "../model/entity/Livro";
import { executarComandoSQL } from "../database/mysql";

export class LivroRepository {
  private static instance: LivroRepository;
  
  constructor() {}

  public static getInstance(): LivroRepository {
    if (!this.instance) {
      this.instance = new LivroRepository();
    }
    return this.instance;
  }

  async createTable(){
    const query = ` CREATE TABLE IF NOT EXISTS biblioteca.Livro (
      id INT AUTO_INCREMENT PRIMARY KEY,
      isbn VARCHAR(13) NOT NULL UNIQUE,
      titulo VARCHAR(255) NOT NULL,
      autor VARCHAR(255) NOT NULL,
      editora VARCHAR(255) NOT NULL,
      edicao VARCHAR(255) NOT NULL,
      categoriaId INT NOT NULL,
      FOREIGN KEY (categoriaId) REFERENCES biblioteca.CategoriaLivro(id)
      )`;
    try {
          const resultado = await executarComandoSQL(query, []);
          console.log("Tabela Livro criada com sucesso:", resultado);
        } catch (err) {
          console.error("Erro ao executar a query:", err);
        }
  }

  async insertLivro(
    isbn: string,
    titulo: string, 
    autor: string, 
    editora: string, 
    edicao: string, 
    categoriaId: number
  ): Promise<Livro>{
    const resultado = await executarComandoSQL(
      "INSERT INTO biblioteca.Livro (isbn, titulo, autor, editora, edicao, categoriaId) VALUES (?, ?, ?, ?, ?, ?)",
      [isbn, titulo, autor, editora, edicao, categoriaId]
    );
    const newLivro = new Livro(isbn, titulo, autor, editora, edicao, categoriaId);
    newLivro.id = resultado.insertId;
    +console.log("Livro inserido com sucesso:", newLivro);
    return newLivro;
  }

  async buscarLivroPorISBN(isbn: string): Promise<Livro | undefined> {
    const resultado = await executarComandoSQL(
          "SELECT * FROM biblioteca.Livro WHERE isbn = ?",
          [isbn]
    );
    if (resultado.length > 0) {
      const row = resultado[0];
      const livro = new Livro(
        row.id,
        row.isbn,
        row.titulo,
        row.autor,
        row.editora,
        row.edicao,
        row.categoriaId
        );
        return livro;
      }
      return undefined;
    }

  async buscarLivroPorAutorEditoraEdicao(
    autor: string,
    editora: string,
    edicao: string
  ): Promise <Livro[]> {
      const resultado = await executarComandoSQL("SELECT * FROM biblioteca.Livro WHERE LOWER(autor) = LOWER(?) AND LOWER(editora) = LOWER(?) AND edicao = ?",
        [autor, editora, edicao]
      );
      return resultado.map((row: any) => new Livro(
        row.id,
        row.isbn,
        row.titulo,
        row.autor,
        row.editora,
        row.edicao,
        row.categoriaId
      ));
  }

  async listarLivros(): Promise <Livro[]> {
     const resultado = await executarComandoSQL("SELECT * FROM biblioteca.Livro", []);
      return resultado.map((row: any) => new Livro(
        row.id,
        row.isbn,
        row.titulo,
        row.autor,
        row.editora,
        row.edicao,
        row.categoriaId
      ));
  }

  async atualizarDadosLivro(livro: Livro): Promise<Livro | undefined>{
    const query = `
        UPDATE biblioteca.Livro
        SET titulo = ?, autor = ?, editora = ?, edicao = ?, categoriaId = ?
        WHERE isbn = ?`;

    const resultado: any = await executarComandoSQL(query, [
      livro.titulo,
      livro.autor,
      livro.editora,
      livro.edicao,
      livro.categoriaId,
      livro.isbn
      ]);

    if (resultado.affectedRows > 0) {
        return await this.buscarLivroPorISBN(livro.isbn);
      }
  }

  async removerLivro(isbn: string): Promise<boolean> {
    const resultado = await executarComandoSQL("DELETE FROM biblioteca.livro WHERE isbn = ?",
      [isbn]
    );
    return resultado.affectedRows > 0;
  }
}
