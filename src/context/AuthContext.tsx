import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  User, 
  signOut, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  serverTimestamp,
  onSnapshot,
  increment,
  collection,
  addDoc
} from 'firebase/firestore';
import { auth, db } from '../services/firebase';

export interface UserData {
  accessGranted: boolean;
  adm: boolean;
  birthday: string;
  ciclo: string;
  createdAt: any;
  displayName: string;
  email: string;
  institution: string | null;
  invitesAvailable: number;
  isBanned: boolean;
  isPremium: boolean;
  lastActiveDate: any;
  medCourse: string;
  photoURL: string;
  plan: string;
  points: number;
  questionsToday: number;
  role: string;
  semester: string;
  setupComplete: boolean;
  streak: number;
  studyTimeToday: number;
  themePreference: 'light' | 'dark';
  totalAnswered: number;
  totalCorrect: number;
  totalErrors: number;
  weeklyPoints: number;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  logout: () => Promise<void>;
  updateUserTheme: (theme: 'light' | 'dark') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Listen to user data in Firestore
        const userDocRef = doc(db, 'users', currentUser.uid);
        
        const unsubscribeData = onSnapshot(userDocRef, async (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data() as UserData;
            setUserData(data);
          } else {
            console.warn("User document not found in Firestore");
          }
          setLoading(false);
        });

        return () => unsubscribeData();
      } else {
        setUserData(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  const updateUserTheme = async (theme: 'light' | 'dark') => {
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        themePreference: theme
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, userData, loading, logout, updateUserTheme }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
