import React, { useState } from 'react';
import { FiSend, FiCheck, FiX } from 'react-icons/fi';
import { Challenge } from '../types';
import { FlagService } from '../services/flagService';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface FlagSubmitProps {
  challenge: Challenge;
  onSuccess: () => void;
}

export const FlagSubmit: React.FC<FlagSubmitProps> = ({ challenge, onSuccess }) => {
  const { user } = useAuth();
  const [flag, setFlag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<'success' | 'error' | null>(null);
  const [message, setMessage] = useState('');
  const [isSolved, setIsSolved] = useState(false);

  // 해결 상태 확인
  React.useEffect(() => {
    const checkSolved = async () => {
      if (!user) return;
      
      const { data } = await supabase
        .from('progress')
        .select('solved')
        .eq('user_id', user.id)
        .eq('challenge_id', challenge.id)
        .single();
      
      if (data?.solved) {
        setIsSolved(true);
      }
    };
    
    checkSolved();
  }, [user, challenge.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setResult('error');
      setMessage('⚠️ 로그인이 필요합니다.');
      return;
    }

    setIsSubmitting(true);
    setResult(null);

    try {
      const isCorrect = await FlagService.verifyFlag(challenge, flag);

      // Supabase에 제출 기록 저장
      await supabase.from('submissions').insert({
        user_id: user.id,
        challenge_id: challenge.id,
        flag: flag,
        is_correct: isCorrect
      });

      if (isCorrect) {
        // progress 테이블에 저장
        await supabase.from('progress').upsert({
          user_id: user.id,
          challenge_id: challenge.id,
          solved: true,
          solve_time: new Date().toISOString()
        }, {
          onConflict: 'user_id,challenge_id'
        });

        setResult('success');
        setMessage('🎉 정답입니다! Flag를 획득했습니다!');
        setIsSolved(true);
        
        setTimeout(() => {
          onSuccess();
        }, 2000);
      } else {
        setResult('error');
        setMessage('❌ 틀렸습니다. 다시 시도해보세요!');
      }
    } catch (error) {
      console.error('Submit error:', error);
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
            disabled={isSubmitting || isSolved}
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
          disabled={!flag || isSubmitting || isSolved}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>로딩중...</>
          ) : isSolved ? (
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