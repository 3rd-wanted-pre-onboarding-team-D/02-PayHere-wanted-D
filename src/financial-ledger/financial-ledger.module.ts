import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialLedger } from 'src/entities/FinancialLedger';
import { FinancialLedgerController } from './financial-ledger.controller';
import { FinancialLedgerService } from './financial-ledger.service';

@Module({
  imports: [TypeOrmModule.forFeature([FinancialLedger])],
  controllers: [FinancialLedgerController],
  providers: [FinancialLedgerService],
})
export class FinancialLedgerModule {}
