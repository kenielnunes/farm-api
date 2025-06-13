import { Inject, Injectable } from '@nestjs/common';
import { Producer } from '../domain/entities/producer';
import { DocumentValidatorService } from '../domain/services/document-validator.service';
import { CreateProducerDto } from '../dto/create-producer.dto';
import { IProducerRepository } from '../infra/repositories/producer.repository.interface';

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
