import { Culture } from '../../domain/entities/culture';
import { CultureEntity } from '../entities/culture.entity';

export interface ICultureRepository {
  save(culture: Culture): Promise<CultureEntity>;
  findById(id: string): Promise<CultureEntity | null>;
  findByFarmId(farmId: string): Promise<CultureEntity[]>;
  findByHarvestYear(harvestYear: number): Promise<CultureEntity[]>;
  findByFarmIdAndHarvestYear(farmId: string, harvestYear: number): Promise<CultureEntity[]>;
  findByFarmAndYearAndName(farmId: string, harvestYear: number, name: string): Promise<CultureEntity | null>;
  update(id: string, culture: Partial<Culture>): Promise<CultureEntity | null>;
  delete(id: string): Promise<void>;
} 