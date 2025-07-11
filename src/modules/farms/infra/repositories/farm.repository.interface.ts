import { PaginatedResponse, PaginationParams } from 'src/shared/interfaces/pagination.interface';
import { Farm } from '../../domain/entities/farm';
import { FarmEntity } from '../entities/farm.entity';

export interface IFarmRepository {
  save(farm: Farm): Promise<FarmEntity>;
  findById(id: string): Promise<FarmEntity | null>;
  findByProducerId(producerId: string, pagination: PaginationParams): Promise<PaginatedResponse<FarmEntity>>;
  update(id: string, farm: Partial<Farm>): Promise<FarmEntity | null>;
  delete(id: string): Promise<void>;
  findAll(pagination: PaginationParams): Promise<PaginatedResponse<FarmEntity>>;
} 