import { AppException } from 'src/shared/exceptions/app.exception';

export class DocumentValidator {
  static validate(document: string): void {
    const onlyNumbers = document.replace(/\D/g, '');

    if (onlyNumbers.length === 11) {
      if (!this.validateCPF(onlyNumbers)) {
        throw new AppException(
          'INVALID_CPF',
          'CPF inválido',
          400,
        );
      }
      return;
    }

    if (onlyNumbers.length === 14) {
      if (!this.validateCNPJ(onlyNumbers)) {
        throw new AppException(
          'INVALID_CNPJ',
          'CNPJ inválido',
          400,
        );
      }
      return;
    }

    throw new AppException(
      'INVALID_DOCUMENT',
      'Documento inválido. Deve ser um CPF (11 dígitos) ou CNPJ (14 dígitos)',
      400,
    );
  }

  private static validateCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    for (let i = 0; i < 9; i++) sum += +cpf[i] * (10 - i);
    let check1 = 11 - (sum % 11);
    check1 = check1 >= 10 ? 0 : check1;

    if (check1 !== +cpf[9]) return false;

    sum = 0;
    for (let i = 0; i < 10; i++) sum += +cpf[i] * (11 - i);
    let check2 = 11 - (sum % 11);
    check2 = check2 >= 10 ? 0 : check2;

    return check2 === +cpf[10];
  }

  private static validateCNPJ(cnpj: string): boolean {
    if (/^(\d)\1{13}$/.test(cnpj)) return false;

    let size = cnpj.length - 2;
    let numbers = cnpj.substring(0, size);
    let digits = cnpj.substring(size);
    let sum = 0;
    let pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;

    size = size + 1;
    numbers = cnpj.substring(0, size);
    sum = 0;
    pos = size - 7;

    for (let i = size; i >= 1; i--) {
      sum += parseInt(numbers.charAt(size - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1))) return false;

    return true;
  }
}
