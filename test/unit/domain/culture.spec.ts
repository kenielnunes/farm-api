import { faker } from '@faker-js/faker';
import { Culture } from 'src/modules/cultures/domain/entities/culture';
import { AppException } from 'src/shared/exceptions/app.exception';

describe('Entidade Cultura', () => {
  const currentYear = new Date().getFullYear();

  it('deve criar uma cultura válida', () => {
    const culture = new Culture(
      faker.string.uuid(),
      faker.commerce.product(),
      faker.number.int({ min: 1, max: 100 }),
      currentYear,
      faker.string.uuid(),
    );
    expect(culture).toBeInstanceOf(Culture);
  });

  it('deve lançar erro se o nome da safra for vazio', () => {
    expect(() => new Culture(
      faker.string.uuid(),
      '',
      faker.number.int({ min: 1, max: 100 }),
      currentYear,
      faker.string.uuid(),
    )).toThrow();
  });

  it('deve lançar exceção se o ano da safra for menor que o ano atual', () => {
    expect(() => {
      new Culture(
        faker.string.uuid(),
        faker.commerce.product(),
        faker.number.int({ min: 1, max: 100 }),
        currentYear - 1,
        faker.string.uuid(),
      );
    }).toThrow(AppException);
  });

  it('deve lançar exceção se o ano da safra for maior que o próximo ano', () => {
    expect(() => {
      new Culture(
        faker.string.uuid(),
        faker.commerce.product(),
        faker.number.int({ min: 1, max: 100 }),
        currentYear + 2,
        faker.string.uuid(),
      );
    }).toThrow(AppException);
  });

  it('deve lançar exceção se a área plantada for menor ou igual a zero', () => {
    expect(() => {
      new Culture(
        faker.string.uuid(),
        faker.commerce.product(),
        0,
        currentYear,
        faker.string.uuid(),
      );
    }).toThrow(AppException);
    expect(() => {
      new Culture(
        faker.string.uuid(),
        faker.commerce.product(),
        -5,
        currentYear,
        faker.string.uuid(),
      );
    }).toThrow(AppException);
  });
}); 