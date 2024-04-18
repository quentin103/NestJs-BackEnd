import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { HttpResponseService } from "src/utils/httpresponse.service";
// crypte le mot de passe
import * as bcrypt from "bcryptjs";
// token jwt
import * as jwt from "jsonwebtoken";

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpResponseService: HttpResponseService,
  ) { }

  private generateTokenJWT(id: number, email: string) {
    return jwt.sign({ id, email }, process.env.TOKEN_JWT_SECRET, { expiresIn: 60 * 60 * 24 });
  }

  async authLogin({ email, password }) {
    // verifie si l'utilisateur existe
    const user = await this.prismaService.users.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new HttpException("User not found", 404);
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new HttpException("Invalid password", 401);
    }
    const tokenJwt = this.generateTokenJWT(user.id, user.email);

    return this.httpResponseService.responseData({
      message: "Login successful",
      data: {
        name: user.name,
        email: user.email,
        token: tokenJwt,
      },
      status: HttpStatus.OK,
    });
  }

  async authRegister({ name, email, password, UsersTypeId }) {
    const userExite = await this.prismaService.users.findUnique({
      where: {
        email,
      },
    });
    if (userExite) {
      throw new HttpException("User already exists", 401);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prismaService.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
        typeUser_Id: UsersTypeId,
      },
    });
    const tokenJwt = this.generateTokenJWT(user.id, user.email);
    return tokenJwt;
  }

  async getDetailUser(id: number) {
    try {
      const user = await this.prismaService.users.findUnique({
        select: {
          id: true,
          name: true,
          email: true,
          typeUser: true
        },
        where: {
          id: Number(id),
        },
      });
      return this.httpResponseService.responseData({
        message: "Detail compte",
        data: user,
        status: HttpStatus.OK,
      });
    } catch (error) {
      throw new HttpException(error, 404);
    }

  }
}
