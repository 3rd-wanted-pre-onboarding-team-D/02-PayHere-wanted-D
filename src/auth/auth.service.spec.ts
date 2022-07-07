import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { Repository } from 'typeorm';
import { Token } from '../entities/Token';
import { AuthService } from './auth.service';

const mockPostRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  softDelete: jest.fn(),
});
/**
 * MockRepository Type 지정
 */
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('AuthService', () => {
  let service: AuthService;
  let tokenRepository: MockRepository<Token>;
  let userRepository: MockRepository<User>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        // 사용하는 Repository -> Mock 이용하여 Value 지정
        {
          provide: getRepositoryToken(Token),
          useValue: mockPostRepository(),
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockPostRepository(),
        },
        JwtService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    tokenRepository = module.get<MockRepository<Token>>(
      getRepositoryToken(Token),
    );
    userRepository = module.get<MockRepository<Token>>(
      getRepositoryToken(User),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
