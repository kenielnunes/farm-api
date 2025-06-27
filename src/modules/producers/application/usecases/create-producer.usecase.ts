import { Inject, Injectable } from '@nestjs/common';
import { Producer } from '../../domain/entities/producer';
import { DocumentValidatorService } from '../../domain/services/document-validator.service';
import { IProducerRepository } from '../../infra/repositories/producer.repository.interface';
import { CreateProducerDto } from '../../presentation/dto/create-producer.dto';

@Injectable()
export class CreateProducerUseCase {
  constructor(
    @Inject('IProducerRepository')
    private readonly producerRepository: IProducerRepository,
    private readonly documentValidator: DocumentValidatorService,
  ) { }

  async execute(input: CreateProducerDto): Promise<void> {
    this.documentValidator.validate(input.document);

    const producer = new Producer(
      crypto.randomUUID(),
      input.name,
      input.document,
      input.city,
      input.state,
    );

    await this.producerRepository.save(producer);
  }
}
