import { IsEmail, IsIn, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail({}, { message: 'O e-mail informado não é válido.' })
  email: string;

  @IsString({ message: 'A senha deve ser uma cadeia de caracteres (texto).' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  password: string;

  @IsIn(['Admin', 'Gestor', 'Usuario'], { message: 'O papel do usuário deve ser "Admin", "Gestor" ou "Usuario".' })
  role: 'Admin' | 'Gestor' | 'Usuario';
}