import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({ description: 'Token de atualização JWT', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
  @IsString({ message: 'O token de atualização deve ser uma cadeia de caracteres (texto) válida.' })
  refreshToken: string;
}