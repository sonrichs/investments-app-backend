import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    switch (process.env.NODE_ENV) {
      case 'development':
        return {
          type: 'sqlite',
          synchronize: true,
          database: this.configService.get<string>('DB_NAME'),
          autoLoadEntities: true,
          migrationsRun: false,
        };
      case 'test':
        return {
          type: 'sqlite',
          synchronize: true,
          database: this.configService.get<string>('DB_NAME'),
          autoLoadEntities: true,
          migrationsRun: true,
        };
      case 'production':
        return {
          type: 'postgres',
          host: this.configService.get<string>('DB_HOST'),
          port: this.configService.get<number>('DB_PORT'),
          username: this.configService.get<string>('DB_USERNAME'),
          password: this.configService.get<string>('DB_PASSWORD'),
          synchronize: false,
          database: this.configService.get<string>('DB_NAME'),
          autoLoadEntities: true,
          migrationsRun: false,
        };
      default:
        throw new Error(`Unknown environment: ${process.env.NODE_ENV}`);
    }
  }
}
