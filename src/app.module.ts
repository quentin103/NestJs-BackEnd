
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { UsersService } from "./users/users.service";
import { PrismaModule } from "./prisma/prisma.module";
import { HttpResponseService } from "./utils/httpresponse.service";
@Module({
  imports: [ConfigModule.forRoot(), UsersModule, PrismaModule],
  controllers: [AppController],
  providers: [HttpResponseService, AppService, UsersService],
})
export class AppModule {}
