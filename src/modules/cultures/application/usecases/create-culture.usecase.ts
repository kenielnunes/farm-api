import { Inject } from '@nestjs/common';
import { AppException } from 'src/shared/exceptions/app.exception';
import { Culture } from '../../domain/entities/culture';
import { CultureValidatorService } from '../../domain/services/culture-validator.service';
import { ICultureRepository } from '../../infra/repositories/culture.repository.interface';
import { CreateCultureDto } from '../../presentation/dto/create-culture.dto';

export class CreateCultureUseCase {
  constructor(
    @Inject('ICultureRepository')
    private readonly cultureRepository: ICultureRepository,
    private readonly cultureValidatorService: CultureValidatorService,
  ) { }

  async execute(dto: CreateCultureDto): Promise<void> {
    const cultureName = dto.name.toLowerCase();

    const existingCulture = await this.cultureRepository.findByFarmAndYearAndName(
      dto.farmId,
      dto.harvestYear,
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
      dto.farmId,
      dto.plantedArea,
    );

    const culture = new Culture(
      crypto.randomUUID(),
      cultureName,
      dto.plantedArea,
      dto.harvestYear,
      dto.farmId,
    );

    await this.cultureRepository.save(culture);
  }
} 