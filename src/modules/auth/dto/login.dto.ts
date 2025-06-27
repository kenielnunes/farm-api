import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'Por favor, insira um endereço de e-mail válido.' })
  email: string;

  @IsString({ message: 'A senha deve ser uma cadeia de caracteres (texto).' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  password: string;
}