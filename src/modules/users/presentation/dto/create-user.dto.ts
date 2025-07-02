import { IsEmail, IsIn, IsString, MinLength } from 'class-validator';
import { UserRole } from 'src/shared/enums/user-role.enum';

export class CreateUserDto {
  @IsEmail({}, { message: 'O e-mail informado não é válido.' })
  email: string;

  @IsString({ message: 'A senha deve ser uma cadeia de caracteres (texto).' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  password: string;

  @IsIn(Object.values(UserRole), { message: 'O papel do usuário deve ser "Admin", "Gestor" ou "Usuario".' })
  role: UserRole;
}