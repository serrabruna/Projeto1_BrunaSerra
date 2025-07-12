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
exports.LivroController = void 0;
const LivroService_1 = require("../service/LivroService");
const tsoa_1 = require("tsoa");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const LivroDto_1 = require("../model/dto/LivroDto");
const LivroRequestDto_1 = require("../model/dto/LivroRequestDto");
let LivroController = class LivroController {
    livroService = new LivroService_1.LivroService();
    async criarLivro(dto, fail, success) {
        try {
            const livro = await this.livroService.AdicionarLivro(dto);
            return success(201, new BasicResponseDto_1.BasicResponseDto("Livro cadastrado com sucesso!", livro));
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async listarLivroComFiltro(filtros, success, errorResponse) {
        try {
            const livros = await this.livroService.listarLivroComFiltro(filtros);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Livros listados com sucesso!", livros));
        }
        catch (error) {
            return errorResponse(500, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async buscarLivro(isbn, notFound, success) {
        try {
            const livro = await this.livroService.buscarLivroPorISBN(isbn);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Livro encontrado!", livro));
        }
        catch (error) {
            return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async atualizarLivro(isbn, dto, notFound, success) {
        try {
            const livro = await this.livroService.atualizarLivro(isbn, dto);
            const responseDto = new LivroDto_1.LivroDto(livro.id, livro.isbn, livro.titulo, livro.autor, livro.editora, livro.edicao, livro.categoriaId);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Livro atualizado com sucesso!", responseDto));
        }
        catch (error) {
            return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async removerLivro(isbn, notFound, success) {
        try {
            const livro = await this.livroService.removerLivro(isbn);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Livro deletado com sucesso!", livro));
        }
        catch (error) {
            return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
};
exports.LivroController = LivroController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LivroRequestDto_1.LivroRequestDto, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "criarLivro", null);
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "listarLivroComFiltro", null);
__decorate([
    (0, tsoa_1.Get)("isbn/{isbn}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "buscarLivro", null);
__decorate([
    (0, tsoa_1.Put)("isbn/{isbn}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, LivroRequestDto_1.LivroRequestDto, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "atualizarLivro", null);
__decorate([
    (0, tsoa_1.Delete)("isbn/{isbn}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "removerLivro", null);
exports.LivroController = LivroController = __decorate([
    (0, tsoa_1.Route)("livros"),
    (0, tsoa_1.Tags)("livro")
], LivroController);
