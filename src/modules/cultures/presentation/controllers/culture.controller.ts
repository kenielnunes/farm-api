import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCultureUseCase } from '../../application/usecases/create-culture.usecase';
import { CreateCultureDto } from '../dto/create-culture.dto';

@ApiTags('Culturas')
@Controller('cultures')
export class CultureController {
  constructor(private readonly createCultureUseCase: CreateCultureUseCase) { }

  @Post()
  @ApiOperation({
    summary: 'Criar uma nova cultura',
    description: 'Cria uma nova cultura associada a uma fazenda existente. A área plantada não pode exceder a área agricultável disponível na fazenda e não pode haver culturas duplicadas na mesma safra.'
  })
  @ApiResponse({
    status: 201,
    description: 'Cultura criada com sucesso',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Cultura criada com sucesso'
        }
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos, área excede o limite da fazenda ou cultura já existe para esta safra',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'A área plantada excede a área agricultável disponível na fazenda'
        }
      }
    }
  })
  async create(@Body() dto: CreateCultureDto): Promise<{ message: string }> {
    await this.createCultureUseCase.execute(dto);
    return { message: 'Cultura criada com sucesso' };
  }
} 