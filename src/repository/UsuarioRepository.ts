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

    InserirUsuario(usuario: Usuario){
        this.usuarios.push(usuario);
    }

    buscarUsuarioPorCPF(cpf:string): Usuario | undefined{
        return this.usuarios.find(usuario => usuario.cpf === cpf);
    }

    listarUsuarios(): Usuario[]{
        return this.usuarios;
    }

    atualizarDadosUsuario(cpf: string, novosDados: DadosAtualizacaoUsuario): Usuario | undefined{
        const usuario = this.buscarUsuarioPorCPF(cpf);
        if(!usuario) return undefined;

        if(novosDados.nome){
            usuario.nome = novosDados.nome;
        }
        if(novosDados.email){
            usuario.email = novosDados.email;
        }
        if(novosDados.categoriaId){
            usuario.categoriaId = novosDados.categoriaId;
        }
        if(novosDados.cursoId){
            usuario.cursoId = novosDados.cursoId;
        }
        return usuario;
    }

    removerUsuario(cpf: string): boolean{
        const index = this.usuarios.findIndex(u => u.cpf === cpf);
        if(index == -1){
            return false;
        }
        this.usuarios.splice(index, 1);
        return true;
    }
}