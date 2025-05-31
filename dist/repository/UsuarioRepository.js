"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
class UsuarioRepository {
    static instance;
    usuarios = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new UsuarioRepository();
        }
        return this.instance;
    }
    InserirUsuario(usuario) {
        this.usuarios.push(usuario);
    }
    buscarUsuarioPorCPF(cpf) {
        return this.usuarios.find(usuario => usuario.cpf === cpf);
    }
    listarUsuarios() {
        return this.usuarios;
    }
}
exports.UsuarioRepository = UsuarioRepository;
