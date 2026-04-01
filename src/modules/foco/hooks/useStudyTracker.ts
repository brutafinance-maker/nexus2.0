import { useState, useEffect, useRef } from 'react';
import { 
  doc, 
  updateDoc, 
  increment, 
  setDoc, 
  collection, 
  addDoc, 
  serverTimestamp,
  getDoc
} from 'firebase/firestore';
import { db } from '../../../services/firebase';
import { useAuth } from '../../../context/AuthContext';

const MAX_SESSION_TIME = 5 * 60 * 60; // 5 hours in seconds
const HOURLY_SOUND_URL = 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'; // Soft notification sound

export const useStudyTracker = () => {
  const { user, userData } = useAuth();
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [totalTimeToday, setTotalTimeToday] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastSyncRef = useRef<number>(Date.now());

  useEffect(() => {
    if (userData) {
      setTotalTimeToday(userData.studyTimeToday || 0);
    }
  }, [userData]);

  useEffect(() => {
    audioRef.current = new Audio(HOURLY_SOUND_URL);
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    let interval: any = null;
    if (isActive) {
      interval = setInterval(() => {
        setSessionTime((prev) => {
          const next = prev + 1;
          
          // Hourly sound
          if (next > 0 && next % 3600 === 0) {
            audioRef.current?.play().catch(e => console.warn("Audio play blocked", e));
          }
          
          // 5-hour limit
          if (next >= MAX_SESSION_TIME) {
            setIsActive(false);
            return prev;
          }
          
          return next;
        });

        // Sync with Firestore every 30 seconds to avoid data loss
        const now = Date.now();
        if (now - lastSyncRef.current > 30000) {
          const delta = Math.floor((now - lastSyncRef.current) / 1000);
          if (delta > 0) {
            syncStudyTime(delta);
            lastSyncRef.current = now;
          }
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const syncStudyTime = async (deltaSeconds: number) => {
    if (!user) return;

    const userDocRef = doc(db, 'users', user.uid);
    const today = new Date().toISOString().split('T')[0];
    const dailyStatsRef = doc(db, 'users', user.uid, 'dailyStats', today);

    try {
      // Update user doc
      await updateDoc(userDocRef, {
        studyTimeToday: increment(deltaSeconds)
      });

      // Update daily stats
      const statsDoc = await getDoc(dailyStatsRef);
      if (statsDoc.exists()) {
        await updateDoc(dailyStatsRef, {
          studyTime: increment(deltaSeconds)
        });
      } else {
        await setDoc(dailyStatsRef, {
          date: today,
          studyTime: deltaSeconds,
          questionsAnswered: 0,
          correct: 0,
          errors: 0,
          pointsEarned: 0
        });
      }
    } catch (err) {
      console.error("Error syncing study time:", err);
    }
  };

  const startSession = () => setIsActive(true);
  const pauseSession = async () => {
    setIsActive(false);
    // Sync final session time
    const now = Date.now();
    const delta = Math.floor((now - lastSyncRef.current) / 1000);
    if (delta > 0) {
      await syncStudyTime(delta);
      lastSyncRef.current = now;
    }

    // Log individual session
    if (user && sessionTime > 0) {
      const sessionsRef = collection(db, 'users', user.uid, 'studySessions');
      await addDoc(sessionsRef, {
        date: new Date().toISOString().split('T')[0],
        duration: sessionTime,
        start: serverTimestamp(),
        end: serverTimestamp()
      });
    }
  };

  const resetSession = () => {
    setIsActive(false);
    setSessionTime(0);
  };

  return {
    isActive,
    sessionTime,
    totalTimeToday,
    startSession,
    pauseSession,
    resetSession,
    formatTime: (seconds: number) => {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;
      if (h > 0) return `${h}h ${m}m ${s}s`;
      return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
  };
};
