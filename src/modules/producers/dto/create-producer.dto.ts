import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateProducerDto {
  @ApiProperty({
    description: 'Nome completo do produtor rural',
    example: 'João Silva',
    minLength: 3,
    maxLength: 100
  })
  @IsString({ message: 'O nome deve ser uma cadeia de caracteres.' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres.' })
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres.' })
  name: string;

  @ApiProperty({
    description: 'CPF (11 dígitos) ou CNPJ (14 dígitos) do produtor rural',
    example: '123.456.789-00',
    minLength: 11,
    maxLength: 14
  })
  @IsString({ message: 'O documento deve ser uma cadeia de caracteres.' })
  @IsNotEmpty({ message: 'O documento não pode ser vazio.' })
  @MinLength(11, { message: 'O documento deve ter no mínimo 11 caracteres (CPF) ou 14 caracteres (CNPJ).' })
  @MaxLength(14, { message: 'O documento deve ter no máximo 14 caracteres (CNPJ).' })
  @Matches(/^[0-9.-]+$/, {
    message: 'O documento deve conter apenas números, pontos e traços.'
  })
  document: string;

  @ApiProperty({
    description: 'Cidade de residência do produtor rural',
    example: 'São Paulo',
    minLength: 2,
    maxLength: 100
  })
  @IsString({ message: 'A cidade deve ser uma cadeia de caracteres.' })
  @IsNotEmpty({ message: 'A cidade não pode ser vazia.' })
  @MinLength(2, { message: 'A cidade deve ter no mínimo 2 caracteres.' })
  @MaxLength(100, { message: 'A cidade deve ter no máximo 100 caracteres.' })
  city: string;

  @ApiProperty({
    description: 'Estado de residência do produtor rural (UF)',
    example: 'SP',
    minLength: 2,
    maxLength: 2
  })
  @IsString({ message: 'O estado deve ser uma cadeia de caracteres.' })
  @IsNotEmpty({ message: 'O estado não pode ser vazio.' })
  @MinLength(2, { message: 'O estado deve ter 2 caracteres (UF).' })
  @MaxLength(2, { message: 'O estado deve ter 2 caracteres (UF).' })
  @Matches(/^[A-Z]{2}$/, {
    message: 'O estado deve ser informado com duas letras maiúsculas (UF), por exemplo: SP.'
  })
  state: string;
}