import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from '../../dto/login.dto';
import { RefreshTokenDto } from '../../dto/refresh-token.dto';
import { LoginUseCase } from '../../usecases/login.usecase';
import { RefreshTokenUseCase } from '../../usecases/refresh-token.usecase';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly refreshTokenUseCase: RefreshTokenUseCase,
  ) { }

  @Post('login')
  @ApiOperation({ summary: 'Login do usuário' })
  @ApiResponse({ status: 201, description: 'Login realizado com sucesso' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async login(@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto);
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Renovar access token usando refresh token' })
  @ApiResponse({ status: 201, description: 'Novo access token gerado' })
  @ApiResponse({ status: 401, description: 'Refresh token inválido ou expirado' })
  async refresh(@Body() dto: RefreshTokenDto) {
    return this.refreshTokenUseCase.execute(dto);
  }
} 