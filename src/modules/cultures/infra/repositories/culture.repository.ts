import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async findByFarmId(farmId: string): Promise<CultureEntity[]> {
    return await this.ormRepo.find({ where: { farmId } });
  }

  async findByHarvestYear(harvestYear: number): Promise<CultureEntity[]> {
    return await this.ormRepo.find({ where: { harvestYear } });
  }

  async findByFarmIdAndHarvestYear(farmId: string, harvestYear: number): Promise<CultureEntity[]> {
    return await this.ormRepo.find({ where: { farmId, harvestYear } });
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