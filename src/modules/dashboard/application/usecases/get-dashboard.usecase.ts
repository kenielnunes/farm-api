import { Inject } from '@nestjs/common';
import { Dashboard } from '../../domain/entities/dashboard';
import { IDashboardRepository } from '../../infra/repositories/dashboard.repository.interface';


export class GetDashboardUseCase {
  constructor(
    @Inject('IDashboardRepository')
    private readonly dashboardRepository: IDashboardRepository
  ) { }

  async execute(): Promise<Dashboard> {
    return await this.dashboardRepository.getDashboard();
  }
} 