import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { databaseConfig } from './config/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { CulturesModule } from './modules/cultures/cultures.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { FarmsModule } from './modules/farms/farms.module';
import { ProducersModule } from './modules/producers/producers.module';
import { UsersModule } from './modules/users/users.module';
import { RolesGuard } from './shared/guards/roles.guard';
import { ValidationInterceptor } from './shared/interceptors/validation.interceptor';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ValidationInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => databaseConfig(configService),
      inject: [ConfigService],
    }),
    ProducersModule,
    FarmsModule,
    CulturesModule,
    DashboardModule,
    UsersModule,
    AuthModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
          },
        },
        autoLogging: false,
      },
    }),
  ],
})
export class AppModule { }
