import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateProducerDto {
  @ApiProperty({
    description: 'Nome completo do produtor rural',
    example: 'João Silva',
    minLength: 3,
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'CPF (11 dígitos) ou CNPJ (14 dígitos) do produtor rural',
    example: '123.456.789-00',
    minLength: 11,
    maxLength: 14
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(11)
  @MaxLength(14)
  @Matches(/^[0-9.-]+$/, {
    message: 'O documento deve conter apenas números, pontos e traços'
  })
  document: string;

  @ApiProperty({
    description: 'Cidade de residência do produtor rural',
    example: 'São Paulo',
    minLength: 2,
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  city: string;

  @ApiProperty({
    description: 'Estado de residência do produtor rural (UF)',
    example: 'SP',
    minLength: 2,
    maxLength: 2
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(2)
  @Matches(/^[A-Z]{2}$/, {
    message: 'O estado deve ser informado com duas letras maiúsculas (UF)'
  })
  state: string;
}
