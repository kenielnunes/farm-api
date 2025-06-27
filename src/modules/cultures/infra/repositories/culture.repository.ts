import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedResponse, PaginationParams } from 'src/shared/interfaces/pagination.interface';
import { Repository } from 'typeorm';
import { Culture } from '../../domain/entities/culture';
import { CultureEntity } from '../entities/culture.entity';
import { ICultureRepository } from './culture.repository.interface';

@Injectable()
export class CultureRepository implements ICultureRepository {
  constructor(
    @InjectRepository(CultureEntity)
    private readonly ormRepo: Repository<CultureEntity>,
  ) { }

  async save(culture: Culture): Promise<CultureEntity> {
    const entity = this.ormRepo.create({
      name: culture.name.toLowerCase(),
      farmId: culture.farmId,
      harvestYear: culture.harvestYear,
      plantedArea: culture.plantedArea,
    });

    return await this.ormRepo.save(entity);
  }

  async findById(id: string): Promise<CultureEntity | null> {
    return await this.ormRepo.findOne({ where: { id } });
  }

  async findByFarmId(farmId: string, pagination: PaginationParams): Promise<PaginatedResponse<CultureEntity>> {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const [data, totalItems] = await this.ormRepo.findAndCount({
      where: { farmId },
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

  async findByHarvestYear(harvestYear: number, pagination: PaginationParams): Promise<PaginatedResponse<CultureEntity>> {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const [data, totalItems] = await this.ormRepo.findAndCount({
      where: { harvestYear },
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

  async findByFarmIdAndHarvestYear(farmId: string, harvestYear: number, pagination: PaginationParams): Promise<PaginatedResponse<CultureEntity>> {
    const { page, limit } = pagination;
    const skip = (page - 1) * limit;

    const [data, totalItems] = await this.ormRepo.findAndCount({
      where: { farmId, harvestYear },
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

  async findByFarmAndYearAndName(farmId: string, harvestYear: number, name: string): Promise<CultureEntity | null> {
    return await this.ormRepo.findOne({
      where: {
        farmId,
        harvestYear,
        name: name.toLowerCase(),
      },
    });
  }

  async update(id: string, culture: Partial<Culture>): Promise<CultureEntity | null> {
    await this.ormRepo.update(id, culture);
    return await this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
} 