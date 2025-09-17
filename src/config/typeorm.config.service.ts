import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    const host = this.configService.get<string>('DB_HOST');
    const username = this.configService.get<string>('DB_USERNAME');
    const password = this.configService.get<string>('DB_PASSWORD');
    const database = this.configService.get<string>('DB_NAME');
    const databaseOptions = this.configService.get<string>('DB_OPTIONS');
    switch (process.env.NODE_ENV) {
      case 'development':
        return {
          type: 'sqlite',
          synchronize: true,
          database: database,
          autoLoadEntities: true,
          migrationsRun: false,
        };
      case 'test':
        return {
          type: 'sqlite',
          synchronize: true,
          database: database,
          autoLoadEntities: true,
          migrationsRun: true,
        };
      case 'production':
        return {
          type: 'postgres',
          url: `postgresql://${username}:${password}@${host}/${database}?${databaseOptions}`,
          autoLoadEntities: true,
          synchronize: false,
          migrationsRun: false,
        };
      default:
        throw new Error(`Unknown environment: ${process.env.NODE_ENV}`);
    }
  }
}
