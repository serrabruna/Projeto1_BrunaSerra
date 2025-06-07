"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Usuario_1 = require("./Usuario");
const cpfsValidos = ["50245404848", "11144477735", "93541134780"];
const cpfsInvalidos = ["00000000000", "12345678900", "99999999999", "abc123"];
function testarCpf(cpf) {
    const resultado = Usuario_1.Usuario.validarCPF(cpf);
    console.log(`CPF ${cpf} => ${resultado ? "VÁLIDO" : "INVÁLIDO"}`);
}
console.log("=== Testando CPFs válidos ===");
cpfsValidos.forEach(testarCpf);
console.log("\n=== Testando CPFs inválidos ===");
cpfsInvalidos.forEach(testarCpf);
