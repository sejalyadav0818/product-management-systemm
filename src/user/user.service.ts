import { Injectable ,BadRequestException} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaService } from "../prisma/prisma.service";
import { Request } from "express";
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}


  // const users = await this.prisma.user.findMany({
  //   select: { id: true, email: true, name: true, isadmin: true },
  //   where: { isadmin: false },
  // });


  // async getAllUser() {
  //   return await this.prisma.user.findMany({
  //     select: { id: true, email: true, name: true },
  //     where: { isadmin: false },
  //   });
  // }

    async getAllUser() {
    return await this.prisma.user.findMany({
      
      include: { role: true },
     
    });
  }
  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
  async createUser(dto: CreateUserDto) {

    const { name, email, password, roleId } = dto;
    const findUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (findUser) {
      throw new BadRequestException('Email already exists');
    }
    const hashedPassword = await this.hashPassword(dto.password);
    await this.prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        roleId : roleId

      },
    });
  }

  async deleteUserById(id: number) {
    await this.prisma.user.delete({
      where: {
        id: +id,
      },
    });
  }

  async editUserById(id: number, dto: CreateUserDto, req: Request) {
    await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: dto.name,
        email: dto.email
      },
    });

    const updatedUser = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    return updatedUser;
  }

  private convertToBoolean(value: string | boolean): boolean {
    if (typeof value === "string") {
      return value.toLowerCase() === "admin";
    }
    return Boolean(value);
  }
}
