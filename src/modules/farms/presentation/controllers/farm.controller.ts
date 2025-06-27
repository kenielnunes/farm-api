import { Body, Controller, Get, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserRole } from 'src/modules/users/domain/enums/user-role.enum';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { PaginatedResponse } from 'src/shared/interfaces/pagination.interface';
import { CreateFarmUseCase } from '../../application/usecases/create-farm.usecase';
import { FindFarmsUseCase } from '../../application/usecases/find-farms.usecase';
import { FarmEntity } from '../../infra/entities/farm.entity';
import { CreateFarmDto } from '../dto/create-farm.dto';

@ApiTags('Fazendas')
@ApiBearerAuth('JWT-auth')
@Controller('farms')
export class FarmController {
  constructor(
    private readonly createFarmUseCase: CreateFarmUseCase,
    private readonly findFarmsUseCase: FindFarmsUseCase,
  ) { }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.GESTOR)
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
  async create(@Body() dto: CreateFarmDto, @Res() res: Response) {
    try {
      await this.createFarmUseCase.execute(dto);
      return res.status(HttpStatus.CREATED).json({ message: 'Fazenda criada com sucesso' });
    } catch (err) {
      console.error('ERRO NA CRIAÇÃO DE FAZENDA:', err);
      return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message || 'Erro ao criar fazenda' });
    }
  }

  @Get()
  @ApiOperation({ summary: 'Listar fazendas com paginação' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Res() res: Response,
  ) {
    try {
      const result: PaginatedResponse<FarmEntity> = await this.findFarmsUseCase.execute({ page: Number(page), limit: Number(limit) });
      return res.status(HttpStatus.OK).json(result);
    } catch (err) {
      console.error('ERRO AO BUSCAR FAZENDAS:', err);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message || 'Erro ao buscar fazendas' });
    }
  }
} 