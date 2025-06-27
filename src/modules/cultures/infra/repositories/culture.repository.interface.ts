import { PaginatedResponse, PaginationParams } from 'src/shared/interfaces/pagination.interface';
import { Culture } from '../../domain/entities/culture';
import { CultureEntity } from '../entities/culture.entity';

export interface ICultureRepository {
  save(culture: Culture): Promise<CultureEntity>;
  findById(id: string): Promise<CultureEntity | null>;
  findByFarmId(farmId: string, pagination: PaginationParams): Promise<PaginatedResponse<CultureEntity>>;
  findByHarvestYear(harvestYear: number, pagination: PaginationParams): Promise<PaginatedResponse<CultureEntity>>;
  findByFarmIdAndHarvestYear(farmId: string, harvestYear: number, pagination: PaginationParams): Promise<PaginatedResponse<CultureEntity>>;
  findByFarmAndYearAndName(farmId: string, harvestYear: number, name: string): Promise<CultureEntity | null>;
  update(id: string, culture: Partial<Culture>): Promise<CultureEntity | null>;
  delete(id: string): Promise<void>;
} 