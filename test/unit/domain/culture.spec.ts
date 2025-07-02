import { faker } from '@faker-js/faker';
import { Culture } from 'src/modules/cultures/domain/entities/culture';
import { AppException } from 'src/shared/exceptions/app.exception';

describe('Culture Entity', () => {
  const currentYear = new Date().getFullYear();

  it('should create a valid culture', () => {
    const culture = new Culture(
      faker.string.uuid(),
      faker.commerce.product(),
      faker.number.int({ min: 1, max: 100 }),
      currentYear,
      faker.string.uuid(),
    );
    expect(culture).toBeInstanceOf(Culture);
  });

  it('should throw if harvest year is less than current year', () => {
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

  it('should throw if harvest year is greater than next year', () => {
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

  it('should throw if planted area is less than or equal to zero', () => {
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