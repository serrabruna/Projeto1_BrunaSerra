import { Usuario } from "./Usuario";

const cpfsValidos = ["50245404848", "11144477735", "93541134780"];
const cpfsInvalidos = ["00000000000", "12345678900", "99999999999", "abc123"];

function testarCpf(cpf: string) {
    const resultado = Usuario.validarCPF(cpf);
    console.log(`CPF ${cpf} => ${resultado ? "VÁLIDO" : "INVÁLIDO"}`);
}

console.log("=== Testando CPFs válidos ===");
cpfsValidos.forEach(testarCpf);

console.log("\n=== Testando CPFs inválidos ===");
cpfsInvalidos.forEach(testarCpf);
