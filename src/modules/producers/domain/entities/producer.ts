import { DocumentValidator } from "src/shared/domain/validators/document-validator.service";
import { AppException } from "src/shared/exceptions/app.exception";

export class Producer {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly document: string, // CPF ou CNPJ
    public readonly city: string,
    public readonly state: string,
  ) {
    if (!name || name.trim().length === 0) {
      throw new AppException('INVALID_NAME', 'O nome do produtor não pode ser vazio');
    }
    if (!city || city.trim().length === 0) {
      throw new AppException('INVALID_CITY', 'A cidade do produtor não pode ser vazia');
    }
    if (!state || state.trim().length === 0) {
      throw new AppException('INVALID_STATE', 'O estado do produtor não pode ser vazio');
    }
    DocumentValidator.validate(document);
  }
}
