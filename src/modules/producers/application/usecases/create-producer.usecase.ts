import { Inject } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { removeSpecialCharacters } from 'src/shared/utils/string.utils';
import { Producer } from '../../domain/entities/producer';
import { IProducerRepository } from '../../infra/repositories/producer.repository.interface';
import { CreateProducerDto } from '../../presentation/dto/create-producer.dto';

export class CreateProducerUseCase {
  constructor(
    @Inject('IProducerRepository')
    private readonly producerRepository: IProducerRepository,
  ) { }

  async execute(dto: CreateProducerDto): Promise<void> {
    const producer = new Producer(
      randomUUID(),
      dto.name,
      removeSpecialCharacters(dto.document),
      dto.city,
      dto.state,
    );

    await this.producerRepository.save(producer);
  }
}
