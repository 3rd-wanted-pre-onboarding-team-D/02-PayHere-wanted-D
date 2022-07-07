import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import * as ormConfig from '../ormConfig';
import { FinancialLedgerModule } from './financial-ledger/financial-ledger.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    AuthModule,
    FinancialLedgerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
