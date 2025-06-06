export const cursos = [
    "ADS",
    "Pedagogia",
    "Administração"
] as const;

export type Curso = typeof cursos[number];

export function cursoValido(curso: string): curso is Curso {
    return (cursos as readonly string[]).includes(curso);
}
