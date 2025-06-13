import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CultureEntity } from '../../../cultures/infra/entities/culture.entity';
import { FarmEntity } from '../../../farms/infra/entities/farm.entity';
import { CultureDistribution, Dashboard, LandUseDistribution, StateDistribution } from '../../domain/entities/dashboard';
import { IDashboardRepository } from './dashboard.repository.interface';

@Injectable()
export class DashboardRepository implements IDashboardRepository {
  constructor(
    @InjectRepository(FarmEntity)
    private readonly farmRepo: Repository<FarmEntity>,
    @InjectRepository(CultureEntity)
    private readonly cultureRepo: Repository<CultureEntity>,
  ) { }

  async getDashboard(): Promise<Dashboard> {
    const [farms, cultures] = await Promise.all([
      this.farmRepo.find(),
      this.cultureRepo.find(),
    ]);

    const totalFarms = farms.length;
    const totalHectares = farms.reduce((sum, farm) => sum + farm.totalArea, 0);

    const byState = this.calculateStateDistribution(farms);
    const byCulture = this.calculateCultureDistribution(cultures);
    const byLandUse = this.calculateLandUseDistribution(farms);

    return new Dashboard(
      totalFarms,
      totalHectares,
      byState,
      byCulture,
      byLandUse,
    );
  }

  private calculateStateDistribution(farms: FarmEntity[]): StateDistribution[] {
    const stateMap = new Map<string, number>();

    farms.forEach(farm => {
      const count = stateMap.get(farm.state) || 0;
      stateMap.set(farm.state, count + 1);
    });

    return Array.from(stateMap.entries()).map(
      ([state, count]) => new StateDistribution(state, count)
    );
  }

  private calculateCultureDistribution(cultures: CultureEntity[]): CultureDistribution[] {
    const cultureMap = new Map<string, number>();

    cultures.forEach(culture => {
      const area = cultureMap.get(culture.name) || 0;
      cultureMap.set(culture.name, area + culture.plantedArea);
    });

    return Array.from(cultureMap.entries()).map(
      ([culture, area]) => new CultureDistribution(culture, area)
    );
  }

  private calculateLandUseDistribution(farms: FarmEntity[]): LandUseDistribution[] {
    const arableArea = farms.reduce((sum, farm) => sum + farm.arableArea, 0);
    const vegetationArea = farms.reduce((sum, farm) => sum + farm.vegetationArea, 0);

    return [
      new LandUseDistribution('Arable', arableArea),
      new LandUseDistribution('Vegetation', vegetationArea),
    ];
  }
} 