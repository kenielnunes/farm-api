import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Dashboard } from '../../domain/entities/dashboard';
import { GetDashboardUseCase } from '../../usecases/get-dashboard.usecase';

@ApiTags('Dashboard')
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
  async getDashboard(): Promise<Dashboard> {
    return await this.getDashboardUseCase.execute();
  }
} 