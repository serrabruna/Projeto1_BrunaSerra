import { EstoqueRepository } from "./repository/EstoqueRepository";

async function main() {
    const exemplar = new EstoqueRepository();

    await exemplar.createTable();
    await exemplar.insertExemplar(
        "123456789023",
        1,
        0
    )
}

main();