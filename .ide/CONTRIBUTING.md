# FARM-API - Estrutura e Padrões

Este documento apresenta a organização dos arquivos do projeto e os padrões adotados em cada camada da aplicação, seguindo a **Clean Architecture** com NestJS.

---

## 📘 Contexto do Projeto

Este projeto é uma API construída com NestJS seguindo os princípios da Clean Architecture. Ela visa **gerenciar produtores rurais e suas propriedades** com foco em controle de áreas, culturas plantadas e análise por meio de um dashboard.

---

## 🧩 Regras de Negócio

1. Um produtor rural pode ser identificado por **CPF ou CNPJ** válidos.
2. Um produtor pode ter **0 ou mais propriedades (fazendas)**.
3. Cada propriedade deve conter:
   - Nome da fazenda
   - Cidade e estado
   - Área total em hectares
   - Área agricultável
   - Área de vegetação
4. **A soma das áreas agricultável e de vegetação não pode ultrapassar a área total.**
5. Uma propriedade pode conter **0 ou mais culturas plantadas** por safra.
6. As culturas estão associadas à propriedade e a uma safra específica (ex: *Milho na Safra 2022*).
7. Devem existir funcionalidades para:
   - Criar, editar e excluir produtores e fazendas
   - Validar documentos (CPF/CNPJ)
   - Adicionar culturas às fazendas por safra

---

## 📊 Dashboard

O dashboard deve conter:

- **Total de fazendas cadastradas**
- **Total de hectares registrados (soma das áreas totais)**
- Gráficos de pizza:
  - Por **estado**
  - Por **cultura plantada**
  - Por **uso do solo** (agricultável x vegetação)

---

## 🏗️ Estrutura da Arquitetura

Este projeto segue o padrão **Clean Architecture** usando **NestJS** e está dividido em quatro grandes camadas:

- **`domain`**: Lógica de negócio pura, incluindo entidades e serviços do domínio
- **`infra`**: Implementações concretas (banco de dados, entidades ORM, repositórios e suas interfaces)
- **`presentation`**: Controladores HTTP que expõem os endpoints
- **`usecases`**: Casos de uso específicos, coordenando entidades, serviços e repositórios

### Estrutura dos Módulos

Cada módulo dentro de `src/modules` segue este padrão:

```
modules/
  producers/
    domain/
      entities/
      services/
    dto/
    infra/
      entities/
      repositories/
    presentation/
      controllers/
    usecases/
```

---

## 📁 Arquivos e Padrões por Camada

### 1. **Domain Layer**

#### Entidade do Domínio (`producer.ts`)

```typescript
export class Producer {
  constructor(
    public readonly name: string,
    public readonly document: string, // CPF ou CNPJ
    public readonly farmName: string,
    public readonly city: string,
    public readonly state: string,
    public readonly totalArea: number,
    public readonly arableArea: number,
    public readonly vegetationArea: number,
  ) {
    if (arableArea + vegetationArea > totalArea) {
      throw new Error('The sum of arable and vegetation areas cannot exceed total area.');
    }
  }
}
```

**Padrão:** Entity (Domain Model) - representa a entidade de negócio com suas regras e validações internas. Aqui se mantém a lógica do domínio, como validação da soma das áreas.

#### Serviço de Domínio (`document-validator.service.ts`)

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class DocumentValidatorService {
  isValid(document: string): boolean {
    const onlyNumbers = document.replace(/\D/g, '');

    if (onlyNumbers.length === 11) return this.validateCPF(onlyNumbers);
    if (onlyNumbers.length === 14) return this.validateCNPJ(onlyNumbers);

    return false;
  }

  private validateCPF(cpf: string): boolean {
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    // Lógica simplificada de validação do CPF
    return true;
  }

  private validateCNPJ(cnpj: string): boolean {
    if (/^(\d)\1{13}$/.test(cnpj)) return false;
    // Lógica simplificada de validação do CNPJ
    return true;
  }
}
```

**Padrão:** Domain Service - encapsula lógica específica e reutilizável da regra de negócio, que não pertence diretamente a uma entidade.

### 2. **DTO Layer**

#### Data Transfer Object (`create-producer.dto.ts`)

```typescript
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProducerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  document: string;

  @IsString()
  @IsNotEmpty()
  farmName: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsNumber()
  totalArea: number;

  @IsNumber()
  arableArea: number;

  @IsNumber()
  vegetationArea: number;
}
```

**Padrão:** DTO - objeto para validação e transporte de dados entre camadas, separado da entidade do domínio.

### 3. **Infrastructure Layer**

#### Entidade ORM (`producer.entity.ts`)

```typescript
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('producers')
export class ProducerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  document: string;

  @Column()
  farmName: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column('float')
  totalArea: number;

  @Column('float')
  arableArea: number;

  @Column('float')
  vegetationArea: number;
}
```

**Padrão:** ORM Entity - entidade mapeada para banco de dados usando TypeORM, para persistência.

#### Interface do Repositório (`producer.repository.interface.ts`)

```typescript
import { Producer } from '../../domain/entities/producer';
import { ProducerEntity } from '../entities/producer.entity';

export interface IProducerRepository {
  save(producer: Producer): Promise<ProducerEntity>;
  findById(id: string): Promise<ProducerEntity | null>;
  findByDocument(document: string): Promise<ProducerEntity | null>;
  update(id: string, producer: Partial<Producer>): Promise<ProducerEntity | null>;
  delete(id: string): Promise<void>;
}
```

**Padrão:** Repository Interface - contrato para a implementação do repositório, garantindo desacoplamento.

#### Implementação do Repositório (`producer.repository.ts`)

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producer } from '../../domain/entities/producer';
import { ProducerEntity } from '../entities/producer.entity';
import { IProducerRepository } from './producer.repository.interface';

@Injectable()
export class ProducerRepository implements IProducerRepository {
  constructor(
    @InjectRepository(ProducerEntity)
    private readonly ormRepo: Repository<ProducerEntity>,
  ) {}

  async save(producer: Producer): Promise<ProducerEntity> {
    const entity = this.ormRepo.create({
      name: producer.name,
      document: producer.document,
      farmName: producer.farmName,
      city: producer.city,
      state: producer.state,
      totalArea: producer.totalArea,
      arableArea: producer.arableArea,
      vegetationArea: producer.vegetationArea,
    });

    return await this.ormRepo.save(entity);
  }

  async findById(id: string): Promise<ProducerEntity | null> {
    return await this.ormRepo.findOne({ where: { id } });
  }

  async findByDocument(document: string): Promise<ProducerEntity | null> {
    return await this.ormRepo.findOne({ where: { document } });
  }

  async update(id: string, producer: Partial<Producer>): Promise<ProducerEntity | null> {
    await this.ormRepo.update(id, producer);
    return await this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
```

**Padrão:** Repository Implementation - implementação concreta da interface para persistência dos dados com TypeORM.

### 4. **Use Case Layer**

#### Caso de Uso (`create-producer.usecase.ts`)

```typescript
import { Injectable } from '@nestjs/common';
import { Producer } from '../domain/entities/producer';
import { DocumentValidatorService } from '../domain/services/document-validator.service';
import { CreateProducerDto } from '../dto/create-producer.dto';
import { IProducerRepository } from '../infra/repositories/producer.repository.interface';

@Injectable()
export class CreateProducerUseCase {
  constructor(
    private readonly documentValidator: DocumentValidatorService,
    private readonly producerRepository: IProducerRepository,
  ) {}

  async execute(input: CreateProducerDto): Promise<void> {
    const isValidDoc = this.documentValidator.isValid(input.document);

    if (!isValidDoc) {
      throw new Error('Invalid CPF or CNPJ');
    }

    const producer = new Producer(
      input.name,
      input.document,
      input.farmName,
      input.city,
      input.state,
      input.totalArea,
      input.arableArea,
      input.vegetationArea,
    );

    await this.producerRepository.save(producer);
  }
}
```

**Padrão:** Use Case (Application Service) - encapsula a lógica específica do caso de uso, orquestrando entidades, serviços e repositórios.

### 5. **Presentation Layer**

#### Controlador (`producers.controller.ts`)

```typescript
import { Body, Controller, Post } from '@nestjs/common';
import { CreateProducerDto } from '../../dto/create-producer.dto';
import { CreateProducerUseCase } from '../../usecases/create-producer.usecase';

@Controller('producers')
export class ProducersController {
  constructor(private readonly createProducerUseCase: CreateProducerUseCase) {}

  @Post()
  async create(@Body() dto: CreateProducerDto): Promise<{ message: string }> {
    await this.createProducerUseCase.execute(dto);
    return { message: 'Producer created successfully' };
  }
}
```

**Padrão:** Controller - recebe requisições HTTP, valida dados via DTO e delega para o use case.

---

## 📝 Convenções de Nomenclatura

Use o nome da entidade sempre em **minúsculas** e utilize sufixos que indicam o tipo do arquivo:

| Tipo | Exemplo |
|------|---------|
| Use Case | `create-producer.usecase.ts` |
| DTO | `producer.dto.ts` |
| Repository Interface | `producer.repository.interface.ts` |
| Repository | `producer.repository.ts` |
| Entity ORM | `producer.entity.ts` |
| Entity Domain | `producer.ts` |
| Controller | `producer.controller.ts` |
| Service (Domain) | `document-validator.service.ts` |

---

## 🔄 Fluxo para Criar uma Nova Funcionalidade

1. **Defina a entidade** no `domain/entities`
2. **Crie serviços auxiliares** em `domain/services` se necessário
3. **Crie um DTO** para validação e transporte de dados em `dto/`
4. **Implemente o repositório** na `infra/repositories` e a entidade ORM em `infra/entities`
5. **Crie o caso de uso** dentro de `usecases/`
6. **Implemente o controlador** em `presentation/controllers`
7. **Registre e conecte** todos os componentes no módulo principal

---

## 🛠️ Padrões de Projeto Utilizados

- **Clean Architecture**: separação clara entre domínio, aplicação, infraestrutura e apresentação
- **Dependency Injection**: via NestJS para gerenciar dependências
- **Repository Pattern**: abstração da persistência, facilitando testes e manutenção
- **DTOs**: para validação e segurança dos dados recebidos e enviados
- **Entities**: modelos ricos de domínio com regras de negócio encapsuladas

---

## 🤝 Contribuindo

Ao contribuir para este projeto, certifique-se de seguir todos os padrões e convenções descritos neste documento. Isso garante a consistência e manutenibilidade do código.