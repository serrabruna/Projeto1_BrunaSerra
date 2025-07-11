import { Usuario } from "../model/entity/Usuario";
import { executarComandoSQL } from "../database/mysql";

export class UsuarioRepository {
    private static instance: UsuarioRepository;
    private usuarios: Usuario[] = [];

    private constructor() {
        this.createTable();
    }

    public static getInstance(): UsuarioRepository {
        if (!this.instance) {
            this.instance = new UsuarioRepository();
        }
        return this.instance;
    }

    private async createTable() {
        const query = ` CREATE TABLE IF NOT EXISTS biblioteca.Usuario (
                id INT AUTO_INCREMENT PRIMARY KEY,
                cpf VARCHAR(11) NOT NULL UNIQUE,
                nome VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                categoriaId INT NOT NULL,
                cursoId INT NOT NULL,
                status VARCHAR(10) DEFAULT 'ativo',
                diaSuspensao INT DEFAULT 0,
                suspensaoAte DATE
                )`;
        try {
            const resultado = await executarComandoSQL(query, []);
            console.log("Tabela Usuario criada com sucesso:", resultado);
        } catch (err) {
            console.error("Erro ao criar tabela Usuário:", err);
        }
    }

    async insertUsuario(
      cpf: string,
      nome: string,
      email: string,
      categoriaId: number,
      cursoId: number
    ): Promise<Usuario> {
      try{
          const resultado = await executarComandoSQL(
              "INSERT INTO biblioteca.Usuario (cpf, nome, email, categoriaId, cursoId, status, diaSuspensao) VALUES (?, ?, ?, ?, ?, 'ativo', 0)",
              [cpf, nome, email, categoriaId, cursoId]
          );
          const newUsuario = new Usuario(cpf, nome, email, categoriaId, cursoId);
          newUsuario.id = resultado.insertId;
          +console.log("Usuario inserido com sucesso:", newUsuario);
          return newUsuario;
      }catch(err){
          console.error("Erro ao inserir usuário no repositório:", err);
          throw err;
      }
    }

    async buscarUsuarioPorCPF(cpf: string): Promise<Usuario | undefined> {
      try{
          const resultado = await executarComandoSQL(
              "SELECT * FROM biblioteca.Usuario WHERE cpf = ?",
              [cpf]
          );
          if (resultado.length > 0) {
              const row = resultado[0];
              const usuario = new Usuario(
                  row.cpf,
                  row.nome,
                  row.email,
                  row.categoriaId,
                  row.cursoId
              );
              usuario.id = row.id;
              usuario.status = row.status;
              usuario.diaSuspensao = row.diaSuspensao;
              usuario.suspensaoAte = row.suspensaoAte;
              return usuario;
          }
          return undefined;
      }catch(err){
          console.error("Erro ao buscar usuário no repositório:", err);
          throw err;
      }
    }

    async listarUsuarios(): Promise<Usuario[]> {
        try{
            const resultado = await executarComandoSQL(
                "SELECT * FROM biblioteca.Usuario",
                []
            );
            return resultado.map((row: any) => {
                  const usuario = new Usuario(
                      row.cpf,
                      row.nome,
                      row.email,
                      row.categoriaId,
                      row.cursoId
                  );
                  usuario.id = row.id;
                  usuario.status = row.status;
                  usuario.diaSuspensao = row.diaSuspensao;
                  usuario.suspensaoAte = row.suspensaoAte;
                  return usuario;
            });
        }catch(err){
            console.error("Erro ao listar usuários no repositório:", err);
            throw err;
        }
    }

    async atualizarDadosUsuario(usuario: Usuario): Promise<Usuario | undefined> {
        const query = `
            UPDATE biblioteca.Usuario
            SET nome = ?, email = ?, categoriaId = ?, cursoId = ?, status = ?, diaSuspensao = ?, suspensaoAte = ?
            WHERE cpf = ?`;

        try{
            const resultado = await executarComandoSQL(query, [
                usuario.nome,
                usuario.email,
                usuario.categoriaId,
                usuario.cursoId,
                usuario.status,
                usuario.diaSuspensao,
                usuario.suspensaoAte,
                usuario.cpf,
            ]);

            if (resultado.affectedRows > 0) {
              return this.buscarUsuarioPorCPF(usuario.cpf);
            }
            return undefined;
        }catch(err){
            console.error("Erro ao listar usuários no repositório:", err);
            throw err;
        }
    }

    async removerUsuario(cpf: string): Promise<boolean> {
        try{
            const resultado = await executarComandoSQL(
                "DELETE FROM biblioteca.Usuario WHERE cpf = ?",
                [cpf]
            );
            return resultado.affectedRows > 0;
        }catch(err){
            console.error("Erro ao remover usuário no repositório:", err);
            throw err;
        }
    }
}
