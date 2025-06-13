import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID, Min } from 'class-validator';

export class CreateFarmDto {
  @ApiProperty({
    description: 'Nome da fazenda',
    example: 'Fazenda Boa Vista',
    minLength: 3,
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'ID do produtor rural proprietário da fazenda',
    example: '123e4567-e89b-12d3-a456-426614174000',
    format: 'uuid'
  })
  @IsUUID()
  @IsNotEmpty()
  producerId: string;

  @ApiProperty({
    description: 'Cidade onde está localizada a fazenda',
    example: 'São Paulo',
    minLength: 2,
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: 'Estado onde está localizada a fazenda (UF)',
    example: 'SP',
    minLength: 2,
    maxLength: 2
  })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({
    description: 'Área total da fazenda em hectares',
    example: 1000,
    minimum: 0
  })
  @IsNumber()
  @Min(0)
  totalArea: number;

  @ApiProperty({
    description: 'Área agricultável da fazenda em hectares',
    example: 600,
    minimum: 0
  })
  @IsNumber()
  @Min(0)
  arableArea: number;

  @ApiProperty({
    description: 'Área de vegetação da fazenda em hectares',
    example: 400,
    minimum: 0
  })
  @IsNumber()
  @Min(0)
  vegetationArea: number;
} 