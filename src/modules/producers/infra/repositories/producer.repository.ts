import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedResponse, PaginationParams } from 'src/shared/interfaces/pagination.interface';
import { Repository } from 'typeorm';
import { Producer } from '../../domain/entities/producer';
import { ProducerEntity } from '../entities/producer.entity';
import { IProducerRepository } from './producer.repository.interface';

@Injectable()
export class ProducerRepository implements IProducerRepository {
  constructor(
    @InjectRepository(ProducerEntity)
    private readonly ormRepo: Repository<ProducerEntity>,
  ) { }

  async save(producer: Producer): Promise<ProducerEntity> {
    const entity = this.ormRepo.create({
      name: producer.name,
      document: producer.document,
      city: producer.city,
      state: producer.state,
    });

    return await this.ormRepo.save(entity);
  }

  async findById(id: string): Promise<ProducerEntity | null> {
    return await this.ormRepo.findOne({ where: { id } });
  }

  async findByDocument(document: string): Promise<ProducerEntity | null> {
    return await this.ormRepo.findOne({ where: { document } });
  }

  async update(id: string, producer: Partial<Producer>): Promise<ProducerEntity | null> {
    await this.ormRepo.update(id, producer);
    return await this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }

  async findAll(pagination: PaginationParams): Promise<PaginatedResponse<ProducerEntity>> {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;
    const [data, totalItems] = await this.ormRepo.findAndCount({ skip, take: limit });
    const totalPages = Math.ceil(totalItems / limit);
    return {
      data,
      meta: {
        totalItems,
        itemCount: data.length,
        itemsPerPage: limit,
        totalPages,
        currentPage: page,
      },
    };
  }
}
