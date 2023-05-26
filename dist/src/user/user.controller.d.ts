import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Tokens } from "../auth/types";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    userPanel(req: any, res: any): Promise<{
        users: {
            id: number;
            name: string;
            email: string;
        }[];
    }>;
    adminPanel(): Promise<void>;
    insertuser(dto: CreateUserDto, req: any, res: any): Promise<Tokens>;
    deleteUserById(id: number, req: any, res: any): Promise<void>;
    editUser(id: number, dto: CreateUserDto, req: any, res: any): Promise<void>;
}
