import { Usuario } from "../model/entity/Usuario";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { CategoriaUsuarioService } from "./CategoriaUsuarioService";
import { CursoService } from "./CursoService";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { executarComandoSQL } from "../database/mysql";

type DadosAtualizacaoUsuario = {
    cpf?: string;
    nome?: string;
    email?: string;
    categoriaId?: number;
    cursoId?: number;
    status?: "ativo" | "inativo" | "suspenso";
    diaSuspensao?: number;
    suspensaoAte?: Date;
};

export class UsuarioService {
    usuarioRepository: UsuarioRepository = UsuarioRepository.getInstance();
    categoriaService: CategoriaUsuarioService = new CategoriaUsuarioService();
    cursoService: CursoService = new CursoService();
    emprestimoRepository: EmprestimoRepository = EmprestimoRepository.getInstance();

    async cadastrarUsuario(usuarioData: any): Promise<Usuario> {
        const { cpf, nome, email, categoriaId, cursoId } = usuarioData;
        if (!cpf || !nome || !email || !categoriaId) {
            throw new Error("Informações incompletas");
        }
        if (!Usuario.validarCPF(cpf)) {
            throw new Error("CPF Inválido!");
        }
        try{
            const existente = await this.usuarioRepository.buscarUsuarioPorCPF(cpf);
            if (existente) {
                throw new Error("CPF já cadastrado");
            }

            const categoria = await this.categoriaService.buscarPorId(categoriaId);
            if (!categoria) {
                throw new Error("Categoria inválida!");
            }

            if (categoriaId !== 3 && cursoId === undefined) {
                throw new Error("Curso é obrigatório para alunos e professores.");
            }

            if (cursoId !== undefined) {
                const curso = this.cursoService.buscarPorId(cursoId);
                if (!curso) {
                    throw new Error("Curso Inválido!");
                }
            }

            const cursoFinal = categoriaId === 3 ? 0 : cursoId;

            return this.usuarioRepository.insertUsuario(
                cpf,
                nome,
                email,
                categoriaId,
                cursoFinal
            );
        }catch(error){
            console.error("Erro ao cadastrar usuário");
            throw error;
        }
        
    }

    async listarUsuarios(): Promise<Usuario[]> {
        try{
            const resultado = await executarComandoSQL(
                "SELECT * FROM biblioteca.Usuario", []
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
        }catch(error){
            console.error("Erro ao listar usuários");
            throw error;
        }
        
    }

    async buscarUsuario(cpf: string): Promise<Usuario> {
        try{
            if (!Usuario.validarCPF(cpf)) {
                throw new Error("CPF inválido!");
            }

            const usuario = await this.usuarioRepository.buscarUsuarioPorCPF(cpf);

            if (!usuario) {
                throw new Error("Usuario não encontrado!");
            }

            return usuario;
        }catch(error){
            console.error("Erro ao buscar usuário");
            throw error;
        }
    }

    async atualizarUsuario(cpf: string, novosDados: DadosAtualizacaoUsuario): Promise<Usuario> {
        try{
            const usuario = await this.usuarioRepository.buscarUsuarioPorCPF(cpf);

            if (!usuario) {
                throw new Error("Usuário não encontrado!");
            }

            if (!novosDados.nome && !novosDados.email && !novosDados.categoriaId && !novosDados.cursoId) {
                throw new Error("Nenhum dado informado para atualização.");
            }

            if (novosDados.cpf && novosDados.cpf !== cpf) {
                throw new Error("Não é permitido alterar o CPF!");
            }

            if (novosDados.categoriaId) {
                const categoria = await this.categoriaService.buscarPorId(novosDados.categoriaId);
                if (!categoria) {
                    throw new Error("Categoria Inválida!");
                }
            }

            if (novosDados.cursoId) {
                const curso = this.cursoService.buscarPorId(novosDados.cursoId);
                if (!curso) {
                    throw new Error("Curso Inválido!");
                }
            }

            usuario.nome = novosDados.nome ?? usuario.nome;
            usuario.email = novosDados.email ?? usuario.email;
            usuario.categoriaId = novosDados.categoriaId ?? usuario.categoriaId;
            usuario.cursoId = novosDados.cursoId ?? usuario.cursoId;
            usuario.status = novosDados.status ?? usuario.status;
            usuario.diaSuspensao = novosDados.diaSuspensao ?? usuario.diaSuspensao;
            usuario.suspensaoAte = novosDados.suspensaoAte ?? usuario.suspensaoAte;

            const usuarioAtualizado = await this.usuarioRepository.atualizarDadosUsuario(usuario);
            if (!usuarioAtualizado) {
                throw new Error("Erro inesperado ao atualizar usuário ou usuário não encontrado!");
            }
            return usuarioAtualizado;
        }catch(error){
            console.error("Erro ao atualizar usuário");
            throw error;
        }
    }

    async aplicarSuspensao(cpf: string, diasAtraso: number): Promise<void> {
        try{
            const usuario = await this.usuarioRepository.buscarUsuarioPorCPF(cpf);
            if (!usuario) return;

            const diasSuspensaoCalculado = diasAtraso * 3;
            usuario.diaSuspensao = diasSuspensaoCalculado;

            const emprestimos = await this.emprestimoRepository.listarPorUsuario(cpf);
            const atrasados = emprestimos.filter((e) => e.diasAtraso && e.diasAtraso > 0);

            if (diasSuspensaoCalculado > 60) {
                usuario.status = "suspenso";
            }
            if (atrasados.length > 2) {
                usuario.status = "inativo";
            }

            await this.usuarioRepository.atualizarDadosUsuario(usuario);
        }catch(error){
            console.error("Erro ao aplicar suspensão");
            throw error;
        }
    }

    async removerUsuario(cpf: string): Promise<boolean> {
        try{
            if (!Usuario.validarCPF(cpf)) {
                throw new Error("CPF Inválido!");
            }

            const usuario = await this.usuarioRepository.buscarUsuarioPorCPF(cpf);
            if (!usuario) {
                throw new Error("Usuário não encontrado.");
            }

            const emprestimosAtivos = await this.emprestimoRepository.emprestimosAbertos(cpf);
            if (emprestimosAtivos.length > 0) {
                throw new Error("Usuário não pode ser removido: possui empréstimos em aberto.");
            }

            const sucesso = await this.usuarioRepository.removerUsuario(cpf);
            if (!sucesso) {
                throw new Error("Erro ao remover usuário.");
            }
            return sucesso;
        }catch(error){
            console.error("Erro ao remover usuário");
            throw error;
        }
    }

    async verificarInativacaoUsuario(cpf: string): Promise<void> {
        try{
            const usuario = await this.usuarioRepository.buscarUsuarioPorCPF(cpf);
            if (!usuario) return;

            const emprestimos = await this.emprestimoRepository.listarPorUsuario(cpf);
            const hoje = new Date();

            const atrasosGraves = emprestimos.filter((e) => {
                if (!e.dataEntrega && e.dataDevolucaoPrevista) {
                    const diff = hoje.getTime() - e.dataDevolucaoPrevista.getTime();
                    return diff / (1000 * 60 * 60 * 24) > 60;
                }
                return false;
            });

            if (atrasosGraves.length > 0) {
                usuario.status = "inativo";
                usuario.diaSuspensao = 0;
                await this.usuarioRepository.atualizarDadosUsuario(usuario);
            }
        }catch(error){
            console.error("Erro ao verificar inativação");
        }
    }
}
