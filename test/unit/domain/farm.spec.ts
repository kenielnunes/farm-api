import { faker } from '@faker-js/faker';
import { Farm } from 'src/modules/farms/domain/entities/farm';
import { AppException } from 'src/shared/exceptions/app.exception';

describe('Entidade Fazenda', () => {
  it('deve criar uma fazenda válida', () => {
    const id = faker.string.uuid();
    const name = faker.company.name();
    const city = faker.location.city();
    const state = faker.location.state({ abbreviated: true });
    const totalArea = faker.number.int({ min: 100, max: 1000 });
    const arableArea = faker.number.int({ min: 10, max: totalArea / 2 });
    const vegetationArea = totalArea - arableArea;
    const producerId = faker.string.uuid();

    const farm = new Farm(
      id,
      name,
      city,
      state,
      totalArea,
      arableArea,
      vegetationArea,
      producerId,
    );
    expect(farm).toBeInstanceOf(Farm);
    expect(farm.totalArea).toBe(totalArea);
    expect(farm.arableArea).toBe(arableArea);
    expect(farm.vegetationArea).toBe(vegetationArea);
  });

  it('deve lançar exceção se a soma das áreas agricultável e de vegetação exceder a área total', () => {
    const totalArea = 50;
    const arableArea = 30;
    const vegetationArea = 30;

    try {
      new Farm(
        faker.string.uuid(),
        faker.company.name(),
        faker.location.city(),
        faker.location.state({ abbreviated: true }),
        totalArea,
        arableArea,
        vegetationArea,
        faker.string.uuid(),
      );
    } catch (error) {
      expect(error).toBeInstanceOf(AppException);
      expect(error.message).toBe('A soma das áreas agricultável e de vegetação não pode ultrapassar a área total');
      expect(error.code).toBe('FARM_TOTAL_AREA_EXCEEDED');
    }
  });

  describe('isPlantedAreaValid', () => {
    it('deve retornar true se a área plantada for menor ou igual à área agricultável', () => {
      const farm = new Farm(
        faker.string.uuid(),
        faker.company.name(),
        faker.location.city(),
        faker.location.state({ abbreviated: true }),
        100,
        60,
        40,
        faker.string.uuid(),
      );
      expect(farm.isPlantedAreaValid(60)).toBe(true);
      expect(farm.isPlantedAreaValid(30)).toBe(true);
    });

    it('deve retornar false se a área plantada for maior que a área agricultável', () => {
      const farm = new Farm(
        faker.string.uuid(),
        faker.company.name(),
        faker.location.city(),
        faker.location.state({ abbreviated: true }),
        100,
        60,
        40,
        faker.string.uuid(),
      );
      expect(farm.isPlantedAreaValid(61)).toBe(false);
      expect(farm.isPlantedAreaValid(100)).toBe(false);
    });
  });
}); 