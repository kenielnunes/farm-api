import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'Endereço de e-mail do usuário', example: 'usuario@example.com' })
  @IsEmail({}, { message: 'O e-mail informado não é válido.' })
  email: string;

  @ApiProperty({ description: 'Senha do usuário (mínimo de 6 caracteres)', example: 'senha123' })
  @IsString({ message: 'A senha deve ser uma cadeia de caracteres.' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
  password: string;
}