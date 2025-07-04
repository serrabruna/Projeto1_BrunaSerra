import {Usuario} from "../model/Usuario"
import { executarComandoSQL } from "../database/mysql";

type DadosAtualizacaoUsuario = {
    nome?: string;
    email?: string;
    categoriaId?: number;
    cursoId?: number;
}

export class UsuarioRepository{
    private static instance: UsuarioRepository;
    private usuarios: Usuario[] = [];

    constructor(){}

    public static getInstance(): UsuarioRepository{
        if(!this.instance) {
            this.instance = new UsuarioRepository();
        }
        return this.instance;
    }

    private imprimeResult(err:any, result:any){
        if(result != undefined){
            console.log("Dentro callback", result);
        }
    }

    async createTable() {
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
            )`
        try{
            const resultado = await executarComandoSQL(query, []);
            console.log('Tabela Usuario criada com sucesso:', resultado);
        }catch(err){
            console.error('Erro ao executar a query:', err);
        }
    }

    async insertUsuario(
        cpf: string,
        nome: string,
        email: string,
        categoriaId: number,
        cursoId: number
    ):Promise<Usuario>{
        const resultado = await executarComandoSQL(
            "INSERT INTO biblioteca.Usuario (cpf, nome, email, categoriaId, cursoId, status, diaSuspensao) VALUES (?, ?, ?, ?, ?, 'ativo', 0)",
            [cpf, nome, email, categoriaId, cursoId]
        );
        const newUsuario = new Usuario(cpf, nome, email, categoriaId, cursoId);
        newUsuario.id = resultado.insertId;+

        console.log('Usuario inserido com sucesso:', newUsuario);
        return newUsuario;
    }

    async buscarUsuarioPorCPF(cpf:string): Promise <Usuario | null>{
        const resultado = await executarComandoSQL("SELECT * FROM biblioteca.Usuario WHERE cpf = ?", [cpf]);
        if(resultado.length > 0){
            const row = resultado[0];
            const usuario = new Usuario(row.cpf, row.nome, row.email, row.categoriaId, row.cursoId);
            usuario.id = row.id;
            usuario.status = row.status;
            usuario.diaSuspensao = row.diaSuspensao;
            usuario.suspensaoAte = row.suspensaoAte;
            return usuario;
        }
        return null;
    }

    async listarUsuarios(): Promise <Usuario[]>{
        const resultado = await executarComandoSQL("SELECT * FROM biblioteca.Usuario", []);
        return resultado.map((row: any) => {
            const usuario = new Usuario(row.cpf, row.nome, row.email, row.categoriaId, row.cursoId);
            usuario.id = row.id;
            usuario.status = row.status;
            usuario.diaSuspensao = row.diaSuspensao;
            usuario.suspensaoAte = row.suspensaoAte;
            return usuario;
        });
    }

    async atualizarDadosUsuario(cpf: string, novosDados: DadosAtualizacaoUsuario): Promise<boolean>{
        const campos = [];
        const valores = [];

        if(novosDados.nome){
            campos.push("nome = ?");
            valores.push(novosDados.nome);
        }
        if(novosDados.email){
            campos.push("email = ?");
            valores.push(novosDados.email);
        }
        if(novosDados.categoriaId){
            campos.push("categoriaId = ?");
            valores.push(novosDados.categoriaId);
        }
        if(novosDados.cursoId){
            campos.push("cursoId = ?");
            valores.push(novosDados.cursoId);
        }

        if(campos.length == 0) return false;

        valores.push(cpf);
        const query = `UPDATE biblioteca.Usuario SET ${campos.join(", ")}  WHERE cpf = ?`;
        await executarComandoSQL(query, valores);
        return true;
    }

    async removerUsuario(cpf: string): Promise<boolean>{
        const resultado = await executarComandoSQL("DELETE FROM biblioteca.Usuario WHERE cpf = ?", [cpf]);
        return resultado.affectedRows > 0;
    }
}