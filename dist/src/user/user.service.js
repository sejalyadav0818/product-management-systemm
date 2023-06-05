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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllUser() {
        return await this.prisma.user.findMany({
            select: { id: true, email: true, name: true, isadmin: true },
            where: { isadmin: false },
        });
    }
    async createUser(dto) {
        await this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
            },
        });
    }
    async deleteUserById(id) {
        await this.prisma.user.delete({
            where: {
                id: +id,
            },
        });
    }
    async editUserById(id, dto, req) {
        await this.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                name: dto.name,
                email: dto.email,
                isadmin: this.convertToBoolean(dto.isadmin),
            },
        });
        const updatedUser = await this.prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        return updatedUser;
    }
    convertToBoolean(value) {
        if (typeof value === "string") {
            return value.toLowerCase() === "admin";
        }
        return Boolean(value);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map