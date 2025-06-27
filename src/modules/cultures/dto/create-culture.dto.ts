import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateCultureDto {
  @ApiProperty({ description: 'Nome da cultura' })
  @IsString({ message: 'O nome da cultura deve ser um texto válido.' })
  @IsNotEmpty({ message: 'O nome da cultura não pode ser vazio.' })
  name: string;

  @ApiProperty({ description: 'ID da fazenda' })
  @IsString({ message: 'O ID da fazenda deve ser um texto válido.' })
  @IsNotEmpty({ message: 'O ID da fazenda não pode ser vazio.' })
  farmId: string;

  @ApiProperty({ description: 'Ano da safra' })
  @IsNumber({}, { message: 'O ano da safra deve ser um número válido.' })
  @Min(1900, { message: 'O ano da safra deve ser igual ou posterior a 1900.' })
  harvestYear: number;

  @ApiProperty({ description: 'Área plantada em hectares' })
  @IsNumber({}, { message: 'A área plantada deve ser um número válido.' })
  @Min(0, { message: 'A área plantada não pode ser negativa.' })
  plantedArea: number;
}