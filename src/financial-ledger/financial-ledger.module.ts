import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialLedgerController } from './financial-ledger.controller';
import { FinancialLedgerRepository } from './financial-ledger.repository';
import { FinancialLedgerService } from './financial-ledger.service';

@Module({
  imports: [TypeOrmModule.forFeature([FinancialLedgerRepository])],
  controllers: [FinancialLedgerController],
  providers: [FinancialLedgerService],
})
export class FinancialLedgerModule {}
