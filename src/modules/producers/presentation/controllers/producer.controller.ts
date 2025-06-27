import { Body, Controller, Get, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { PaginatedResponse } from 'src/shared/interfaces/pagination.interface';
import { CreateProducerUseCase } from '../../application/usecases/create-producer.usecase';
import { FindProducersUseCase } from '../../application/usecases/find-producers.usecase';
import { ProducerEntity } from '../../infra/entities/producer.entity';
import { CreateProducerDto } from '../dto/create-producer.dto';

@ApiTags('Produtores Rurais')
@ApiBearerAuth('JWT-auth')
@Controller('producers')
export class ProducersController {
  constructor(
    private readonly createProducerUseCase: CreateProducerUseCase,
    private readonly findProducersUseCase: FindProducersUseCase,
  ) { }

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

  @Get()
  @ApiOperation({ summary: 'Listar produtores com paginação' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Res() res: Response,
  ) {
    try {
      const result: PaginatedResponse<ProducerEntity> = await this.findProducersUseCase.execute({ page: Number(page), limit: Number(limit) });
      return res.status(HttpStatus.OK).json(result);
    } catch (err) {
      console.error('ERRO AO BUSCAR PRODUTORES:', err);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message || 'Erro ao buscar produtores' });
    }
  }
}
