import { faker } from "@faker-js/faker/.";
import { DocumentValidator } from "src/shared/domain/validators/document-validator.service";
import { AppException } from "src/shared/exceptions/app.exception";

describe('Validador de Documento', () => {
  it('deve estar definido', () => {
    expect(DocumentValidator).toBeDefined();
  });

  describe('validate', () => {
    it('não deve lançar exceção para um CPF válido', () => {
      const cpfValido = '52998224725';
      expect(() => DocumentValidator.validate(cpfValido)).not.toThrow();
    });

    it('deve lançar AppException para CPF inválido', () => {
      const cpfInvalido = '111.111.111-11';
      expect(() => DocumentValidator.validate(cpfInvalido)).toThrow(
        new AppException('INVALID_CPF', 'CPF inválido', 400),
      );
    });

    it('não deve lançar exceção para um CNPJ válido', () => {
      const cnpjValido = '11444777000161';
      expect(() => DocumentValidator.validate(cnpjValido)).not.toThrow();
    });

    it('deve lançar AppException para CNPJ inválido', () => {
      const cnpjInvalido = '11111111111111';
      expect(() => DocumentValidator.validate(cnpjInvalido)).toThrow(
        new AppException('INVALID_CNPJ', 'CNPJ inválido', 400),
      );
    });

    it('deve lançar AppException para documento com tamanho inválido', () => {
      const docInvalido = faker.string.numeric(5);
      expect(() => DocumentValidator.validate(docInvalido)).toThrow(
        new AppException(
          'INVALID_DOCUMENT',
          'Documento inválido. Deve ser um CPF (11 dígitos) ou CNPJ (14 dígitos)',
          400,
        ),
      );
    });
  });
});
