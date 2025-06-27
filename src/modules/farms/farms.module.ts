import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateFarmUseCase } from 'src/modules/farms/application/usecases/create-farm.usecase';
import { FarmEntity } from 'src/modules/farms/infra/entities/farm.entity';
import { FarmRepository } from 'src/modules/farms/infra/repositories/farm.repository';
import { FarmController } from 'src/modules/farms/presentation/controllers/farm.controller';
import { ProducersModule } from 'src/modules/producers/producers.module';
import { FindFarmsUseCase } from './application/usecases/find-farms.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([FarmEntity]), ProducersModule],
  controllers: [FarmController],
  providers: [
    CreateFarmUseCase,
    FindFarmsUseCase,
    {
      provide: 'IFarmRepository',
      useClass: FarmRepository,
    },
  ],
  exports: ['IFarmRepository'],
})
export class FarmsModule { } 