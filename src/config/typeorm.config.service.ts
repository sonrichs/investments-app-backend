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
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          autoLoadEntities: true,
          migrationsRun: true,
        };
      case 'production':
        return {
          type: 'postgres',
          synchronize: false,
          database: this.configService.get<string>('DB_NAME'),
          username: this.configService.get<string>('DB_USERNAME'),
          password: this.configService.get<string>('DB_PASSWORD'),
          autoLoadEntities: true,
          migrationsRun: false,
        };
      default:
        throw new Error(`Unknown environment: ${process.env.NODE_ENV}`);
    }
  }
}
