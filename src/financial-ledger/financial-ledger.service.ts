import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../entities/User';
import { UpdateRequestDto } from './dto/update-request.dto';
import { FinancialLedgerRepository } from './financial-ledger.repository';

@Injectable()
export class FinancialLedgerService {
  constructor(
    private readonly financialLedgerRepository: FinancialLedgerRepository,
  ) {}

  async update(
    user: User,
    financialLedgerId: number,
    updateInfo: UpdateRequestDto,
  ) {
    const financialLedger = await this.financialLedgerRepository.findOneBy({
      user: { id: user.id },
      id: financialLedgerId,
    });

    if (!financialLedger) {
      throw new NotFoundException('해당하는 가계부 내역이 존재하지 않습니다.');
    }

    financialLedger.update(updateInfo);

    await this.financialLedgerRepository.save(financialLedger);
  }

  async delete(user: User, financialLedgerId: number) {
    const financialLedger = await this.financialLedgerRepository.findOneBy({
      user: { id: user.id },
      id: financialLedgerId,
    });

    if (!financialLedger) {
      throw new NotFoundException('해당하는 가계부 내역이 존재하지 않습니다.');
    }

    financialLedger.delete();

    await this.financialLedgerRepository.save(financialLedger);
  }

  async restore(user: User, financialLedgerId: number) {
    const financialLedger = await this.financialLedgerRepository.findOneBy({
      user: { id: user.id },
      id: financialLedgerId,
    });

    if (!financialLedger) {
      throw new NotFoundException('해당하는 가계부 내역이 존재하지 않습니다.');
    }

    if (!financialLedger.isDeleted()) {
      throw new BadRequestException('삭제되지 않은 가계부 내역 입니다.');
    }

    financialLedger.restore();

    await this.financialLedgerRepository.save(financialLedger);
  }
}
