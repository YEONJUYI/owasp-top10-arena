import { UserProgress } from '../types';

const STORAGE_KEY = 'owasp_arena_progress';

export class StorageService {
  // 진행도 불러오기
  static getProgress(): UserProgress {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      solvedChallenges: [],
      totalPoints: 0,
      hintsUsed: {}
    };
  }

  // 진행도 저장
  static saveProgress(progress: UserProgress): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }

  // 챌린지 해결 추가
  static addSolvedChallenge(challengeId: string, points: number): void {
    const progress = this.getProgress();
    if (!progress.solvedChallenges.includes(challengeId)) {
      progress.solvedChallenges.push(challengeId);
      progress.totalPoints += points;
      this.saveProgress(progress);
    }
  }

  // 힌트 사용 기록 (이름 변경!)
  static recordHintUsage(challengeId: string): void {
    const progress = this.getProgress();
    if (!progress.hintsUsed[challengeId]) {
      progress.hintsUsed[challengeId] = 0;
    }
    progress.hintsUsed[challengeId]++;
    this.saveProgress(progress);
  }

  // 챌린지 해결 여부 확인
  static isSolved(challengeId: string): boolean {
    const progress = this.getProgress();
    return progress.solvedChallenges.includes(challengeId);
  }

  // 진행도 초기화
  static resetProgress(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}