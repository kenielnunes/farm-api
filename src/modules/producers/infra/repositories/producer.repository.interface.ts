import { PaginatedResponse, PaginationParams } from 'src/shared/interfaces/pagination.interface';
import { Producer } from '../../domain/entities/producer';
import { ProducerEntity } from '../entities/producer.entity';

export interface IProducerRepository {
  save(producer: Producer): Promise<ProducerEntity>;
  findById(id: string): Promise<ProducerEntity | null>;
  findByDocument(document: string): Promise<ProducerEntity | null>;
  update(id: string, producer: Partial<Producer>): Promise<ProducerEntity | null>;
  delete(id: string): Promise<void>;
  findAll(pagination: PaginationParams): Promise<PaginatedResponse<ProducerEntity>>;
} 