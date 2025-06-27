import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCultureUseCase } from 'src/modules/cultures/application/usecases/create-culture.usecase';
import { CultureValidatorService } from 'src/modules/cultures/domain/services/culture-validator.service';
import { CultureEntity } from 'src/modules/cultures/infra/entities/culture.entity';
import { CultureRepository } from 'src/modules/cultures/infra/repositories/culture.repository';
import { CultureController } from 'src/modules/cultures/presentation/controllers/culture.controller';
import { FarmsModule } from 'src/modules/farms/farms.module';

@Module({
  imports: [TypeOrmModule.forFeature([CultureEntity]), FarmsModule],
  controllers: [CultureController],
  providers: [
    CreateCultureUseCase,
    CultureValidatorService,
    CultureRepository,
    {
      provide: 'ICultureRepository',
      useClass: CultureRepository,
    },
  ],
  exports: [CultureRepository, 'ICultureRepository'],
})
export class CulturesModule { } 