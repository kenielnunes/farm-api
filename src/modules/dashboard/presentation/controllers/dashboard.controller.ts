import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { GetDashboardUseCase } from '../../application/usecases/get-dashboard.usecase';
import { Dashboard } from '../../domain/entities/dashboard';

@ApiTags('Dashboard')
@ApiBearerAuth('JWT-auth')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly getDashboardUseCase: GetDashboardUseCase) { }

  @Get()
  @ApiOperation({ summary: 'Obter dados do dashboard' })
  @ApiResponse({
    status: 200,
    description: 'Dados do dashboard obtidos com sucesso',
    type: Dashboard,
  })
  async getDashboard(@Res() res: Response) {
    try {
      const dashboard = await this.getDashboardUseCase.execute();
      return res.status(HttpStatus.OK).json(dashboard);
    } catch (err) {
      console.error('ERRO AO OBTER DASHBOARD:', err);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message || 'Erro ao obter dashboard' });
    }
  }
} 