import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FinancialLedger } from 'src/entities/FinancialLedger';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class FinancialLedgerService {
  constructor(
    @InjectRepository(FinancialLedger)
    private readonly financialLedgerRepository: Repository<FinancialLedger>,
  ) {}
}
