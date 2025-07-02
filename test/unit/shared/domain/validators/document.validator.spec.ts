import { faker } from "@faker-js/faker/.";
import { DocumentValidator } from "src/shared/domain/validators/document-validator.service";
import { AppException } from "src/shared/exceptions/app.exception";

describe('DocumentValidator', () => {
  it('should be defined', () => {
    expect(DocumentValidator).toBeDefined();
  });

  describe('validate', () => {
    it('should not throw for a valid CPF', () => {
      const validCPF = '52998224725';
      expect(() => DocumentValidator.validate(validCPF)).not.toThrow();
    });

    it('should throw AppException for invalid CPF', () => {
      const invalidCPF = '111.111.111-11';
      expect(() => DocumentValidator.validate(invalidCPF)).toThrow(
        new AppException('INVALID_CPF', 'CPF inválido', 400),
      );
    });

    it('should throw AppException for invalid document length', () => {
      const invalidDoc = faker.string.numeric(5);
      expect(() => DocumentValidator.validate(invalidDoc)).toThrow(
        new AppException(
          'INVALID_DOCUMENT',
          'Documento inválido. Deve ser um CPF (11 dígitos) ou CNPJ (14 dígitos)',
          400,
        ),
      );
    });
  });
});
