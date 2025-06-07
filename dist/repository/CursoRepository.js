"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoRepository = void 0;
const Curso_1 = require("../model/Curso");
class CursoRepository {
    static instance;
    cursos = [
        new Curso_1.Curso(0, "Não se Aplica"),
        new Curso_1.Curso(1, "ADS"),
        new Curso_1.Curso(2, "Pedagogia"),
        new Curso_1.Curso(3, "Administração")
    ];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CursoRepository;
        }
        return this.instance;
    }
    listarCursos() {
        return this.cursos;
    }
    buscarPorId(id) {
        return this.cursos.find(curso => curso.id === id);
    }
}
exports.CursoRepository = CursoRepository;
