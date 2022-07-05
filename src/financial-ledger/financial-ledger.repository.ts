import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { FinantialLedger } from '../entities/FinantialLedger';

@Injectable()
export class FinancialLedgerRepository extends Repository<FinantialLedger> {
  constructor(private readonly dataSource: DataSource) {
    super(
      FinantialLedger,
      dataSource.createEntityManager(),
      dataSource.createQueryRunner(),
    );
  }
}
