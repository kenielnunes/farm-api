import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmsModule } from '../farms/farms.module';
import { CultureValidatorService } from './domain/services/culture-validator.service';
import { CultureEntity } from './infra/entities/culture.entity';
import { CultureRepository } from './infra/repositories/culture.repository';
import { CultureController } from './presentation/controllers/culture.controller';
import { CreateCultureUseCase } from './usecases/create-culture.usecase';

@Module({
  imports: [
    TypeOrmModule.forFeature([CultureEntity]),
    FarmsModule,
  ],
  controllers: [CultureController],
  providers: [
    CreateCultureUseCase,
    CultureValidatorService,
    {
      provide: 'ICultureRepository',
      useClass: CultureRepository,
    },
  ],
  exports: ['ICultureRepository'],
})
export class CulturesModule { } 