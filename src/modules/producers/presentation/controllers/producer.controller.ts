import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
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
  async create(@Body() dto: CreateProducerDto, @Res() res: Response) {
    try {
      await this.createProducerUseCase.execute(dto);
      return res.status(HttpStatus.CREATED).json({ message: 'Produtor rural criado com sucesso' });
    } catch (err) {
      console.error('ERRO NA CRIAÇÃO DE PRODUTOR:', err);
      return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message || 'Erro ao criar produtor' });
    }
  }
}
