import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import { Tokens } from './types';
export declare class AuthService {
    private prisma;
    private jwtService;
    private config;
    private transporter;
    constructor(prisma: PrismaService, jwtService: JwtService, config: ConfigService);
    forgotPassword(email: string, req: Request, res: Response): Promise<void>;
    resetPassword(email: string, token: string, newPassword: string, req: Request, res: Response): Promise<void>;
    private generateSecureToken;
    signupLocal(dto: AuthDto, req: Request, res: Response): Promise<Tokens>;
    signinLocal(dto: AuthDto, req: Request, res: Response): Promise<Tokens>;
    getAllprodcut(): Promise<(import(".prisma/client").Product & {
        catrgory: import(".prisma/client").Category[];
    })[]>;
    getAllCategories(): Promise<import(".prisma/client").Category[]>;
    logout(userId: number, req: Request, res: Response): Promise<boolean>;
    refreshTokens(userId: number, rt: string, res: Response): Promise<Tokens>;
    updateRtHash(userId: number, rt: string, res: Response): Promise<void>;
    getTokens(userId: number, email: string): Promise<Tokens>;
    validateUser(jwtPayload: JwtPayload): Promise<any>;
}
