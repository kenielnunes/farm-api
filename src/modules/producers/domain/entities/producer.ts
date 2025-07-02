import { DocumentValidator } from "src/shared/domain/validators/document-validator.service";

export class Producer {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly document: string, // CPF ou CNPJ
    public readonly city: string,
    public readonly state: string,
  ) {
    DocumentValidator.validate(document);
  }
}
