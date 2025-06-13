import { BadRequestException, Inject } from '@nestjs/common';
import { IProducerRepository } from '../../producers/infra/repositories/producer.repository.interface';
import { Farm } from '../domain/entities/farm';
import { CreateFarmDto } from '../dto/create-farm.dto';
import { IFarmRepository } from '../infra/repositories/farm.repository.interface';

export class CreateFarmUseCase {
  constructor(
    @Inject('IFarmRepository')
    private readonly farmRepository: IFarmRepository,
    @Inject('IProducerRepository')
    private readonly producerRepository: IProducerRepository,
  ) { }

  async execute(input: CreateFarmDto): Promise<void> {
    const producer = await this.producerRepository.findById(input.producerId);
    if (!producer) {
      throw new BadRequestException('Produtor não encontrado');
    }

    const farm = new Farm(
      crypto.randomUUID(),
      input.name,
      input.city,
      input.state,
      input.totalArea,
      input.arableArea,
      input.vegetationArea,
      input.producerId,
    );

    await this.farmRepository.save(farm);
  }
} 