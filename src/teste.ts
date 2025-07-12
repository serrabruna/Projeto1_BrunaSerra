import { EmprestimoRepository } from "./repository/EmprestimoRepository";
import { LivroRepository } from "./repository/LivroRepository";
import { EstoqueRepository } from "./repository/EstoqueRepository";
import { CategoriaLivroRepository } from "./repository/CategoriaLivroRepository";
import { CategoriaUsuarioRepository } from "./repository/CategoriaUsuarioRepository";
import { UsuarioRepository } from "./repository/UsuarioRepository";
import { CursoRepository } from "./repository/CursoRepository";

async function main() {
    const emprestimo = new EmprestimoRepository();
    const livro = new LivroRepository();
    const estoque = new EstoqueRepository();
    const categoriaL = new CategoriaLivroRepository();
    const categoriaU = new CategoriaUsuarioRepository();
    const curso = new CursoRepository();
    const usuario = new UsuarioRepository();

    await categoriaU.createTable();
    await curso.createTable();
    await usuario.createTable();
    await estoque.createTable();
    await emprestimo.createTable();         

}

main();