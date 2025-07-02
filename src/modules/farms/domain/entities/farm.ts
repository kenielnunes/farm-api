import { AppException } from "src/shared/exceptions/app.exception";

export class Farm {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly city: string,
    public readonly state: string,
    public readonly totalArea: number,
    public readonly arableArea: number,
    public readonly vegetationArea: number,
    public readonly producerId: string,
  ) {
    if (!name || name.trim().length === 0) {
      throw new AppException('INVALID_NAME', 'O nome da fazenda não pode ser vazio');
    }
    if (!city || city.trim().length === 0) {
      throw new AppException('INVALID_CITY', 'A cidade da fazenda não pode ser vazia');
    }
    if (!state || state.trim().length === 0) {
      throw new AppException('INVALID_STATE', 'O estado da fazenda não pode ser vazio');
    }
    if (arableArea + vegetationArea > totalArea) {
      throw new AppException(
        "FARM_TOTAL_AREA_EXCEEDED",
        'A soma das áreas agricultável e de vegetação não pode ultrapassar a área total'
      );
    }
  }

  isPlantedAreaValid(plantedArea: number): boolean {
    return plantedArea <= this.arableArea;
  }
} 