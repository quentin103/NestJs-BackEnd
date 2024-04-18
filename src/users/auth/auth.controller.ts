import { Controller, Post, Body, ParseIntPipe, Param, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthUserDto } from "../dto/auth-user.dto";
import { CreateUserDto } from "../dto/create-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post("/login")
  login(@Body() data: AuthUserDto) {
    return this.authService.authLogin(data);
  }
  @Post("/register")
  register(@Body() data: CreateUserDto) {
    return this.authService.authRegister(data);
  }
  @Get("/detail/:id")
  getDetailUser(@Param("id") id: number) {
    return this.authService.getDetailUser(id);
  }

}
