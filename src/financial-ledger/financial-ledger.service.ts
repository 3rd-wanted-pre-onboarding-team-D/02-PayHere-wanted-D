import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FinancialLedger } from 'src/entities/FinancialLedger';
import { Repository } from 'typeorm';
import { FinancialLedgerDto } from './dto/financial-ledger.dto';
import { FinancialLedgerRepository } from './financial-ledger.repository';

@Injectable()
export class FinancialLedgerService {
  constructor(
    @InjectRepository(FinancialLedgerRepository)
    private readonly financialLedgerRepository: FinancialLedgerRepository,
  ) {}

  async createMemo(financialLedgerDto: FinancialLedgerDto) {
    return await this.financialLedgerRepository.createMemo(financialLedgerDto);
  }
}
