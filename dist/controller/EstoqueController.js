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
exports.EstoqueController = void 0;
const EstoqueService_1 = require("../service/EstoqueService");
const tsoa_1 = require("tsoa");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const EstoqueDto_1 = require("../model/dto/EstoqueDto");
const EstoqueRequestDto_1 = require("../model/dto/EstoqueRequestDto");
let EstoqueController = class EstoqueController {
    estoqueService = new EstoqueService_1.EstoqueService;
    async adicionarAoEstoque(dto, fail, success) {
        try {
            const estoque = await this.estoqueService.adicionarLivroAoEstoque(dto.livro_isbn, dto.quantidade);
            return success(201, new BasicResponseDto_1.BasicResponseDto("Estoque cadastrado com sucesso!", estoque));
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async listarDisponivel(notFound, success) {
        try {
            const estoque = await this.estoqueService.listarDisponiveis();
            return success(200, new BasicResponseDto_1.BasicResponseDto("Estoque listado com sucesso!", estoque));
        }
        catch (error) {
            return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async buscarExemplar(codigo, notFound, success) {
        try {
            const estoque = await this.estoqueService.buscarEstoquePorCodigo(codigo);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Estoque encontrado!", estoque));
        }
        catch (error) {
            return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async atualizarStatus(codigo, dto, notFound, success) {
        try {
            const estoque = await this.estoqueService.atualizarStatusEstoque(codigo, dto.status);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Usuário atualizado com sucesso!", estoque));
        }
        catch (error) {
            return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async resumoPorISBN(livro_isbn, notFound, success) {
        try {
            const resumo = await this.estoqueService.getResumoEstoque(livro_isbn);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Resumo encontrado!", resumo));
        }
        catch (error) {
            return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async RemoverEstoque(codigo, notFound, success) {
        try {
            const estoque = await this.estoqueService.removerRegistroEstoque(codigo);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Estoque deletado com sucesso!", estoque));
        }
        catch (error) {
            return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
};
exports.EstoqueController = EstoqueController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EstoqueRequestDto_1.EstoqueRequestDto, Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "adicionarAoEstoque", null);
__decorate([
    (0, tsoa_1.Get)("disponiveis"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "listarDisponivel", null);
__decorate([
    (0, tsoa_1.Get)("codigo/{codigo}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "buscarExemplar", null);
__decorate([
    (0, tsoa_1.Put)("codigo/{codigo}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, EstoqueDto_1.EstoqueDto, Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "atualizarStatus", null);
__decorate([
    (0, tsoa_1.Get)("livro_isbn/{livro_isbn}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "resumoPorISBN", null);
__decorate([
    (0, tsoa_1.Delete)("codigo/{codigo}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "RemoverEstoque", null);
exports.EstoqueController = EstoqueController = __decorate([
    (0, tsoa_1.Route)("estoque"),
    (0, tsoa_1.Tags)("estoque")
], EstoqueController);
