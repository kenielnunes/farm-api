import { Inject, Injectable } from '@nestjs/common';
import { AppException } from '../../../../shared/exceptions/app.exception';
import { IFarmRepository } from '../../../farms/infra/repositories/farm.repository.interface';

@Injectable()
export class CultureValidatorService {
  constructor(
    @Inject('IFarmRepository')
    private readonly farmRepository: IFarmRepository,
  ) { }

  async validateCultureArea(
    farmId: string,
    plantedArea: number,
  ): Promise<boolean> {
    const farm = await this.farmRepository.findById(farmId);

    if (!farm) {
      throw new AppException('FARM_NOT_FOUND', 'Fazenda não encontrada');
    }

    if (plantedArea > farm.arableArea) {
      throw new AppException(
        'EXCEEDED_ARABLE_AREA',
        'A área plantada excede a área agricultável disponível na fazenda',
      );
    }

    return true;
  }
} 