import { CursoRepository } from "../repository/CursoRepository";
import { Curso } from "../model/entity/Curso";
import { UsuarioRepository } from "../repository/UsuarioRepository";

export class CursoService{
    usuarioRepository = UsuarioRepository.getInstance();
    cursoRepository = CursoRepository.getInstance();

    async listarCursos(): Promise<Curso[]>{
        try{
            return await this.cursoRepository.listarCursos();
        }catch(error){
            console.error("Erro ao listar cursos no serviço: ", error);
            throw error
        }
    }

    async buscarPorId(id: number): Promise<Curso | undefined>{
        try{
            return await this.cursoRepository.buscarPorId(id);
        }catch(error){
            console.error("Erro ao buscar curso por ID no serviço: ", error);
            throw error;
        }
    }

    async cadastrarCurso(nome: string): Promise<Curso> {
        if (typeof nome !== 'string' || nome.trim() === '') {
            throw new Error("O nome do curso é obrigatório e deve ser uma string não vazia.");
        }
            
        try {
            const todosCursos = await this.cursoRepository.listarCursos();
            const cursoExistente = todosCursos.find(cat => cat.nome.toLowerCase() === nome.toLowerCase());
            if (cursoExistente) {
                throw new Error(`O curso já existe.`);
            }
            const novoCurso = await this.cursoRepository.insertCurso(nome);
            return novoCurso;
        } catch (error) {
            console.error("Erro ao cadastrar curso no serviço: ", error);
            throw error;
        }
    }

    async deletarCurso(id: number): Promise<boolean> {
        try {
            const curso = await this.cursoRepository.buscarPorId(id);
            if (!curso) {
                throw new Error("Curso não encontrado para exclusão.");
            }

            const usuariosVinculados = await this.usuarioRepository.listarUsuarios(); 
            const temUsuariosVinculados = usuariosVinculados.some(user => user.categoriaId === id);

            if (temUsuariosVinculados) {
                throw new Error("Não é possível deletar o curso: existem usuários vinculados a ela.");
            }

            const deletado = await this.cursoRepository.deletarCurso(id);
            
            if (!deletado) { 
                throw new Error("Erro inesperado ao deletar curso.");
            }
            return deletado;

        } catch (error) {
            console.error("Erro ao deletar curso no serviço: ", error);
            throw error;
        }
    }
}