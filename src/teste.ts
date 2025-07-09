import { UsuarioRepository } from "./repository/UsuarioRepository";
import { CategoriaUsuarioRepository } from "./repository/CategoriaUsuarioRepository";

async function main() {
    const catUsu = new CategoriaUsuarioRepository();

    await catUsu.createTable();
    await catUsu.insertCategoriaUsuario(
        1,
        "Professor"
    )
}

main();