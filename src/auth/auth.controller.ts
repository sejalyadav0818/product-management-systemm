import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Render,
  Get,
  Request,
  Response,
  Req
} from "@nestjs/common";
import { Public, GetCurrentUserId, GetCurrentUser } from "../common/decorators";
import { RtGuard } from "../common/guards";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { Tokens } from "./types";
import { AuthGuard } from "@nestjs/passport";
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Get("local/signup")
  @Render("signup")
  signup() {
    return { msg: "sejal" };
  }
  @Public()
  @Post("local/signup")
  @HttpCode(HttpStatus.CREATED)
  signupLocal(
    @Body() dto: AuthDto,
    @Request() req,
    @Response() res
  ): Promise<Tokens> {
    return this.authService.signupLocal(dto, req, res);
  }

  @Public()
  @Get("/local/signin")
  @Render("signin")
  getuserLogin() {
    return { msg: "sejal" };
  }

  @Public()
  @Post("/local/signin")
  @HttpCode(HttpStatus.OK)
  signinLocal(
    @Body() dto: AuthDto,
    @Request() req,
    @Response() res
  ): Promise<Tokens> {
    return this.authService.signinLocal(dto, req, res);
  }

  @Public()
  @Get("change-password")
  @Render("change-password")
  password() {
    return { msg: "sejal" };
  }

  @Public()
  @Post("change-password")
  @HttpCode(HttpStatus.OK)
  resetPassword(
    @Body("email") email: string,
    @Body("token") token: string,
    @Body("newPassword") newPassword: string,
    @Request() req,
    @Response() res
  ): Promise<void> {
    return this.authService.resetPassword(email, token, newPassword, req, res);
  }

  @Public()
  @Get("forget-password")
  @Render("forget-password") // Specify the EJS template file to render
  forget() {
    // Your logic to retrieve data and pass it to the template
    return { msg: "sejal" };
  }

  @Public()
  @Post("forgot-password")
  @Render("change-password")
  @HttpCode(HttpStatus.OK)
  forgotPassword(
    @Body("email") email: string,
    @Request() req,
    @Response() res
  ): Promise<void> {
    return this.authService.forgotPassword(email, res, req);
  }

  @Public()
  @Get("/logout")
  @HttpCode(HttpStatus.OK)
  logout(
    @GetCurrentUserId() userId: number,
    @Request() req,
    @Response() res
  ): Promise<boolean> {
    return this.authService.logout(userId, req, res);
  }
  @Public()
  @Get("/dashboard")
  @Render("darshboard") // Specify the EJS template file to render
  panell() {
    // Your logic to retrieve data and pass it to the template
    return { msg: "sejal" };
  }

  @Public()
  @UseGuards(RtGuard)
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  refreshTokens(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser("refreshToken") refreshToken: string,
    @Response() res
  ): Promise<Tokens> {
    return this.authService.refreshTokens(userId, refreshToken, res);
  }

  @Public()
  @Get("email-verification")
  @Render("email-verification") // Specify the EJS template file to render
  verification() {
    // Your logic to retrieve data and pass it to the template
    return { msg: "sejal" };
  }
  @Public()
  @Get()
  @UseGuards(AuthGuard("google"))
  async googleAuth(@Req() req) {}
  
  @Public()
  @Get("redirect")
  @UseGuards(AuthGuard("google"))
  googleAuthRedirect(@Req() req) {
    return this.authService.googleLogin(req);
  }
}
