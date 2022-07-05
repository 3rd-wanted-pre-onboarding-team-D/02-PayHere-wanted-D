import { NotFoundException } from '@nestjs/common';
import { anything, instance, mock, when } from 'ts-mockito';
import { FinancialLedgerRepository } from '../financial-ledger.repository';
import { FinancialLedgerService } from '../financial-ledger.service';
import { getUser } from './user.fixture';

describe('Financial-Ledger Service Unit Test', () => {
  let financialService: FinancialLedgerService;
  let financialRepository: FinancialLedgerRepository;

  describe('delete', () => {
    test('해당하는 가계부가 없으면 NotFoundException이 발생하는가', async () => {
      // given
      const user = getUser();
      financialRepository = mock(FinancialLedgerRepository);
      when(financialRepository.findOneBy(anything())).thenResolve(null);
      financialService = new FinancialLedgerService(
        instance(financialRepository),
      );

      // when
      const result = financialService.delete(user, 123);

      // then
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });
});
