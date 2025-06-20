import { Inject, Injectable } from '@nestjs/common';
import { AppException } from 'src/shared/exceptions/app.exception';
import { Culture } from '../domain/entities/culture';
import { CultureValidatorService } from '../domain/services/culture-validator.service';
import { CreateCultureDto } from '../dto/create-culture.dto';
import { ICultureRepository } from '../infra/repositories/culture.repository.interface';

@Injectable()
export class CreateCultureUseCase {
  constructor(
    @Inject('ICultureRepository')
    private readonly cultureRepository: ICultureRepository,
    private readonly cultureValidatorService: CultureValidatorService,
  ) { }

  async execute(input: CreateCultureDto): Promise<void> {
    const cultureName = input.name.toLowerCase();

    const existingCulture = await this.cultureRepository.findByFarmAndYearAndName(
      input.farmId,
      input.harvestYear,
      cultureName,
    );

    console.log('existingCulture -> ', existingCulture);

    if (existingCulture) {
      throw new AppException(
        'CULTURE_ALREADY_EXISTS',
        'Já existe uma cultura com este nome para esta fazenda e safra',
      );
    }

    await this.cultureValidatorService.validateCultureArea(
      input.farmId,
      input.plantedArea,
    );

    const culture = new Culture(
      crypto.randomUUID(),
      cultureName,
      input.plantedArea,
      input.harvestYear,
      input.farmId,
    );

    await this.cultureRepository.save(culture);
  }
} 