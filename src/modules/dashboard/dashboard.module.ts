import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CultureEntity } from '../cultures/infra/entities/culture.entity';
import { FarmsModule } from '../farms/farms.module';
import { FarmEntity } from '../farms/infra/entities/farm.entity';
import { GetDashboardUseCase } from './application/usecases/get-dashboard.usecase';
import { DashboardRepository } from './infra/repositories/dashboard.repository';
import { DashboardController } from './presentation/controllers/dashboard.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([FarmEntity, CultureEntity]),
    FarmsModule,
  ],
  controllers: [DashboardController],
  providers: [
    GetDashboardUseCase,
    {
      provide: 'IDashboardRepository',
      useClass: DashboardRepository,
    },
  ],
})
export class DashboardModule { } 