import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  async hash(anyString: string) {
    const saltOrRounds = 10;
    const encryptedString = await bcrypt.hash(anyString, saltOrRounds);
    return encryptedString;
  }

  async compare(anyString: string, encryptedString: string) {
    const isMatch = await bcrypt.compare(anyString, encryptedString);
    return isMatch;
  }
}
