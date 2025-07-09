"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const Usuario_1 = require("../model/entity/Usuario");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
const CategoriaUsuarioService_1 = require("./CategoriaUsuarioService");
const CursoService_1 = require("./CursoService");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
const mysql_1 = require("../database/mysql");
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
    async listarUsuarios() {
        const resultado = await (0, mysql_1.executarComandoSQL)("SELECT * FROM biblioteca.Usuario", []);
        return resultado.map((row) => {
            const usuario = new Usuario_1.Usuario(row.cpf, row.nome, row.email, row.categoriaId, row.cursoId);
            usuario.id = row.id;
            usuario.status = row.status;
            usuario.diaSuspensao = row.diaSuspensao;
            usuario.suspensaoAte = row.suspensaoAte;
            return usuario;
        });
    }
    async buscarUsuario(cpf) {
        if (!Usuario_1.Usuario.validarCPF(cpf)) {
            throw new Error("CPF inválido!");
        }
        const usuario = await this.usuarioRepository.buscarUsuarioPorCPF(cpf);
        if (!usuario) {
            throw new Error("Usuario não encontrado!");
        }
        return usuario;
    }
    async atualizarUsuario(cpf, novosDados) {
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
    async aplicarSuspensao(cpf, diasAtraso) {
        const usuario = await this.usuarioRepository.buscarUsuarioPorCPF(cpf);
        if (!usuario)
            return;
        const diasSuspensaoCalculado = diasAtraso * 3;
        usuario.diaSuspensao = diasSuspensaoCalculado;
        const emprestimos = this.emprestimoRepository.listarPorUsuario(cpf);
        const atrasados = emprestimos.filter((e) => e.diasAtraso && e.diasAtraso > 0);
        if (diasSuspensaoCalculado > 60) {
            usuario.status = "suspenso";
        }
        if (atrasados.length > 2) {
            usuario.status = "inativo";
        }
        await this.usuarioRepository.atualizarDadosUsuario(usuario);
    }
    async removerUsuario(cpf) {
        if (!Usuario_1.Usuario.validarCPF(cpf)) {
            throw new Error("CPF Inválido!");
        }
        const usuario = await this.usuarioRepository.buscarUsuarioPorCPF(cpf);
        if (!usuario) {
            throw new Error("Usuário não encontrado.");
        }
        const emprestimosAtivos = this.emprestimoRepository.emprestimosAbertos(cpf);
        if (emprestimosAtivos.length > 0) {
            throw new Error("Usuário não pode ser removido: possui empréstimos em aberto.");
        }
        const sucesso = await this.usuarioRepository.removerUsuario(cpf);
        if (!sucesso) {
            throw new Error("Erro ao remover usuário.");
        }
        return sucesso;
    }
    async verificarInativacaoUsuario(cpf) {
        const usuario = await this.usuarioRepository.buscarUsuarioPorCPF(cpf);
        if (!usuario)
            return;
        const emprestimos = this.emprestimoRepository.listarPorUsuario(cpf);
        const hoje = new Date();
        const atrasosGraves = emprestimos.filter((e) => {
            if (!e.dataEntrega && e.dataDevolucao) {
                const diff = hoje.getTime() - e.dataDevolucao.getTime();
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
}
exports.UsuarioService = UsuarioService;
