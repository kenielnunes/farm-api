import { HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from 'src/modules/auth/presentation/dto/refresh-token.dto';
import { AppException } from 'src/shared/exceptions/app.exception';

export class RefreshTokenUseCase {
  constructor(private readonly jwtService: JwtService) { }

  async execute(dto: RefreshTokenDto) {
    try {
      const payload = await this.jwtService.verifyAsync(dto.refreshToken);
      // Gera novo access token
      const accessToken = await this.jwtService.signAsync({
        sub: payload.sub,
        email: payload.email,
        role: payload.role,
      }, { expiresIn: '15m' });
      return { accessToken };
    } catch (e) {
      throw new AppException('INVALID_REFRESH_TOKEN', 'Refresh token inválido ou expirado', HttpStatus.UNAUTHORIZED);
    }
  }
} 