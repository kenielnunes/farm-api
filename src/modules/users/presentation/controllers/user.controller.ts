import { Body, Controller, HttpCode, HttpStatus, Post, UseFilters } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppExceptionFilter } from 'src/shared/filters/app-exception.filter';
import { CreateUserUseCase } from '../../application/usecases/create-user.usecase';
import { CreateUserDto } from '../dto/create-user.dto';

@ApiTags('Usuários')
@Controller('users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cadastrar novo usuário' })
  @ApiBody({
    description: 'Dados para cadastro de usuário',
    type: CreateUserDto,
    examples: {
      exemplo: {
        summary: 'Exemplo de request',
        value: {
          email: 'user@email.com',
          password: 'senhaSegura123',
          role: 'Admin',
        },
      },
    },
  })
  @ApiResponse(
    {
      status: 201, description: 'Usuário criado com sucesso',
      schema: { example: { id: 'uuid', email: 'user@email.com', role: 'Admin' } }
    }
  )
  @ApiResponse({ status: 409, description: 'E-mail já cadastrado' })
  @UseFilters(AppExceptionFilter)
  async create(@Body() dto: CreateUserDto) {
    console.log('dto -> ', dto);
    return this.createUserUseCase.execute(dto);
  }
} 