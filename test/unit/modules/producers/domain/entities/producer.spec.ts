import { Producer } from 'src/modules/producers/domain/entities/producer';

describe('Producer Entity', () => {
  it('deve criar um produtor válido', () => {
    const producer = new Producer(
      'uuid-123',
      'João da Silva',
      '12345678901',
      'Cidade Exemplo',
      'SP',
    );
    expect(producer).toBeInstanceOf(Producer);
    expect(producer.id).toBe('uuid-123');
    expect(producer.name).toBe('João da Silva');
    expect(producer.document).toBe('12345678901');
    expect(producer.city).toBe('Cidade Exemplo');
    expect(producer.state).toBe('SP');
  });
}); 