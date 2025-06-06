export const CategoriasUsuario = [
    "Professor",
    "Aluno",
    "Bibliotecário"
] as const;

export type CategoriaUsuario = typeof CategoriasUsuario[number];

export function categoriaUsuarioValida(categoria: string): categoria is CategoriaUsuario {
  return (CategoriasUsuario as readonly string[]).includes(categoria);
}