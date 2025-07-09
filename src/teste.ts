import { UsuarioRepository } from "./repository/UsuarioRepository";
import { CategoriaUsuarioRepository } from "./repository/CategoriaUsuarioRepository";
import { CursoRepository } from "./repository/CursoRepository";

async function main() {
    const curso = new CursoRepository();

    await curso.createTable();
    await curso.insertCurso(
        "ADS"
    )
}

main();