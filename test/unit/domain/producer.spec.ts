import { faker } from '@faker-js/faker';
import { Producer } from 'src/modules/producers/domain/entities/producer';

describe('Producer Entity', () => {
  it('should create a valid producer', () => {
    const id = faker.string.uuid();
    const name = faker.person.fullName();
    const document = faker.string.numeric(11);
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
}); 