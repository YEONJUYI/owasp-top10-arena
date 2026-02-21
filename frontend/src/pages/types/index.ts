export interface Challenge {
  id: string;
  category: string;
  title: string;
  difficulty: string;
  description: string;
  points: number;
  flagHash: string;
  hints: string[];
  container_url: string;
  icon: string;
  tags: string[];
}

export interface UserProgress {  
  solvedChallenges: string[];
  totalPoints: number;
  hintsUsed: { [challengeId: string]: number };
}

export interface FlagSubmission {
  challengeId: string;
  flag: string;
}