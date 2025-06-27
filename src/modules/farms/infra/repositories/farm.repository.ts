import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedResponse, PaginationParams } from 'src/shared/interfaces/pagination.interface';
import { Repository } from 'typeorm';
import { Farm } from '../../domain/entities/farm';
import { FarmEntity } from '../entities/farm.entity';
import { IFarmRepository } from './farm.repository.interface';

@Injectable()
export class FarmRepository implements IFarmRepository {
  constructor(
    @InjectRepository(FarmEntity)
    private readonly ormRepo: Repository<FarmEntity>,
  ) { }

  async save(farm: Farm): Promise<FarmEntity> {
    const entity = this.ormRepo.create({
      name: farm.name,
      producerId: farm.producerId,
      city: farm.city,
      state: farm.state,
      totalArea: farm.totalArea,
      arableArea: farm.arableArea,
      vegetationArea: farm.vegetationArea,
    });

    return await this.ormRepo.save(entity);
  }

  async findById(id: string): Promise<FarmEntity | null> {
    return await this.ormRepo.findOne({ where: { id } });
  }

  async findByProducerId(producerId: string, pagination: PaginationParams): Promise<PaginatedResponse<FarmEntity>> {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const [data, totalItems] = await this.ormRepo.findAndCount({
      where: { producerId },
      skip,
      take: limit,
    });

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

  async update(id: string, farm: Partial<Farm>): Promise<FarmEntity | null> {
    await this.ormRepo.update(id, farm);
    return await this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
} 