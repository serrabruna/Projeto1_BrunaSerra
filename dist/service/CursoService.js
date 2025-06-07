"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoService = void 0;
const CursoRepository_1 = require("../repository/CursoRepository");
class CursoService {
    cursoRepository = CursoRepository_1.CursoRepository.getInstance();
    listarCursos() {
        return this.cursoRepository.listarCursos();
    }
    buscarPorId(id) {
        return this.cursoRepository.buscarPorId(id);
    }
}
exports.CursoService = CursoService;
