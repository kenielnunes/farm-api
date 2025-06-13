import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { CulturesModule } from './modules/cultures/cultures.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { FarmsModule } from './modules/farms/farms.module';
import { ProducersModule } from './modules/producers/producers.module';

@Module({
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
  ],
})
export class AppModule { }
