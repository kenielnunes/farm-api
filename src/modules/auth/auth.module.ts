import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { LoginUseCase } from './application/usecases/login.usecase';
import { RefreshTokenUseCase } from './application/usecases/refresh-token.usecase';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { AuthController } from './presentation/controllers/auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'jwt_secret',
      signOptions: { expiresIn: '15m' },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    RefreshTokenUseCase,
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
  ],
  exports: []
})
export class AuthModule { } 