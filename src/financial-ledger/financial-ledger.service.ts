import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/User';
import { FinancialLedgerRepository } from './financial-ledger.repository';

@Injectable()
export class FinancialLedgerService {
  constructor(
    private readonly financialLedgerRepository: FinancialLedgerRepository,
  ) {}

  async delete(user: User, financialLedgerId: number) {
    const financicalLedger = await this.financialLedgerRepository.findOneBy({
      user: { id: user.id },
      id: financialLedgerId,
    });

    if (!financicalLedger) {
      throw new NotFoundException('해당하는 가계부 내역이 존재하지 않습니다.');
    }

    financicalLedger.deletedAt = new Date();

    await this.financialLedgerRepository.save(financicalLedger);
  }
}
