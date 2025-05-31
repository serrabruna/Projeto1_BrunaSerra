import { Emprestimo } from "../model/Emprestimo";

export class EmprestimoRepository {
    private static instance: EmprestimoRepository;
    private emprestimos: Emprestimo[] = [];
    private idCounter: number = 1;

    private constructor() {}

    public static getInstance(): EmprestimoRepository {
        if (!this.instance) {
        this.instance = new EmprestimoRepository();
    }
    return this.instance;
    }

    inserirEmprestimo(cpf: string, codigo: string): Emprestimo {
        const novo = new Emprestimo(this.idCounter++, cpf, codigo);
        this.emprestimos.push(novo);
        return novo;
    }

    listarEmprestimos(): Emprestimo[] {
        return this.emprestimos;
    }

    buscarEmprestimoPorId(id: number): Emprestimo | undefined {
        return this.emprestimos.find(e => e.id === id);
    }

    registrarDevolucao(id: number, data: Date): boolean {
        const emprestimo = this.buscarEmprestimoPorId(id);
        if (emprestimo && !emprestimo.dataDevolucao) {
            emprestimo.dataDevolucao = data;
            return true;
    }
        return false;
    }

    listarPorUsuario(cpf: string): Emprestimo[] {
        return this.emprestimos.filter(e => e.cpfUsuario === cpf);
    }

    emprestimosAbertos(cpf: string): Emprestimo[] {
        return this.emprestimos.filter(e => e.cpfUsuario === cpf && !e.dataDevolucao);
    }
}
