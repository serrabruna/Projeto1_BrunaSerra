"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoRepository = void 0;
const Emprestimo_1 = require("../model/Emprestimo");
class EmprestimoRepository {
    static instance;
    emprestimos = [];
    idCounter = 1;
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EmprestimoRepository();
        }
        return this.instance;
    }
    inserirEmprestimo(cpf, codigo) {
        const novo = new Emprestimo_1.Emprestimo(this.idCounter++, cpf, codigo);
        this.emprestimos.push(novo);
        return novo;
    }
    listarEmprestimos() {
        return this.emprestimos;
    }
    buscarEmprestimoPorId(id) {
        return this.emprestimos.find(e => e.id === id);
    }
    registrarDevolucao(id, data) {
        const emprestimo = this.buscarEmprestimoPorId(id);
        if (emprestimo && !emprestimo.dataDevolucao) {
            emprestimo.dataDevolucao = data;
            return true;
        }
        return false;
    }
    listarPorUsuario(cpf) {
        return this.emprestimos.filter(e => e.cpfUsuario === cpf);
    }
    emprestimosAbertos(cpf) {
        return this.emprestimos.filter(e => e.cpfUsuario === cpf && !e.dataDevolucao);
    }
}
exports.EmprestimoRepository = EmprestimoRepository;
