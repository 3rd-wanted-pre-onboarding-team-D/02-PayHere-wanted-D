import { Module } from '@nestjs/common';
import { FinancialLedgerController } from './financial-ledger.controller';
import { FinancialLedgerService } from './financial-ledger.service';

@Module({
  controllers: [FinancialLedgerController],
  providers: [FinancialLedgerService]
})
export class FinancialLedgerModule {}
