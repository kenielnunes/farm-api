import { Inject } from '@nestjs/common';
import { AppException } from 'src/shared/exceptions/app.exception';
import { Farm } from '../../../farms/domain/entities/farm';
import { IFarmRepository } from '../../../farms/infra/repositories/farm.repository.interface';
import { Culture } from '../../domain/entities/culture';
import { ICultureRepository } from '../../infra/repositories/culture.repository.interface';
import { CreateCultureDto } from '../../presentation/dto/create-culture.dto';

export class CreateCultureUseCase {
  constructor(
    @Inject('ICultureRepository')
    private readonly cultureRepository: ICultureRepository,
    @Inject('IFarmRepository')
    private readonly farmRepository: IFarmRepository,
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

    const farmEntity = await this.farmRepository.findById(dto.farmId);
    if (!farmEntity) {
      throw new AppException('FARM_NOT_FOUND', 'Fazenda não encontrada');
    }

    const farm = new Farm(
      farmEntity.id,
      farmEntity.name,
      farmEntity.city,
      farmEntity.state,
      farmEntity.totalArea,
      farmEntity.arableArea,
      farmEntity.vegetationArea,
      farmEntity.producerId,
    );

    if (!farm.isPlantedAreaValid(dto.plantedArea)) {
      throw new AppException(
        'EXCEEDED_ARABLE_AREA',
        'A área plantada excede a área agricultável disponível na fazenda',
      );
    }

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