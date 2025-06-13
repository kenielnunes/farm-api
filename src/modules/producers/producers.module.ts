import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentValidatorService } from './domain/services/document-validator.service';
import { ProducerEntity } from './infra/entities/producer.entity';
import { ProducerRepository } from './infra/repositories/producer.repository';
import { ProducersController } from './presentation/controllers/producer.controller';
import { CreateProducerUseCase } from './usecases/create-producer.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([ProducerEntity])],
  controllers: [ProducersController],
  providers: [
    CreateProducerUseCase,
    DocumentValidatorService,
    {
      provide: 'IProducerRepository',
      useClass: ProducerRepository,
    },
  ],
  exports: ['IProducerRepository'],
})
export class ProducersModule { } 