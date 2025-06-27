import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { AuthController } from './presentation/controllers/auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LoginUseCase } from './usecases/login.usecase';
import { RefreshTokenUseCase } from './usecases/refresh-token.usecase';

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