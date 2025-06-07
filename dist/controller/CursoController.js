"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoController = void 0;
const CursoService_1 = require("../service/CursoService");
class CursoController {
    cursoService = new CursoService_1.CursoService();
    listarCursos(req, res) {
        try {
            const curso = this.cursoService.listarCursos();
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
}
exports.CursoController = CursoController;
