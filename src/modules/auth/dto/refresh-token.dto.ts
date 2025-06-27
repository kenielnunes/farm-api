import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsString({ message: 'O token de atualização deve ser uma cadeia de caracteres (texto) válida.' })
  refreshToken: string;
}