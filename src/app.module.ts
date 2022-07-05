import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FinancialModule } from './ledger/financial/financial.module';
import { FinancialLedgerModule } from './financial-ledger/financial-ledger.module';
import * as ormConfig from '../ormConfig';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), FinancialModule, FinancialLedgerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
