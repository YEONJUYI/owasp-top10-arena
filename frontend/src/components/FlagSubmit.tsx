import React, { useState } from 'react';
import { FiSend, FiCheck, FiX } from 'react-icons/fi';
import { Challenge } from '../types';
import { FlagService } from '../services/flagService';
import { StorageService } from '../utils/storage';

interface FlagSubmitProps {
  challenge: Challenge;
  onSuccess: () => void;
}

export const FlagSubmit: React.FC<FlagSubmitProps> = ({ challenge, onSuccess }) => {
  const [flag, setFlag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<'success' | 'error' | null>(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResult(null);

    try {
      const isCorrect = await FlagService.verifyFlag(challenge, flag);

      if (isCorrect) {
        StorageService.addSolvedChallenge(challenge.id, challenge.points);
        setResult('success');
        setMessage('🎉 정답입니다! Flag를 획득했습니다!');
        setTimeout(() => {
          onSuccess();
        }, 2000);
      } else {
        setResult('error');
        setMessage('❌ 틀렸습니다. 다시 시도해보세요!');
      }
    } catch (error) {
      setResult('error');
      setMessage('⚠️ 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-4">🚩 Flag 제출</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={flag}
            onChange={(e) => setFlag(e.target.value)}
            placeholder="OWASP{...}"
            className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            disabled={isSubmitting || StorageService.isSolved(challenge.id)}
          />
        </div>

        {result && (
          <div className={`flex items-center gap-2 p-3 rounded-lg ${
            result === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
          }`}>
            {result === 'success' ? <FiCheck size={20} /> : <FiX size={20} />}
            <span>{message}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={!flag || isSubmitting || StorageService.isSolved(challenge.id)}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>로딩중...</>
          ) : StorageService.isSolved(challenge.id) ? (
            <>
              <FiCheck /> 이미 해결함
            </>
          ) : (
            <>
              <FiSend /> 제출하기
            </>
          )}
        </button>
      </form>
    </div>
  );
};