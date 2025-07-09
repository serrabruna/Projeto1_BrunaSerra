import { CursoRepository } from "../repository/CursoRepository";
import { Curso } from "../model/entity/Curso";

export class CursoService{
    cursoRepository = CursoRepository.getInstance();

    async listarCursos(): Promise<Curso[]>{
        return await this.cursoRepository.listarCursos();
    }

    async buscarPorId(id: number): Promise<Curso | undefined>{
        return await this.cursoRepository.buscarPorId(id);
    }
}