import React, { useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile 
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../../services/firebase';
import { motion } from 'motion/react';
import { Mail, Lock, User, ArrowRight, Loader2, Network } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';

export const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await updateProfile(user, { displayName });

        // Create user document in Firestore
        await setDoc(doc(db, 'users', user.uid), {
          accessGranted: true,
          adm: false,
          birthday: "2001-09-29",
          ciclo: "Ciclo Básico",
          createdAt: serverTimestamp(),
          displayName: displayName,
          email: email,
          institution: null,
          invitesAvailable: 0,
          isBanned: false,
          isPremium: true, // Defaulting to premium as per user request for structure
          lastActiveDate: serverTimestamp(),
          medCourse: "MED3",
          photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + displayName,
          plan: "premium",
          points: 0,
          questionsToday: 0,
          role: "user",
          semester: "3",
          setupComplete: true,
          streak: 0,
          themePreference: "dark",
          totalAnswered: 0,
          totalCorrect: 0,
          totalErrors: 0,
          weeklyPoints: 0
        });
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-stretch bg-slate-950 text-white font-sans overflow-hidden">
      {/* Left Side: Visual/Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-blue-600 items-center justify-center overflow-hidden">
        {/* Abstract Network Background */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
            {/* Connection lines */}
            <line x1="10" y1="20" x2="40" y2="50" stroke="white" strokeWidth="0.2" />
            <line x1="40" y1="50" x2="80" y2="30" stroke="white" strokeWidth="0.2" />
            <line x1="80" y1="30" x2="60" y2="70" stroke="white" strokeWidth="0.2" />
            <line x1="60" y1="70" x2="20" y2="80" stroke="white" strokeWidth="0.2" />
            <line x1="20" y1="80" x2="10" y2="20" stroke="white" strokeWidth="0.2" />
          </svg>
        </div>
        
        {/* Floating Nodes */}
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 text-center"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 mb-8 shadow-2xl">
            <Network size={48} className="text-white" />
          </div>
          <h1 className="text-7xl font-black tracking-tighter mb-4">NexusBQ</h1>
          <p className="text-2xl font-medium text-blue-100 max-w-md mx-auto leading-relaxed">
            Conectando você ao conhecimento médico.
          </p>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-center text-blue-200/50 text-xs font-bold uppercase tracking-widest">
          <span>Nexus Platform v2.0</span>
          <span>© 2026 NexusBQ</span>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 bg-slate-950 relative">
        {/* Background glow */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="mb-12 text-center lg:text-left">
            <h2 className="text-4xl font-black tracking-tight mb-3">
              {isLogin ? 'Bem-vindo de volta' : 'Crie sua conta'}
            </h2>
            <p className="text-slate-400 font-medium">
              {isLogin 
                ? 'Acesse sua plataforma de estudos personalizada.' 
                : 'Comece sua jornada rumo à excelência médica.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Nome Completo</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600"
                    placeholder="Seu nome"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">E-mail</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Senha</label>
                {isLogin && (
                  <button type="button" className="text-xs font-bold text-blue-500 hover:text-blue-400 transition-colors">
                    Esqueceu a senha?
                  </button>
                )}
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder:text-slate-600"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm font-medium">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg shadow-xl shadow-blue-600/20 group"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <span className="flex items-center justify-center gap-2">
                  {isLogin ? 'Entrar na Plataforma' : 'Criar minha conta'}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-slate-400 font-medium hover:text-white transition-colors"
            >
              {isLogin ? (
                <>Não tem uma conta? <span className="text-blue-500 font-bold">Cadastre-se</span></>
              ) : (
                <>Já tem uma conta? <span className="text-blue-500 font-bold">Faça login</span></>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
