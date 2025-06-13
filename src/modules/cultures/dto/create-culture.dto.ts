import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateCultureDto {
  @ApiProperty({ description: 'Nome da cultura' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'ID da fazenda' })
  @IsString()
  @IsNotEmpty()
  farmId: string;

  @ApiProperty({ description: 'Ano da safra' })
  @IsNumber()
  @Min(1900)
  harvestYear: number;

  @ApiProperty({ description: 'Área plantada em hectares' })
  @IsNumber()
  @Min(0)
  plantedArea: number;
} 