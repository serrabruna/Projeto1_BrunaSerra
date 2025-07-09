import { LivroRepository } from "./repository/LivroRepository";

async function main() {
    const livro = new LivroRepository();

    await livro.createTable();
    await livro.insertLivro(
        "123456789023",
        "The Outsider",
        "Stephen King",
        "Darkside",
        "2",
        1
    )
}

main();