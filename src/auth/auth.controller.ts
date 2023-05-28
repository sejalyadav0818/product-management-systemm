import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Render,
  Get,
  Req,Res
} from '@nestjs/common';
import { Public, GetCurrentUserId, GetCurrentUser } from '../common/decorators';
import { RtGuard } from '../common/guards';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';
import { Request,
  Response, } from "express";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Get('local/signup')
  @Render('signup')
  signup() {
    return { msg: 'sejal' };
  }
  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  signupLocal(
    @Body() dto: AuthDto,
    @Req() req,
    @Res() res,
  ): Promise<Tokens> {
    return this.authService.signupLocal(dto, req, res);
  }

  @Public()
  @Get('/local/signin')
  @Render('signin')
  getuserLogin() {
    return { msg: 'sejal' };
  }

  // @Public()
  // @Get("/local/signin/admin")
  // @Render("admin_signin")
  // getadminLoginn() {
  //   return { msg: "sejal" };
  // }
  // @Public()
  // @Post("/local/signin/admin")
  // @HttpCode(HttpStatus.OK)
  // getadminLogin(
  //   @Body() dto: AuthDto,
  //   @Request() req,
  //   @Response() res
  // ): Promise<Tokens> {
  //   return this.authService.getadminLogin(dto, req, res);
  // }
  // // @Public()
  // @Get('/local/signin')
  // @Render('signin') // Specify the EJS template file to render
  // async userPanel(@Request() req, @Response() res) {
  //   try {
  //     const users = await this.authService.getAllUser(req, res);
  //     return { users };
  //   } catch (error) {
  //     // Handle the error appropriately
  //     throw error;
  //   }
  // }
  @Public()
  @Post('/local/signin')
  @HttpCode(HttpStatus.OK)
  signinLocal(
    @Body() dto: AuthDto,
    @Req() req,
    @Res() res,
  ): Promise<Tokens> {
    return this.authService.signinLocal(dto, req, res);
  }

  @Public()
  @Get('change-password')
  @Render('change-password')
  password() {
    return { msg: 'sejal' };
  }

  @Public()
  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  resetPassword(
    @Body('email') email: string,
    @Body('token') token: string,
    @Body('newPassword') newPassword: string,
    @Req() req,
    @Res() res,
  ): Promise<void> {
    return this.authService.resetPassword(email, token, newPassword, req, res);
  }

  @Public()
  @Get('forget-password')
  @Render('forget-password') // Specify the EJS template file to render
  forget() {
    // Your logic to retrieve data and pass it to the template
    return { msg: 'sejal' };
  }

  @Public()
  @Post('forgot-password')
  @Render('change-password')
  @HttpCode(HttpStatus.OK)
  forgotPassword(
    @Body('email') email: string,
    @Req() req,
    @Res() res,
  ): Promise<void> {
    return this.authService.forgotPassword(email, res, req);
  }

  @Public()
  @Get('logout')
  @Render('logout') // Specify the EJS template file to render
  logoutt() {
    // Your logic to retrieve data and pass it to the template
    return { msg: 'sejal' };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(
    @GetCurrentUserId() userId: number,
    @Req() req,
    @Res() res,
  ): Promise<boolean> {
    return this.authService.logout(userId, req, res);
  }

  @Public()
  @Get('darshboard')
  @Render('darshboard') // Specify the EJS template file to render
  panell() {
    // Your logic to retrieve data and pass it to the template
    return { msg: 'sejal' };
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @Public()
  @Get('email-verification')
  @Render('email-verification') // Specify the EJS template file to render
  verification() {
    // Your logic to retrieve data and pass it to the template
    return { msg: 'sejal' };
  }
}
