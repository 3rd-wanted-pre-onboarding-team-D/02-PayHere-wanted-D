import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FinancialLedger } from 'src/entities/FinancialLedger';
import { Repository } from 'typeorm';
import { FinancialLedgerDto } from './dto/financial-ledger.dto';
import { FinancialLedgerListDto } from './dto/financial-ledger.list.dto';
import { FinancialLedgerRepository } from './financial-ledger.repository';

@Injectable()
export class FinancialLedgerService {
  constructor(
    @InjectRepository(FinancialLedgerRepository)
    private readonly financialLedgerRepository: FinancialLedgerRepository,
  ) {}

  //유저 인증 추가 필요
  async createMemo(financialLedgerDto: FinancialLedgerDto) {
    return await this.financialLedgerRepository.createMemo(financialLedgerDto);
  }

  async getOneMemo(id: number) {
    return await this.financialLedgerRepository.findOne(id);
  }

  async getAllMemo() {
    return await this.financialLedgerRepository.getAll();
  }
}
