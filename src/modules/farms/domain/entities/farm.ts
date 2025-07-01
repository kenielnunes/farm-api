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
    if (arableArea + vegetationArea > totalArea) {
      throw new AppException(
        "FARM_TOTAL_AREA_EXCEEDED", 
        'A soma das áreas agricultável e de vegetação não pode ultrapassar a área total'
      );
    }
  }
} 