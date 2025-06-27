import { faker } from '@faker-js/faker';
import { Farm } from 'src/modules/farms/domain/entities/farm';

describe('Farm Entity', () => {
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

  it('deve lançar erro se a soma das áreas for maior que a área total', () => {
    const totalArea = 50;
    const arableArea = 30;
    const vegetationArea = 30;
    expect(() => {
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
    }).toThrow('A soma das áreas agricultável e de vegetação não pode ultrapassar a área total.');
  });
}); 