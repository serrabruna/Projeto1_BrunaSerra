"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioController = void 0;
const CategoriaUsuarioService_1 = require("../service/CategoriaUsuarioService");
const tsoa_1 = require("tsoa");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const CategoriaUsuarioResquestDto_1 = require("../model/dto/CategoriaUsuarioResquestDto");
let CategoriaUsuarioController = class CategoriaUsuarioController {
    catUsuService = new CategoriaUsuarioService_1.CategoriaUsuarioService();
    async criarCategoriaUsuario(dto, fail, success) {
        try {
            const catUsuario = await this.catUsuService.cadastrarCategoria(dto.nome);
            return success(201, new BasicResponseDto_1.BasicResponseDto("Categoria de usuário cadastrada com sucesso!", catUsuario));
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async listarCategorias(notFound, success) {
        try {
            const categoria = await this.catUsuService.listarCategorias();
            return success(200, new BasicResponseDto_1.BasicResponseDto("Categorias de usuário listados com sucesso!", categoria));
        }
        catch (error) {
            return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async deletarCategoria(id, notFound, success) {
        try {
            const categoria = await this.catUsuService.deletarCategoria(id);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Categoria de usuário deletada com sucesso!", categoria));
        }
        catch (error) {
            return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
};
exports.CategoriaUsuarioController = CategoriaUsuarioController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CategoriaUsuarioResquestDto_1.CategoriaUsuarioRequestDto, Function, Function]),
    __metadata("design:returntype", Promise)
], CategoriaUsuarioController.prototype, "criarCategoriaUsuario", null);
__decorate([
    (0, tsoa_1.Get)("all"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], CategoriaUsuarioController.prototype, "listarCategorias", null);
__decorate([
    (0, tsoa_1.Delete)("id/{id}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], CategoriaUsuarioController.prototype, "deletarCategoria", null);
exports.CategoriaUsuarioController = CategoriaUsuarioController = __decorate([
    (0, tsoa_1.Route)("categorias-usuario"),
    (0, tsoa_1.Tags)("categoria-usuario")
], CategoriaUsuarioController);
