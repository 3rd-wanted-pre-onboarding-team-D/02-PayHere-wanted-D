import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import * as ormConfig from '../ormConfig';
import { FinancialLedgerModule } from './financial-ledger/financial-ledger.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    AuthModule,
    FinancialLedgerModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
