"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const Usuario_1 = require("../model/Usuario");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
const CategoriaUsuarioService_1 = require("./CategoriaUsuarioService");
const CursoService_1 = require("./CursoService");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
class UsuarioService {
    usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
    categoriaService = new CategoriaUsuarioService_1.CategoriaUsuarioService();
    cursoService = new CursoService_1.CursoService();
    emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
    cadastrarUsuario(usuarioData) {
        const { cpf, nome, email, categoriaId, cursoId } = usuarioData;
        if (!cpf || !nome || !email || !categoriaId) {
            throw new Error("Informações incompletas");
        }
        if (!Usuario_1.Usuario.validarCPF(cpf)) {
            throw new Error("CPF Inválido!");
        }
        if (this.usuarioRepository.buscarUsuarioPorCPF(cpf)) {
            throw new Error("CPF já cadastrado!");
        }
        const categoria = this.categoriaService.buscarPorId(categoriaId);
        if (!categoria) {
            throw new Error("Categoria inválida!");
        }
        if (categoriaId !== 3) {
            if (cursoId === undefined) {
                throw new Error("Curso é obrigatório para alunos e professores.");
            }
            const curso = this.cursoService.buscarPorId(cursoId);
            if (!curso) {
                throw new Error("Curso inválido!");
            }
        }
        const cursoFinal = categoriaId === 3 ? 0 : cursoId;
        const novoUsuario = new Usuario_1.Usuario(cpf, nome, email, categoriaId, cursoFinal);
        this.usuarioRepository.InserirUsuario(novoUsuario);
        return novoUsuario;
    }
    listarUsuarioComFiltro(filtros) {
        const { nome, status, categoriaId, cursoId } = filtros;
        const usuarios = this.usuarioRepository.listarUsuarios();
        return usuarios.filter(usuario => {
            const combinaNomes = nome ? usuario.nome.toLowerCase().includes(nome.toLowerCase()) : true;
            const combinaStatus = status ? usuario.status === status : true;
            const combinaCatId = categoriaId ? usuario.categoriaId === categoriaId : true;
            const combinaCurId = cursoId ? usuario.cursoId === cursoId : true;
            return combinaNomes && combinaStatus && combinaCatId && combinaCurId;
        });
    }
    buscarUsuario(cpf) {
        if (!Usuario_1.Usuario.validarCPF(cpf)) {
            throw new Error("CPF inválido!");
        }
        const usuario = this.usuarioRepository.buscarUsuarioPorCPF(cpf);
        if (!usuario) {
            throw new Error("Usuario não encontrado!");
        }
        return usuario;
    }
    atualizarUsuario(cpf, novosDados) {
        const usuario = this.usuarioRepository.buscarUsuarioPorCPF(cpf);
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
            const categoria = this.categoriaService.buscarPorId(novosDados.categoriaId);
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
        const usuarioAtualizado = this.usuarioRepository.atualizarDadosUsuario(cpf, novosDados);
        if (!usuarioAtualizado) {
            throw new Error("Erro inesperado ao atualizar usuário!");
        }
        return usuarioAtualizado;
    }
    aplicarSuspensao(cpf, diasAtraso) {
        const usuario = this.usuarioRepository.buscarUsuarioPorCPF(cpf);
        if (!usuario)
            return;
        const diasSuspensao = diasAtraso * 3;
        usuario.diaSuspensao = diasSuspensao;
        if (diasSuspensao > 60) {
            usuario.status = "suspenso";
        }
        const emprestimos = this.emprestimoRepository.listarPorUsuario(cpf);
        const atrasados = emprestimos.filter(e => e.diasAtraso && e.diasAtraso > 0);
        if (atrasados.length > 2) {
            usuario.status = "inativo";
        }
        else if (diasSuspensao > 60) {
            usuario.status = "suspenso";
        }
    }
    removerUsuario(cpf) {
        if (!Usuario_1.Usuario.validarCPF(cpf)) {
            throw new Error("CPF Inválido!");
        }
        const usuario = this.usuarioRepository.buscarUsuarioPorCPF(cpf);
        if (!usuario) {
            throw new Error("Usuário não encontrado.");
        }
        const emprestimosAtivos = this.emprestimoRepository.emprestimosAbertos(cpf);
        if (emprestimosAtivos.length > 0) {
            throw new Error("Usuário não pode ser removido: possui empréstimos em aberto.");
        }
        const sucesso = this.usuarioRepository.removerUsuario(cpf);
        if (!sucesso) {
            throw new Error("Erro ao remover usuário.");
        }
    }
}
exports.UsuarioService = UsuarioService;
