import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

export const TypeOrmTestConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'test',
  password: 'test',
  database: 'test',
  entities: [path.resolve(__dirname, '../../src/entities/*.{js,ts}')],
  autoLoadEntities: true,
  charset: 'utf8mb4',
  synchronize: true, //첫 시작은 true, 나머지는 계속 false
  logging: false, //쿼리문 로그
  keepConnectionAlive: true, //핫 리로딩 시 연결 차단 막기
  migrationsRun: false,
};
