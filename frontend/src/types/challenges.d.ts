declare module '*/challenges.json' {
  interface ChallengeData {
    challenges: Array<{
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
    }>;
  }
  
  const value: ChallengeData;
  export default value;
}