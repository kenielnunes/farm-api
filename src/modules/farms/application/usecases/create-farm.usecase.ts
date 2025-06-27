import { HttpStatus, Inject } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Farm } from 'src/modules/farms/domain/entities/farm';
import { IFarmRepository } from 'src/modules/farms/infra/repositories/farm.repository.interface';
import { CreateFarmDto } from 'src/modules/farms/presentation/dto/create-farm.dto';
import { IProducerRepository } from 'src/modules/producers/infra/repositories/producer.repository.interface';
import { AppException } from 'src/shared/exceptions/app.exception';

export class CreateFarmUseCase {
  constructor(
    @Inject('IFarmRepository')
    private readonly farmRepository: IFarmRepository,
    @Inject('IProducerRepository')
    private readonly producerRepository: IProducerRepository,
    @InjectPinoLogger(CreateFarmUseCase.name)
    private readonly logger: PinoLogger,
  ) { }

  async execute(dto: CreateFarmDto): Promise<void> {
    this.logger.info({ producerId: dto.producerId, farmName: dto.name }, 'Tentativa de criação de fazenda');

    const producerExists = await this.producerRepository.findById(dto.producerId);
    if (!producerExists) {
      this.logger.warn({ producerId: dto.producerId }, 'Produtor não encontrado');
      throw new AppException('PRODUCER_NOT_FOUND', 'Produtor não encontrado', HttpStatus.BAD_REQUEST);
    }

    const farm = new Farm(
      randomUUID(),
      dto.name,
      dto.city,
      dto.state,
      dto.totalArea,
      dto.arableArea,
      dto.vegetationArea,
      dto.producerId,
    );

    await this.farmRepository.save(farm);
    this.logger.info({ farmId: farm.id, farmName: farm.name }, 'Fazenda criada com sucesso');
  }
} 