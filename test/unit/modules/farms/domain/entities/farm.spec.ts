import { Farm } from 'src/modules/farms/domain/entities/farm';

describe('Farm Entity', () => {
  it('deve criar uma fazenda válida', () => {
    const farm = new Farm(
      'uuid-1',
      'Fazenda Boa Vista',
      'Cidade',
      'MG',
      100,
      60,
      40,
      'producer-1',
    );
    expect(farm).toBeInstanceOf(Farm);
    expect(farm.totalArea).toBe(100);
    expect(farm.arableArea).toBe(60);
    expect(farm.vegetationArea).toBe(40);
  });

  it('deve lançar erro se a soma das áreas for maior que a área total', () => {
    expect(() => {
      new Farm('uuid-2', 'Fazenda Teste', 'Cidade', 'MG', 50, 30, 30, 'producer-2');
    }).toThrow('A soma das áreas agricultável e de vegetação não pode ultrapassar a área total.');
  });
}); 