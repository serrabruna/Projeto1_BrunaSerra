"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoRepository = void 0;
class EmprestimoRepository {
    static instance;
    emprestimos = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EmprestimoRepository();
        }
        return this.instance;
    }
    inserir(emprestimo) {
        this.emprestimos.push(emprestimo);
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
        return this.emprestimos.filter(e => e.cpfUsuario === cpf && !e.dataEntrega);
    }
}
exports.EmprestimoRepository = EmprestimoRepository;
