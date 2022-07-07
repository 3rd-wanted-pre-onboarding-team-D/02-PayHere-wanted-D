import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/entities/User';
import { Repository } from 'typeorm';

/**
 * API End Point에 대해 Token이 유요한지 확인하는 class
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Token 만료 시, 401 Unauthorized 를 던지게 되어 있음.
      secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET,
    });
  }

  /**
   *  Custom Decorator 필요 -> UserId를 통해서 User반환해줄 수 있는 User() 데코레이터
   */
  async validate(payload: any) {
    //payload의 id를 통해 user객체를 가져온다.
    const user: User = await this.userRepository.findOne({
      id: payload.id,
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
