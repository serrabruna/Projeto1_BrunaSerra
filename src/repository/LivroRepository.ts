import { Livro } from "../model/Livro";

export class LivroRepository {
    private static instance: LivroRepository;
    private livros: Livro[] = [];

    private constructor() {}

    public static getInstance(): LivroRepository {
        if (!this.instance) {
            this.instance = new LivroRepository();
        }
        return this.instance;
    }

    inserirLivro(livro: Livro) {
        this.livros.push(livro);
    }

    buscarLivroPorISBN(isbn: string): Livro | undefined {
        return this.livros.find((livro) => livro.isbn === isbn);
    }

    listarLivros(): Livro[] {
        return this.livros;
    }
}
