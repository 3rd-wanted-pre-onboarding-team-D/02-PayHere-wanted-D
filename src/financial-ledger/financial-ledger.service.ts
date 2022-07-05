import { Injectable } from '@nestjs/common';
import { FinancialLedgerRepository } from './financial-ledger.repository';

@Injectable()
export class FinancialLedgerService {
  constructor(
    private readonly financialLedgerRepository: FinancialLedgerRepository,
  ) {}
}
