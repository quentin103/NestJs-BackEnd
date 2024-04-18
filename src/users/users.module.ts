import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { HttpResponseService } from "src/utils/httpresponse.service";

@Module({
  imports: [PrismaModule],
  controllers: [UsersController, AuthController],
  providers: [HttpResponseService, UsersService, AuthService],
})
export class UsersModule {}
