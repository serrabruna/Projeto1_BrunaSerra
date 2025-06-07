"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
class Usuario {
    static proximoId = 0;
    id;
    cpf;
    nome;
    email;
    categoriaId;
    cursoId;
    status;
    diaSuspensao;
    constructor(cpf, nome, email, categoriaId, cursoId) {
        if (!Usuario.validarCPF(cpf)) {
            throw new Error("CPF inválido!");
        }
        this.id = Usuario.proximoId++;
        this.cpf = cpf;
        this.nome = nome;
        this.email = email;
        this.categoriaId = categoriaId;
        this.cursoId = cursoId;
        this.status = 'ativo';
        this.diaSuspensao = 0;
    }
    ;
    static verificarSequenciaRepetida(cpf) {
        const primeiroDigito = cpf[0];
        for (let i = 0; i < cpf.length; i++) {
            if (cpf[i] !== primeiroDigito)
                return false;
        }
        return true;
    }
    static validarCPF(cpf) {
        if (!cpf || cpf.length !== 11 || Usuario.verificarSequenciaRepetida(cpf))
            return false;
        const calcularDigito = (cpf, fator) => {
            let total = 0;
            for (let i = 0; i < fator - 1; i++) {
                total += parseInt(cpf[i]) * (fator - i);
            }
            const resto = total % 11;
            if (resto < 2) {
                return 0;
            }
            else {
                return 11 - resto;
            }
        };
        const digito1 = calcularDigito(cpf, 10);
        const digito2 = calcularDigito(cpf, 11);
        return digito1 === parseInt(cpf[9]) && digito2 === parseInt(cpf[10]);
    }
}
exports.Usuario = Usuario;
