import { Emprestimo } from "../model/entity/Emprestimo";
import { executarComandoSQL } from "../database/mysql";

export class EmprestimoRepository {
  private static instance: EmprestimoRepository;

  private constructor() {}

  public static getInstance(): EmprestimoRepository {
    if (!this.instance) {
      this.instance = new EmprestimoRepository();
    }
    return this.instance;
  }

  async createTable(): Promise<void> {
        const query = `CREATE TABLE IF NOT EXISTS biblioteca.Emprestimo (
                id INT AUTO_INCREMENT PRIMARY KEY,
                cpfUsuario VARCHAR(11) NOT NULL,
                usuarioId INT NOT NULL,
                codigoExemplar INT NOT NULL,
                dataEmprestimo DATETIME NOT NULL,
                dataDevolucaoPrevista DATETIME NOT NULL,
                dataEntrega DATETIME,
                diasAtraso INT DEFAULT 0,
                suspensaoAte DATETIME, 
                FOREIGN KEY (usuarioId) REFERENCES biblioteca.Usuario(id),
                FOREIGN KEY (codigoExemplar) REFERENCES biblioteca.Estoque(codigo)
            )`;
        try {
            await executarComandoSQL(query, []);
            console.log("Tabela Emprestimo criada com sucesso.");
        } catch (err) {
            console.error("Erro ao criar a tabela Emprestimo:", err);
            throw err;
        }
    }

    async insertEmprestimo(emprestimo: Emprestimo): Promise<Emprestimo> {
      try {
          const dataEmprestimoISO = emprestimo.dataEmprestimo.toISOString().slice(0, 19).replace('T', ' ');
          const dataDevolucaoPrevistaISO = emprestimo.dataDevolucaoPrevista.toISOString().slice(0, 19).replace('T', ' ');
          const dataEntregaISO = emprestimo.dataEntrega ? emprestimo.dataEntrega.toISOString().slice(0, 19).replace('T', ' ') : null;
          const suspensaoAteISO = emprestimo.suspensaoAte ? emprestimo.suspensaoAte.toISOString().slice(0, 19).replace('T', ' ') : null;

          const resultado = await executarComandoSQL(
              "INSERT INTO biblioteca.Emprestimo (cpfUsuario, usuarioId, codigoExemplar, dataEmprestimo, dataDevolucaoPrevista, dataEntrega, diasAtraso, suspensaoAte) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
              [
                emprestimo.cpfUsuario,
                emprestimo.usuarioId,
                emprestimo.codigoExemplar,
                dataEmprestimoISO,
                dataDevolucaoPrevistaISO,
                dataEntregaISO,
                emprestimo.diasAtraso || 0, 
                suspensaoAteISO
                ]
            );
          emprestimo.id = resultado.insertId;
          console.log("Empréstimo inserido com sucesso:", emprestimo);
          return emprestimo;
      } catch (err) {
          console.error("Erro ao inserir empréstimo:", err);
          throw err;
        }
    }


  async listarEmprestimos(): Promise<Emprestimo[]> {
    try {
        const resultado = await executarComandoSQL("SELECT * FROM biblioteca.Emprestimo", []);
        return resultado.map((row: any) => new Emprestimo(
            row.cpfUsuario,
            row.usuarioId,
            row.codigoExemplar,
            new Date(row.dataEmprestimo),
            new Date(row.dataDevolucaoPrevista),
            row.dataEntrega ? new Date(row.dataEntrega) : undefined,
            row.diasAtraso,
            row.suspensaoAte ? new Date(row.suspensaoAte) : undefined,
            row.id
        ));
    } catch (err) {
        console.error("Erro ao listar empréstimos:", err);
        throw err;
    }
  }

  async buscarEmprestimoPorId(id: number): Promise<Emprestimo | undefined> {
      try {
          const resultado = await executarComandoSQL("SELECT * FROM biblioteca.Emprestimo WHERE id = ?", [id]);
          if (resultado.length > 0) {
              const row = resultado[0];
              return new Emprestimo(
                  row.cpfUsuario,
                  row.usuarioId,
                  row.codigoExemplar,
                  new Date(row.dataEmprestimo),
                  new Date(row.dataDevolucaoPrevista),
                  row.dataEntrega ? new Date(row.dataEntrega) : undefined,
                  row.diasAtraso,
                  row.suspensaoAte ? new Date(row.suspensaoAte) : undefined,
                  row.id
              );
          }
          return undefined;
      } catch (err) {
          console.error("Erro ao buscar empréstimo por ID:", err);
          throw err;
        }
  }

  async listarPorUsuario(cpfUsuario: string): Promise<Emprestimo[]> {
    try {
          const resultado = await executarComandoSQL(
            "SELECT * FROM biblioteca.Emprestimo WHERE cpfUsuario = ?",
            [cpfUsuario]
          );
          return resultado.map((row: any) => new Emprestimo(
              row.cpfUsuario,
              row.usuarioId,
              row.codigoExemplar,
              new Date(row.dataEmprestimo),
              new Date(row.dataDevolucaoPrevista),
              row.dataEntrega ? new Date(row.dataEntrega) : undefined,
              row.diasAtraso,
              row.suspensaoAte ? new Date(row.suspensaoAte) : undefined,
              row.id
          ));
    } catch (err) {
        console.error("Erro ao listar empréstimos por usuário:", err);
        throw err;
        }
  }

  async atualizarEmprestimo(emprestimo: Emprestimo): Promise<Emprestimo | undefined> {
        const dataEmprestimoISO = emprestimo.dataEmprestimo.toISOString().slice(0, 19).replace('T', ' '); //
        const dataDevolucaoPrevistaISO = emprestimo.dataDevolucaoPrevista.toISOString().slice(0, 19).replace('T', ' '); //
        const dataEntregaISO = emprestimo.dataEntrega ? emprestimo.dataEntrega.toISOString().slice(0, 19).replace('T', ' ') : null; //
        const suspensaoAteISO = emprestimo.suspensaoAte ? emprestimo.suspensaoAte.toISOString().slice(0, 19).replace('T', ' ') : null; //

        const query = `UPDATE biblioteca.Emprestimo
            SET cpfUsuario = ?, usuarioId = ?, codigoExemplar = ?, dataEmprestimo = ?, dataDevolucaoPrevista = ?, dataEntrega = ?, diasAtraso = ?, suspensaoAte = ?
            WHERE id = ?`;

        try { 
            const resultado: any = await executarComandoSQL(query, [ 
                emprestimo.cpfUsuario, 
                emprestimo.usuarioId, 
                emprestimo.codigoExemplar,
                dataEmprestimoISO, 
                dataDevolucaoPrevistaISO, 
                dataEntregaISO,
                emprestimo.diasAtraso || 0, 
                suspensaoAteISO, 
                emprestimo.id 
            ]); 
            if (resultado.affectedRows > 0) { 
                return this.buscarEmprestimoPorId(emprestimo.id!);
            } 
            return undefined; 
        } catch (err) { 
            console.error("Erro ao atualizar empréstimo:", err); 
            throw err; 
        } 
  }


  async emprestimosAbertos(cpfUsuario: string): Promise<Emprestimo[]> {
    try {
        const resultado = await executarComandoSQL(
            "SELECT * FROM biblioteca.Emprestimo WHERE cpfUsuario = ? AND dataEntrega IS NULL",
            [cpfUsuario]
        );
        return resultado.map((row: any) => new Emprestimo(
          row.cpfUsuario,
          row.usuarioId,
          row.codigoExemplar,
          new Date(row.dataEmprestimo),
          new Date(row.dataDevolucaoPrevista),
          row.dataEntrega ? new Date(row.dataEntrega) : undefined,
          row.diasAtraso,
          row.suspensaoAte ? new Date(row.suspensaoAte) : undefined,
          row.id
        ));
    } catch (err) {
        console.error("Erro ao listar empréstimos abertos por usuário:", err);
        throw err;
      }
  }
}
