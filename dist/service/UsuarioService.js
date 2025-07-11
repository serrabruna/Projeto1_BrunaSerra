"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const Usuario_1 = require("../model/entity/Usuario");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
const CategoriaUsuarioService_1 = require("./CategoriaUsuarioService");
const CursoService_1 = require("./CursoService");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
class UsuarioService {
    usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
    categoriaService = new CategoriaUsuarioService_1.CategoriaUsuarioService();
    cursoService = new CursoService_1.CursoService();
    emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
    async cadastrarUsuario(usuarioData) {
        const { cpf, nome, email, categoriaId, cursoId } = usuarioData;
        if (!cpf || !nome || !email || !categoriaId) {
            throw new Error("Informações incompletas");
        }
        if (!Usuario_1.Usuario.validarCPF(cpf)) {
            throw new Error("CPF Inválido!");
        }
        try {
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
            return this.usuarioRepository.insertUsuario(cpf, nome, email, categoriaId, cursoFinal);
        }
        catch (error) {
            console.error("Erro ao cadastrar usuário");
            throw error;
        }
    }
    async listarUsuarios() {
        try {
            const usuarios = await this.usuarioRepository.listarUsuarios();
            return usuarios;
        }
        catch (error) {
            console.error("Erro ao listar usuários");
            throw error;
        }
    }
    async listarUsuarioComFiltro(filtros) {
        try {
            const { nome, status, categoriaId, cursoId } = filtros;
            const usuarios = await this.usuarioRepository.listarUsuarios();
            return usuarios.filter(usuario => {
                const combinaNomes = nome ? usuario.nome.toLowerCase().includes(nome.toLowerCase()) : true;
                const combinaStatus = status ? usuario.status === status : true;
                const combinaCatId = categoriaId ? usuario.categoriaId === categoriaId : true;
                const combinaCurId = cursoId ? usuario.cursoId === cursoId : true;
                return combinaNomes && combinaStatus && combinaCatId && combinaCurId;
            });
        }
        catch (error) {
            console.error("Erro ao listar usuários com filtro:", error);
            throw error;
        }
    }
    async buscarUsuario(cpf) {
        try {
            if (!Usuario_1.Usuario.validarCPF(cpf)) {
                throw new Error("CPF inválido!");
            }
            const usuario = await this.usuarioRepository.buscarUsuarioPorCPF(cpf);
            if (!usuario) {
                throw new Error("Usuario não encontrado!");
            }
            return usuario;
        }
        catch (error) {
            console.error("Erro ao buscar usuário");
            throw error;
        }
    }
    async atualizarUsuario(cpf, novosDados) {
        try {
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
        }
        catch (error) {
            console.error("Erro ao atualizar usuário");
            throw error;
        }
    }
    async aplicarSuspensao(cpf, diasAtraso) {
        try {
            const usuario = await this.usuarioRepository.buscarUsuarioPorCPF(cpf);
            if (!usuario)
                return;
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
        }
        catch (error) {
            console.error("Erro ao aplicar suspensão");
            throw error;
        }
    }
    async removerUsuario(cpf) {
        try {
            if (!Usuario_1.Usuario.validarCPF(cpf)) {
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
        }
        catch (error) {
            console.error("Erro ao remover usuário");
            throw error;
        }
    }
    async verificarInativacaoUsuario(cpf) {
        try {
            const usuario = await this.usuarioRepository.buscarUsuarioPorCPF(cpf);
            if (!usuario)
                return;
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
        }
        catch (error) {
            console.error("Erro ao verificar inativação");
        }
    }
}
exports.UsuarioService = UsuarioService;
