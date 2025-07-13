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
exports.EmprestimoController = void 0;
const EmprestimoService_1 = require("../service/EmprestimoService");
const tsoa_1 = require("tsoa");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const EmprestimoRequestDto_1 = require("../model/dto/EmprestimoRequestDto");
let EmprestimoController = class EmprestimoController {
    emprestimoService = new EmprestimoService_1.EmprestimoService;
    async criarEmprestimo(dto, fail, success) {
        try {
            const emprestimo = await this.emprestimoService.registrarEmprestimo(dto.cpfUsuario, dto.codigoExemplar);
            return success(201, new BasicResponseDto_1.BasicResponseDto("Empréstimo feito com sucesso!", emprestimo));
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async listarEmprestimos(notFound, success) {
        try {
            const emprestimo = await this.emprestimoService.listarEmprestimos();
            return success(200, new BasicResponseDto_1.BasicResponseDto("Empréstimos listados com sucesso!", emprestimo));
        }
        catch (error) {
            return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async registrarDevolucao(id, notFound, success) {
        try {
            const emprestimo = await this.emprestimoService.registrarDevolucao(id);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Devolução registrada!", emprestimo));
        }
        catch (error) {
            return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
};
exports.EmprestimoController = EmprestimoController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EmprestimoRequestDto_1.EmprestimoRequestDto, Function, Function]),
    __metadata("design:returntype", Promise)
], EmprestimoController.prototype, "criarEmprestimo", null);
__decorate([
    (0, tsoa_1.Get)("all"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], EmprestimoController.prototype, "listarEmprestimos", null);
__decorate([
    (0, tsoa_1.Put)("id/{id}/devolucao"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], EmprestimoController.prototype, "registrarDevolucao", null);
exports.EmprestimoController = EmprestimoController = __decorate([
    (0, tsoa_1.Route)("emprestimos"),
    (0, tsoa_1.Tags)("emprestimo")
], EmprestimoController);
