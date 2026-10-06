import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module.js';
import { HealthModule } from './health/health.module.js';

@Module({
  imports: [
    // Carga variables desde .env (primero el de la app, luego el de la raíz)
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '../../.env'],
    }),
    DatabaseModule,
    HealthModule,
    // Próximos módulos: MasterDataModule, SalesIngestionModule, ReconciliationModule...
  ],
})
export class AppModule {}
