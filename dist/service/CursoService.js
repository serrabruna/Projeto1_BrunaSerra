"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoService = void 0;
const CursoRepository_1 = require("../repository/CursoRepository");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
class CursoService {
    usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
    cursoRepository = CursoRepository_1.CursoRepository.getInstance();
    async listarCursos() {
        try {
            return await this.cursoRepository.listarCursos();
        }
        catch (error) {
            console.error("Erro ao listar cursos no serviço: ", error);
            throw error;
        }
    }
    async buscarPorId(id) {
        try {
            return await this.cursoRepository.buscarPorId(id);
        }
        catch (error) {
            console.error("Erro ao buscar curso por ID no serviço: ", error);
            throw error;
        }
    }
    async cadastrarCurso(nome) {
        if (typeof nome !== 'string' || nome.trim() === '') {
            throw new Error("O nome do curso é obrigatório e deve ser uma string não vazia.");
        }
        try {
            const todosCursos = await this.cursoRepository.listarCursos();
            const cursoExistente = todosCursos.find(cat => cat.nome.toLowerCase() === nome.toLowerCase());
            if (cursoExistente) {
                throw new Error(`O curso já existe.`);
            }
            const novoCurso = await this.cursoRepository.insertCurso(nome);
            return novoCurso;
        }
        catch (error) {
            console.error("Erro ao cadastrar curso no serviço: ", error);
            throw error;
        }
    }
    async deletarCurso(id) {
        try {
            const curso = await this.cursoRepository.buscarPorId(id);
            if (!curso) {
                throw new Error("Curso não encontrado para exclusão.");
            }
            const usuariosVinculados = await this.usuarioRepository.listarUsuarios();
            const temUsuariosVinculados = usuariosVinculados.some(user => user.cursoId === id);
            if (temUsuariosVinculados) {
                throw new Error("Não é possível deletar o curso: existem usuários vinculados a ela.");
            }
            const deletado = await this.cursoRepository.deletarCurso(id);
            if (!deletado) {
                throw new Error("Erro inesperado ao deletar curso.");
            }
            return deletado;
        }
        catch (error) {
            console.error("Erro ao deletar curso no serviço: ", error);
            throw error;
        }
    }
}
exports.CursoService = CursoService;
