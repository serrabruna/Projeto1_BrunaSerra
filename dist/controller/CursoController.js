"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoController = void 0;
const CursoService_1 = require("../service/CursoService");
class CursoController {
    cursoService = new CursoService_1.CursoService();
    async criarCurso(req, res) {
        try {
            const { nome } = req.body;
            const curso = await this.cursoService.cadastrarCurso(nome);
            res.status(201).json(curso);
        }
        catch (error) {
            let message = "Não foi possível criar o registro";
            if (error instanceof Error) {
                message = error.message;
                4;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    async listarCursos(req, res) {
        try {
            const curso = await this.cursoService.listarCursos();
            res.status(201).json(curso);
        }
        catch (error) {
            let message = "Não foi possível listar os cursos";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
    async deletarCategoria(req, res) {
        const id = parseInt(req.params.id);
        try {
            const curso = await this.cursoService.deletarCurso(id);
            res.status(204).send();
        }
        catch (error) {
            let message = "Não foi possível remover curso";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({
                message: message
            });
        }
    }
}
exports.CursoController = CursoController;
