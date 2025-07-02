import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateProducerUseCase } from './application/usecases/create-producer.usecase';
import { FindProducersUseCase } from './application/usecases/find-producers.usecase';
import { ProducerEntity } from './infra/entities/producer.entity';
import { ProducerRepository } from './infra/repositories/producer.repository';
import { ProducersController } from './presentation/controllers/producer.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProducerEntity])],
  controllers: [ProducersController],
  providers: [
    CreateProducerUseCase,
    FindProducersUseCase,
    ProducerRepository,
    {
      provide: 'IProducerRepository',
      useClass: ProducerRepository,
    },
  ],
  exports: [ProducerRepository, 'IProducerRepository'],
})
export class ProducersModule { } 