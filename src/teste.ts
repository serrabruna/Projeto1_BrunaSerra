import { UsuarioRepository } from "./repository/UsuarioRepository";

async function main() {
    const repo = new UsuarioRepository();

    await repo.createTable();

    await repo.insertUsuario(
        "20799319031",
        "João da Silva",
        "joao@ifsp.edu.br",
        1, 
        2  
    );
}

main();
