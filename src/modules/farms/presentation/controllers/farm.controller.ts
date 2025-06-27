import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserRole } from 'src/modules/users/domain/enums/user-role.enum';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { CreateFarmUseCase } from '../../application/usecases/create-farm.usecase';
import { CreateFarmDto } from '../dto/create-farm.dto';

@ApiTags('Fazendas')
@ApiBearerAuth('JWT-auth')
@Controller('farms')
export class FarmController {
  constructor(private readonly createFarmUseCase: CreateFarmUseCase) { }

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
} 