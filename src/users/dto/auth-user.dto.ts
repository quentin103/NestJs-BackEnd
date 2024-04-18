import { IsNotEmpty } from "class-validator";

class AuthUserDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}

class DetailUserDto {
  @IsNotEmpty()
  id: number;
}

export { DetailUserDto, AuthUserDto }