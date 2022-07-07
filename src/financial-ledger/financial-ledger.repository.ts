import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { FinancialLedger } from '../entities/FinancialLedger';

@Injectable()
export class FinancialLedgerRepository extends Repository<FinancialLedger> {
  constructor(private readonly dataSource: DataSource) {
    super(
      FinancialLedger,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }
}
