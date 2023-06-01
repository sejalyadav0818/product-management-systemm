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
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const categories_service_1 = require("./categories.service");
const create_category_dto_1 = require("./dto/create-category.dto");
const decorators_1 = require("../common/decorators");
let CategoriesController = class CategoriesController {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    async getAllCategories() {
        const categories = await this.categoriesService.getAllCategories();
        return { categories };
    }
    createnewcategory(dto) {
        try {
            return this.categoriesService.createcategory(dto);
        }
        catch (error) {
            throw error;
        }
    }
    async editUser(id, dto, req, res) {
        return this.categoriesService.editcategoryById(Number(id), dto, res, req);
    }
    async deleteUserById(id, req, res) {
        return this.categoriesService.deletecategoryById(Number(id), res, req);
    }
};
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)("/Categories"),
    (0, common_1.Render)("Category_add"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getAllCategories", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)("/craeate-categories"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "createnewcategory", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)("/edit/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __param(3, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_category_dto_1.CreateCategoryDto, Object, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "editUser", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Post)("/delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Request)()),
    __param(2, (0, common_1.Response)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "deleteUserById", null);
CategoriesController = __decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Controller)("/Category"),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
exports.CategoriesController = CategoriesController;
//# sourceMappingURL=categories.controller.js.map