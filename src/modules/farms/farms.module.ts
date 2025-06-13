import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProducersModule } from '../producers/producers.module';
import { FarmEntity } from './infra/entities/farm.entity';
import { FarmRepository } from './infra/repositories/farm.repository';
import { FarmController } from './presentation/controllers/farm.controller';
import { CreateFarmUseCase } from './usecases/create-farm.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([FarmEntity]),
    ProducersModule,
  ],
  controllers: [FarmController],
  providers: [
    CreateFarmUseCase,
    {
      provide: 'IFarmRepository',
      useClass: FarmRepository,
    },
  ],
  exports: ['IFarmRepository'],
})
export class FarmsModule { } 