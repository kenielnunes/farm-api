export class Producer {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly document: string, // CPF ou CNPJ
    public readonly city: string,
    public readonly state: string,
  ) { }
}
