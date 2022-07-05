import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TypeOrmTestConfig } from '../../../test/utils/typeorm-test-config';
import { FinantialLedger } from '../../entities/FinantialLedger';
import { FinancialLedgerRepository } from '../financial-ledger.repository';
import { FinancialLedgerService } from '../financial-ledger.service';
import { getFinancialLedger } from './financial-ledger.fixture';
import { getUser } from './user.fixture';

describe('FinancialLedgerService', () => {
  let service: FinancialLedgerService;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(TypeOrmTestConfig)],
      providers: [FinancialLedgerService, FinancialLedgerRepository],
    }).compile();

    service = module.get<FinancialLedgerService>(FinancialLedgerService);
    dataSource = module.get(DataSource);
  });

  afterEach(async () => {
    await dataSource.destroy();
  });

  describe('delete', () => {
    test('해당하는 가계부 내역이 삭제되는가', async () => {
      // given
      const user = getUser();
      const financialLedger = getFinancialLedger({ user });
      const em = dataSource.createEntityManager();
      await em.save(user);
      await em.save(financialLedger);

      // when
      const result = service.delete(user, financialLedger.id);

      // then
      await expect(result).resolves.toEqual(undefined);
      const savedFinancialLedger = await em.findOneBy(FinantialLedger, {
        id: financialLedger.id,
      });
      expect(savedFinancialLedger).toEqual(null);
    });

    test('해당하는 가계부가 없으면 NotFoundException이 발생하는가', async () => {
      // given
      const user = getUser();
      await dataSource.createEntityManager().save(user);
      // when
      const result = service.delete(user, 1);
      // then
      await expect(result).rejects.toThrow(NotFoundException);
    });
  });
});
