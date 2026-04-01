import { doc, updateDoc, increment, serverTimestamp, collection, addDoc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import { useCallback } from 'react';

export const useGamification = () => {
  const { user, userData } = useAuth();

  const handleQuestionAnswered = useCallback(async ({
    questionId,
    isCorrect,
    difficulty,
    timeSpent
  }: {
    questionId: string;
    isCorrect: boolean;
    difficulty: string;
    timeSpent: number;
  }) => {
    if (!user || !userData) return;

    const userRef = doc(db, 'users', user.uid);
    const now = new Date();
    const todayStr = now.toDateString();
    
    // 1. Points Logic
    let pointsEarned = 0;
    if (isCorrect) {
      const diff = difficulty.toLowerCase();
      if (diff === 'fácil' || diff === 'easy') pointsEarned = 15;
      else if (diff === 'médio' || diff === 'medium') pointsEarned = 10;
      else if (diff === 'difícil' || diff === 'hard') pointsEarned = 5;
      else pointsEarned = 10;
    }

    // 2. Streak Logic
    const lastActiveDate = userData.lastActiveDate?.toDate() || new Date(0);
    const lastActiveStr = lastActiveDate.toDateString();
    
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    let newStreak = userData.streak || 0;
    
    // Only update streak if it's a new day
    if (lastActiveStr !== todayStr) {
      if (lastActiveStr === yesterdayStr) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }
    } else if (newStreak === 0) {
      // If for some reason streak is 0 but they are active today, set to 1
      newStreak = 1;
    }

    // 3. Weekly Points Logic (Reset handled by AuthContext or here)
    // We'll trust AuthContext for the reset, but here we just increment.
    // If weeklyPoints is undefined, we initialize it.
    const currentWeeklyPoints = userData.weeklyPoints ?? 0;

    // 4. Atomic Update
    const updates: any = {
      points: increment(pointsEarned),
      weeklyPoints: increment(pointsEarned),
      questionsToday: increment(1),
      totalAnswered: increment(1),
      totalCorrect: isCorrect ? increment(1) : increment(0),
      totalErrors: !isCorrect ? increment(1) : increment(0),
      streak: newStreak,
      lastActiveDate: serverTimestamp()
    };

    try {
      // Save attempt first
      const attemptsRef = collection(db, 'users', user.uid, 'questionAttempts');
      await addDoc(attemptsRef, {
        questionId,
        isCorrect,
        difficulty,
        timeSpent,
        answeredAt: serverTimestamp()
      });

      // Perform atomic update
      await updateDoc(userRef, updates);

      // Update Daily Stats for Charts
      const dateKey = now.toISOString().split('T')[0];
      const dailyStatsRef = doc(db, 'users', user.uid, 'dailyStats', dateKey);
      const statsDoc = await getDoc(dailyStatsRef);
      
      if (statsDoc.exists()) {
        await updateDoc(dailyStatsRef, {
          questionsAnswered: increment(1),
          correct: isCorrect ? increment(1) : increment(0),
          errors: isCorrect ? increment(0) : increment(1),
          pointsEarned: increment(pointsEarned)
        });
      } else {
        await setDoc(dailyStatsRef, {
          date: dateKey,
          studyTime: 0,
          questionsAnswered: 1,
          correct: isCorrect ? 1 : 0,
          errors: isCorrect ? 0 : 1,
          pointsEarned: pointsEarned
        });
      }

      return { pointsEarned, newStreak };
    } catch (error) {
      console.error("Error in handleQuestionAnswered:", error);
      throw error;
    }
  }, [user, userData]);

  return {
    handleQuestionAnswered,
    streak: userData?.streak || 0,
    points: userData?.points || 0,
    weeklyPoints: userData?.weeklyPoints || 0
  };
};
