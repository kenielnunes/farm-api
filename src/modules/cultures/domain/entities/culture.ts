import { AppException } from '../../../../shared/exceptions/app.exception';

export class Culture {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly plantedArea: number,
    public readonly harvestYear: number,
    public readonly farmId: string,
  ) {
    this.validateHarvestYear();
    this.validatePlantedArea();
  }

  private validateHarvestYear(): void {
    const currentYear = new Date().getFullYear();
    if (this.harvestYear < currentYear || this.harvestYear > currentYear + 1) {
      throw new AppException(
        'INVALID_HARVEST_YEAR',
        'O ano da safra deve ser o ano atual ou o próximo ano',
      );
    }
  }

  private validatePlantedArea(): void {
    if (this.plantedArea <= 0) {
      throw new AppException(
        'INVALID_PLANTED_AREA',
        'A área plantada deve ser maior que zero',
      );
    }
  }
} 