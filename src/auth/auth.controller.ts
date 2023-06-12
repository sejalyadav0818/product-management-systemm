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
  Req,
  Res,
} from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import { Public, GetCurrentUserId, GetCurrentUser } from "../common/decorators";
import { RtGuard } from "../common/guards";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
// import { Tokens } from "./types";
import { AuthGuard } from "@nestjs/passport";
import { request } from "http";
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Get("/signup")
  @Render("signup")
  signup() {
    return { msg: "sejal" };
  }
  @Public()
  @Post("/signup")
  @HttpCode(HttpStatus.CREATED)
  signupLocal(@Body() dto: AuthDto, @Request() req, @Response() res) {
    return this.authService.signupLocal(dto, req, res);
  }

  @Public()
  @Get("/signin")
  @Render("signin")
  getuserLogin() {
    return { msg: "sejal" };
  }

  @Public()
  @Post("/signin")
  @HttpCode(HttpStatus.OK)
  signinLocal(@Body() dto: AuthDto, @Req() req, @Res() res) {
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
  @Render("forget-password")
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
  @Get("/dashboard")
  @Render("darshboard")
  panell() {
    return { msg: "sejal" };
  }

  // @Public()
  // @UseGuards(RtGuard)
  // @Post("refresh")
  // @HttpCode(HttpStatus.OK)
  // refreshTokens(
  //   @GetCurrentUserId() userId: number,
  //   @GetCurrentUser("refreshToken") refreshToken: string,
  //   @Response() res
  // ){
  //   return this.authService.refreshTokens(userId, refreshToken, res);
  // }

  @Public()
  @Get("email-verification")
  @Render("email-verification")
  verification() {
    // Your logic to retrieve data and pass it to the template
    return { msg: "sejal" };
  }

  // @Public()
  // @Get("/logout")
  // @HttpCode(HttpStatus.OK)
  // async logoutt(
  //   @GetCurrentUserId() userId: number,
  //   @Req() req,
  //   @Res() res
  // ): Promise<boolean> {
  //   console.log(req.cookies);
  //   if (res.redirect("/auth/signin")) {
  //     res.clearCookie("jwt_payload");
  //     //console.log(req.cookies);
  //   } else {
  //     res.redirect("/auth/signin");
  //     res.clearCookie("jwt_payload", { path: "/" });
  //   }
  //   return true;
  // }

  @Public()
  @Get("/logout")
  @HttpCode(HttpStatus.OK)
  async logout(
    @GetCurrentUserId() userId: number,
    @Req() req,
    @Res() res
  ): Promise<boolean> {
    //console.log(req.cookies);
    res.clearCookie("token");
    res.clearCookie("jwt_payload");
    res.redirect("/auth/signin");
    console.log(req.cookies);
    return true;
  }
}

// @Public()
// @Get("google-signup")
// @UseGuards(AuthGuard("google"))
// async googleAuth(@Req() req) {}

// @Public()
// @Get("google/redirect")
// @UseGuards(AuthGuard("google"))
// googleAuthRedirect(@Req() req, @Res() res) {
//   return this.authService.googleLogin(req,res);
// }
