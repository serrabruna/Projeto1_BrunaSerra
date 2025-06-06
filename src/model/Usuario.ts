export class Usuario{
    cpf: string;
    nome: string;
    email: string;
    categoria: string;
    curso: string;
    status: 'ativo' | 'inativo' | 'suspenso';
    diaSuspensao: number;
    
    constructor(cpf: string, nome: string, email: string, categoria: string, curso: string){
        if(!Usuario.validarCPF(cpf)){
            throw new Error("CPF inválido!");
        }
        
        this.cpf = cpf;
        this.nome = nome;
        this.email = nome;
        this.categoria = categoria;
        this.curso = curso;
        this.status = 'ativo';
        this.diaSuspensao = 0;
    };

    static verificarSequenciaRepetida(cpf:string): boolean {
        const primeiroDigito = cpf[0];
        for(let i = 0; i < cpf.length; i++){
            if(cpf[i] == primeiroDigito) return false;
        }
        return true;
        
    }

    static validarCPF(cpf: string): boolean{
        if(!cpf || cpf.length !== 11 || Usuario.verificarSequenciaRepetida(cpf)) return false;

        const calcularDigito = (cpf: string, fator: number) => {
            let total = 0;
            for(let i = 0; i < fator - 1; i++){
                total += parseInt(cpf[i]) * (fator - i);
            }
            const resto = total % 11;
            if(resto < 2){
                return 0; 
            }
            else{
                return 11 - resto;
            }
        }

            const digito1: number = calcularDigito(cpf, 10);
            const digito2: number = calcularDigito(cpf, 11);

            return digito1 === parseInt(cpf[9]) && digito2 === parseInt(cpf[10]);
    }
}