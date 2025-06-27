import { Inject } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { removeSpecialCharacters } from 'src/shared/utils/string.utils';
import { Producer } from '../../domain/entities/producer';
import { DocumentValidatorService } from '../../domain/services/document-validator.service';
import { IProducerRepository } from '../../infra/repositories/producer.repository.interface';
import { CreateProducerDto } from '../../presentation/dto/create-producer.dto';

export class CreateProducerUseCase {
  constructor(
    @Inject('IProducerRepository')
    private readonly producerRepository: IProducerRepository,
    private readonly documentValidator: DocumentValidatorService,
  ) { }

  async execute(dto: CreateProducerDto): Promise<void> {
    this.documentValidator.validate(dto.document);

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
