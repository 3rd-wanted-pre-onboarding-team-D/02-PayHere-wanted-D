import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FinancialLedgerService } from './financial-ledger.service';

@Controller('/financial-ledgers')
@ApiTags('FinancialLedger')
export class FinancialLedgerController {
  constructor(
    private readonly financialLedgerService: FinancialLedgerService,
  ) {}
}
