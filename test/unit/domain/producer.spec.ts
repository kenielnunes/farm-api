import { faker } from '@faker-js/faker';
import { Producer } from 'src/modules/producers/domain/entities/producer';

describe('Entidade Produtor', () => {
  it('deve criar um produtor válido', () => {
    const id = faker.string.uuid();
    const name = faker.person.fullName();
    const document = '52998224725';
    const city = faker.location.city();
    const state = faker.location.state({ abbreviated: true });

    const producer = new Producer(
      id,
      name,
      document,
      city,
      state,
    );
    expect(producer).toBeInstanceOf(Producer);
    expect(producer.id).toBe(id);
    expect(producer.name).toBe(name);
    expect(producer.document).toBe(document);
    expect(producer.city).toBe(city);
    expect(producer.state).toBe(state);
  });

  it('deve aceitar um CNPJ válido como documento', () => {
    const id = faker.string.uuid();
    const name = faker.person.fullName();
    const document = '11444777000161';
    const city = faker.location.city();
    const state = faker.location.state({ abbreviated: true });

    const producer = new Producer(
      id,
      name,
      document,
      city,
      state,
    );
    expect(producer.document).toBe(document);
  });
}); 