import { Injectable } from '@nestjs/common';
import { AppException } from '../../../../shared/exceptions/app.exception';

@Injectable()
export class DocumentValidatorService {
  validate(document: string): void {
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

  private validateCPF(cpf: string): boolean {
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  }

  private validateCNPJ(cnpj: string): boolean {
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
