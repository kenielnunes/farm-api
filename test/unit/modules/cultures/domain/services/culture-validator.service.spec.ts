import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { CultureValidatorService } from 'src/modules/cultures/domain/services/culture-validator.service';
import { Farm } from 'src/modules/farms/domain/entities/farm';
import { FarmEntity } from 'src/modules/farms/infra/entities/farm.entity';
import { IFarmRepository } from 'src/modules/farms/infra/repositories/farm.repository.interface';
import { Producer } from 'src/modules/producers/domain/entities/producer';
import { AppException } from 'src/shared/exceptions/app.exception';

describe('CultureValidatorService', () => {
  let service: CultureValidatorService;
  let mockFarmRepository: IFarmRepository;

  beforeEach(async () => {
    mockFarmRepository = {
      findById: jest.fn(),
      save: jest.fn(),
      findByProducerId: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CultureValidatorService,
        {
          provide: 'IFarmRepository',
          useValue: mockFarmRepository,
        },
      ],
    }).compile();

    service = module.get<CultureValidatorService>(CultureValidatorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateCultureArea', () => {
    it('should return true if planted area is within arable area', async () => {
      const farmId = faker.string.uuid();
      const plantedArea = 100;
      const farmArableArea = 200;

      const mockProducer: Producer = {
        id: faker.string.uuid(),
        document: faker.string.numeric(14),
        name: faker.person.fullName(),
        city: faker.location.city(),
        state: faker.location.state({
          abbreviated: true,
        }),
      };

      const mockFarm: FarmEntity = {
        id: farmId,
        name: faker.company.name(),
        city: faker.location.city(),
        state: faker.location.state({
          abbreviated: true,
        }),
        totalArea: 500,
        arableArea: farmArableArea,
        vegetationArea: 300,
        producerId: faker.string.uuid(),
        producer: mockProducer as any,
        cultures: [],
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      };

      (mockFarmRepository.findById as jest.Mock).mockResolvedValue(mockFarm);

      await expect(service.validateCultureArea(farmId, plantedArea)).resolves.toBe(true);
      expect(mockFarmRepository.findById).toHaveBeenCalledWith(farmId);
    });

    it('should throw AppException if farm is not found', async () => {
      const farmId = faker.string.uuid();
      const plantedArea = 100;

      (mockFarmRepository.findById as jest.Mock).mockResolvedValue(null);

      await expect(service.validateCultureArea(farmId, plantedArea)).rejects.toThrow(new AppException('FARM_NOT_FOUND', 'Fazenda não encontrada'));
      expect(mockFarmRepository.findById).toHaveBeenCalledWith(farmId);
    });

    it('should throw AppException if planted area exceeds arable area', async () => {
      const farmId = faker.string.uuid();
      const plantedArea = 300;
      const farmArableArea = 200;

      const mockProducer: Producer = {
        id: faker.string.uuid(),
        document: faker.string.numeric(14),
        name: faker.person.fullName(),
        city: faker.location.city(),
        state: faker.location.state({
          abbreviated: true,
        }),
      };

      const mockFarm: Farm = {
        id: farmId,
        name: faker.company.name(),
        city: faker.location.city(),
        state: faker.location.state({
          abbreviated: true,
        }),
        totalArea: 500,
        arableArea: farmArableArea,
        vegetationArea: 300,
        producerId: faker.string.uuid(),
      };

      (mockFarmRepository.findById as jest.Mock).mockResolvedValue(mockFarm);

      await expect(service.validateCultureArea(farmId, plantedArea)).rejects.toThrow(new AppException('EXCEEDED_ARABLE_AREA', 'A área plantada excede a área agricultável disponível na fazenda'));
      expect(mockFarmRepository.findById).toHaveBeenCalledWith(farmId);
    });
  });
}); 