import React from 'react';
import { StorageService } from '../utils/storage';
import challengesData from '../data/challenges.json';

export const ProgressBar: React.FC = () => {
  const progress = StorageService.getProgress();
  const totalChallenges = challengesData.challenges.length;
  const solvedCount = progress.solvedChallenges.length;
  const percentage = (solvedCount / totalChallenges) * 100;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-white">진행도</h3>
        <span className="text-gray-400">
          {solvedCount} / {totalChallenges} 해결
        </span>
      </div>

      <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-green-500 h-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="mt-4 text-center">
        <span className="text-2xl font-bold text-green-400">{progress.totalPoints}</span>
        <span className="text-gray-400 ml-2">포인트</span>
      </div>
    </div>
  );
};