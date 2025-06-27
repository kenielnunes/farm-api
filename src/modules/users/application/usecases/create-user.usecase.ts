import { HttpStatus, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AppException } from '../../../../shared/exceptions/app.exception';
import { User } from '../../domain/entities/user';
import { IUserRepository } from '../../infra/repositories/user.repository.interface';
import { CreateUserDto } from '../../presentation/dto/create-user.dto';

export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @InjectPinoLogger(CreateUserUseCase.name)
    private readonly logger: PinoLogger,
  ) { }

  async execute(dto: CreateUserDto) {
    this.logger.info({ email: dto.email, role: dto.role }, 'Tentativa de cadastro de usuário');
    // Verifica se já existe usuário com o e-mail
    const exists = await this.userRepository.findByEmail(dto.email);
    if (exists) {
      this.logger.warn({ email: dto.email }, 'E-mail já cadastrado');
      throw new AppException('EMAIL_CONFLICT', 'E-mail já cadastrado', HttpStatus.CONFLICT);
    }

    const user = new User(
      randomUUID(),
      dto.email,
      dto.password,
      dto.role,
    );

    console.log('userDomain -> ', user);

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    const saved = await this.userRepository.create(user);
    this.logger.info({ userId: saved.id, email: saved.email }, 'Usuário cadastrado com sucesso');
    return saved;
  }
} 