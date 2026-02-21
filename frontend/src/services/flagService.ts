import { Challenge } from '../types';

export class FlagService {
  // SHA256 해시 생성
  static async hashFlag(flag: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(flag);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  // Flag 검증
  static async verifyFlag(challenge: Challenge, submittedFlag: string): Promise<boolean> {
    const hashedFlag = await this.hashFlag(submittedFlag);
    return hashedFlag === challenge.flagHash;
  }
}