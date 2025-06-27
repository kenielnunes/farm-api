import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProducerUseCase } from '../../application/usecases/create-producer.usecase';
import { CreateProducerDto } from '../dto/create-producer.dto';

@ApiTags('Produtores Rurais')
@Controller('producers')
export class ProducersController {
  constructor(private readonly createProducerUseCase: CreateProducerUseCase) { }

  @Post()
  @ApiOperation({
    summary: 'Criar um novo produtor rural',
    description: 'Cria um novo produtor rural com suas informações pessoais. O documento (CPF/CNPJ) será validado automaticamente.'
  })
  @ApiResponse({
    status: 201,
    description: 'Produtor rural criado com sucesso',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Produtor rural criado com sucesso'
        }
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos ou documento (CPF/CNPJ) inválido',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'CPF ou CNPJ inválido'
        }
      }
    }
  })
  async create(@Body() dto: CreateProducerDto): Promise<{ message: string }> {
    await this.createProducerUseCase.execute(dto);
    return { message: 'Produtor rural criado com sucesso' };
  }
}
