import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TypeOrmTestConfig } from '../../../test/utils/typeorm-test-config';
import { FinancialLedgerRepository } from '../financial-ledger.repository';
import { FinancialLedgerService } from '../financial-ledger.service';

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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
