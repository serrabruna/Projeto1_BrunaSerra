import { EmprestimoRepository } from "./repository/EmprestimoRepository";
import { LivroRepository } from "./repository/LivroRepository";
import { EstoqueRepository } from "./repository/EstoqueRepository";

async function main() {
    const emprestimo = new EmprestimoRepository();
    const livro = new LivroRepository();
    const estoque = new EstoqueRepository();

    await livro.createTable();
    await estoque.createTable();
    await emprestimo.createTable();

}

main();