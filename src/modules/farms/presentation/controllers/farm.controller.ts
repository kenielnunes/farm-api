import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFarmDto } from '../../dto/create-farm.dto';
import { CreateFarmUseCase } from '../../usecases/create-farm.usecase';

@ApiTags('Fazendas')
@Controller('farms')
export class FarmController {
  constructor(private readonly createFarmUseCase: CreateFarmUseCase) { }

  @Post()
  @ApiOperation({
    summary: 'Criar uma nova fazenda',
    description: 'Cria uma nova fazenda associada a um produtor rural existente. A soma das áreas agricultável e de vegetação não pode ultrapassar a área total.'
  })
  @ApiResponse({
    status: 201,
    description: 'Fazenda criada com sucesso',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Fazenda criada com sucesso'
        }
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou produtor não encontrado',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Produtor não encontrado'
        }
      }
    }
  })
  async create(@Body() dto: CreateFarmDto): Promise<{ message: string }> {
    await this.createFarmUseCase.execute(dto);
    return { message: 'Fazenda criada com sucesso' };
  }
} 