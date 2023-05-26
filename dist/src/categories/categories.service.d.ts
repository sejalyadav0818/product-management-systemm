import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from "src/prisma/prisma.service";
export declare class CategoriesService {
    private readonly prismaSerivce;
    constructor(prismaSerivce: PrismaService);
    createUser(dto: CreateCategoryDto): Promise<import(".prisma/client").User>;
    getAllUser(): Promise<(import(".prisma/client").Product & {
        catrgory: import(".prisma/client").Category[];
    })[]>;
    findOne(id: number): string;
    remove(id: number): string;
}
