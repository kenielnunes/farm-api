import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CultureEntity } from '../cultures/infra/entities/culture.entity';
import { FarmsModule } from '../farms/farms.module';
import { FarmEntity } from '../farms/infra/entities/farm.entity';
import { DashboardRepository } from './infra/repositories/dashboard.repository';
import { DashboardController } from './presentation/controllers/dashboard.controller';
import { GetDashboardUseCase } from './usecases/get-dashboard.usecase';

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