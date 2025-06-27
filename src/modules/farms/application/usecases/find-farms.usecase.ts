import { Inject, Injectable } from '@nestjs/common';
import { PaginatedResponse, PaginationParams } from 'src/shared/interfaces/pagination.interface';
import { FarmEntity } from '../../infra/entities/farm.entity';
import { IFarmRepository } from '../../infra/repositories/farm.repository.interface';

@Injectable()
export class FindFarmsUseCase {
  constructor(
    @Inject('IFarmRepository') private readonly farmRepository: IFarmRepository,
  ) { }

  async execute(params: PaginationParams): Promise<PaginatedResponse<FarmEntity>> {
    return this.farmRepository.findAll(params);
  }
} 