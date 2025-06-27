import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class CreateFarmDto {
  @ApiProperty({
    description: 'Nome da fazenda',
    example: 'Fazenda Boa Vista',
    minLength: 3,
    maxLength: 100
  })
  @IsString({ message: 'O nome da fazenda deve ser um texto válido.' })
  @IsNotEmpty({ message: 'O nome da fazenda não pode ser vazio.' })
  name: string;

  @ApiProperty({
    description: 'ID do produtor rural proprietário da fazenda',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid'
  })
  @IsUUID('4', { message: 'O ID do produtor deve ser um UUID válido (versão 4).' })
  @IsNotEmpty({ message: 'O ID do produtor não pode ser vazio.' })
  producerId: string;

  @ApiProperty({
    description: 'Cidade onde está localizada a fazenda',
    example: 'São Paulo',
    minLength: 2,
    maxLength: 100
  })
  @IsString({ message: 'A cidade deve ser um texto válido.' })
  @IsNotEmpty({ message: 'A cidade não pode ser vazia.' })
  city: string;

  @ApiProperty({
    description: 'Estado onde está localizada a fazenda (UF)',
    example: 'SP',
    minLength: 2,
    maxLength: 2
  })
  @IsString({ message: 'O estado deve ser um texto válido.' })
  @IsNotEmpty({ message: 'O estado não pode ser vazio.' })
  state: string;

  @ApiProperty({
    description: 'Área total da fazenda em hectares',
    example: 1000,
    minimum: 0
  })
  @IsNumber({}, { message: 'A área total deve ser um número válido.' })
  @Min(0, { message: 'A área total não pode ser negativa.' })
  totalArea: number;

  @ApiProperty({
    description: 'Área agricultável da fazenda em hectares',
    example: 600,
    minimum: 0
  })
  @IsNumber({}, { message: 'A área agricultável deve ser um número válido.' })
  @Min(0, { message: 'A área agricultável não pode ser negativa.' })
  arableArea: number;

  @ApiProperty({
    description: 'Área de vegetação da fazenda em hectares',
    example: 400,
    minimum: 0
  })
  @IsNumber({}, { message: 'A área de vegetação deve ser um número válido.' })
  @Min(0, { message: 'A área de vegetação não pode ser negativa.' })
  vegetationArea: number;
}