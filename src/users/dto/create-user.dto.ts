import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty({
    message: "Veuillez saisir votre nom",
  })
  name: string;
  @IsEmail(
    {},
    {
      message: "Veuillez saisir une adresse email valide",
    },
  )
  @IsNotEmpty({
    message: "Veuillez saisir votre Email",
  })
  email: string;
  @IsNotEmpty({
    message: "Veuillez saisir votre mot de passe",
  })
  password: string;
  @IsNotEmpty({
    message: "Veuillez choisir un type d'utilisateur",
  })
  UsersTypeId: number;
}
