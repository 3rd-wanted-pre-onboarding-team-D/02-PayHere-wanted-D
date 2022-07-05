import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FinancialLedger } from 'src/entities/FinancialLedger';
import { FinancialLedgerService } from './financial-ledger.service';

@Controller('financial-ledger')
export class FinancialLedgerController {
  constructor(
    private readonly financialLedgerService: FinancialLedgerService,
  ) {}
}
