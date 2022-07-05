import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TypeOrmTestConfig } from '../../../test/utils/typeorm-test-config';
import { FinancialLedgerController } from '../financial-ledger.controller';
import { FinancialLedgerRepository } from '../financial-ledger.repository';
import { FinancialLedgerService } from '../financial-ledger.service';

describe('FinancialLedgerController', () => {
  let controller: FinancialLedgerController;
  let dataSource: DataSource;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(TypeOrmTestConfig)],
      controllers: [FinancialLedgerController],
      providers: [FinancialLedgerService, FinancialLedgerRepository],
    }).compile();

    controller = module.get<FinancialLedgerController>(
      FinancialLedgerController,
    );
    dataSource = module.get(DataSource);
  });

  afterEach(async () => {
    await dataSource.destroy();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
