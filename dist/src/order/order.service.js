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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const runtime_1 = require("@prisma/client/runtime");
const prisma_service_1 = require("../prisma/prisma.service");
let OrderService = class OrderService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create() {
        const user = await this.prisma.order
            .create({
            data: {
                price: "10",
                quantity: "1",
                product_id: 1,
                user_id: 1,
            },
        })
            .catch((error) => {
            if (error instanceof runtime_1.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new common_1.ForbiddenException("Credentials incorrect");
                }
            }
            throw error;
        });
        return user;
    }
    async getAllUser() {
        try {
            const users = await this.prisma.user.findMany({
                select: { id: true, email: true, name: true },
                where: { isadmin: false },
            });
            return users;
        }
        catch (err) {
            throw err;
        }
    }
    async findAll() {
        return await this.prisma.product.findMany({
            include: { catrgory: true },
        });
    }
};
OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map