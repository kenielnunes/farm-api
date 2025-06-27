import { Inject, Injectable } from '@nestjs/common';
import { PaginatedResponse, PaginationParams } from 'src/shared/interfaces/pagination.interface';
import { ProducerEntity } from '../../infra/entities/producer.entity';
import { IProducerRepository } from '../../infra/repositories/producer.repository.interface';

@Injectable()
export class FindProducersUseCase {
  constructor(
    @Inject('IProducerRepository') private readonly producerRepository: IProducerRepository,
  ) { }

  async execute(params: PaginationParams): Promise<PaginatedResponse<ProducerEntity>> {
    return this.producerRepository.findAll(params);
  }
} 