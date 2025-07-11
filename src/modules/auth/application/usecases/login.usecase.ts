import { HttpStatus, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from 'src/modules/auth/presentation/dto/login.dto';
import { UserRepository } from 'src/modules/users/infra/repositories/user.repository';
import { AppException } from 'src/shared/exceptions/app.exception';

export class LoginUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) { }

  async execute(dto: LoginDto) {
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user) {
      throw new AppException('INVALID_CREDENTIALS', 'Credenciais inválidas', HttpStatus.UNAUTHORIZED);
    }

    const passwordValid = await bcrypt.compare(dto.password, user.password);

    if (!passwordValid) {
      throw new AppException('INVALID_CREDENTIALS', 'Credenciais inválidas', HttpStatus.UNAUTHORIZED);
    }

    const payload = { sub: user.id, email: user.email, role: user.role };

    const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '15m' });

    const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '7d' });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
} 