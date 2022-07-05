import { Module } from '@nestjs/common';
import { FinancialLedgerController } from './financial-ledger.controller';
import { FinancialLedgerRepository } from './financial-ledger.repository';
import { FinancialLedgerService } from './financial-ledger.service';

@Module({
  controllers: [FinancialLedgerController],
  providers: [FinancialLedgerService, FinancialLedgerRepository],
})
export class FinancialLedgerModule {}
