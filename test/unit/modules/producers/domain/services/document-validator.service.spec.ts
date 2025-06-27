import { faker } from "@faker-js/faker/.";
import { DocumentValidatorService } from "src/modules/producers/domain/services/document-validator.service";
import { AppException } from "src/shared/exceptions/app.exception";

describe('DocumentValidatorService', () => {
  let service: DocumentValidatorService;

  beforeEach(() => {
    service = new DocumentValidatorService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validate', () => {
    it('should not throw for a valid CPF', () => {
      const validCPF = '52998224725';
      expect(() => service.validate(validCPF)).not.toThrow();
    });

    it('should throw AppException for invalid CPF', () => {
      const invalidCPF = '111.111.111-11';
      expect(() => service.validate(invalidCPF)).toThrow(
        new AppException('INVALID_CPF', 'CPF inválido', 400),
      );
    });

    it('should throw AppException for invalid document length', () => {
      const invalidDoc = faker.string.numeric(5);
      expect(() => service.validate(invalidDoc)).toThrow(
        new AppException(
          'INVALID_DOCUMENT',
          'Documento inválido. Deve ser um CPF (11 dígitos) ou CNPJ (14 dígitos)',
          400,
        ),
      );
    });
  });
});
