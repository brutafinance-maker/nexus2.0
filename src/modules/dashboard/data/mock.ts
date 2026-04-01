import { Timer, Flame, Trophy, HelpCircle, BookOpen, Timer as TimerIcon, Library } from 'lucide-react';
import { NavTab } from '../../../types';

export const PROGRESS_CARDS = [
  { label: 'Tempo de Estudo', value: '4h 20m', icon: Timer, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Streak Atual', value: '12 dias', icon: Flame, color: 'text-orange-600', bg: 'bg-orange-50' },
  { label: 'Pontos Nexus', value: '12.500', icon: Trophy, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Questões Hoje', value: '45/50', icon: HelpCircle, color: 'text-green-600', bg: 'bg-green-50' },
];

export const QUICK_ACTIONS = [
  { label: 'Ir para PBL', sub: 'Módulos e problemas', icon: BookOpen, tab: 'pbl' as NavTab, color: 'bg-blue-600' },
  { label: 'Resolver Questões', sub: 'Treine seus conhecimentos', icon: HelpCircle, tab: 'questoes' as NavTab, color: 'bg-indigo-600' },
  { label: 'Iniciar Foco', sub: 'Modo Pomodoro', icon: TimerIcon, tab: 'foco' as NavTab, color: 'bg-rose-600' },
  { label: 'Ver Biblioteca', sub: 'PDFs e resumos', icon: Library, tab: 'biblioteca' as NavTab, color: 'bg-emerald-600' },
];

export const RANKING_DATA = [
  { id: 1, name: 'Ana Silva', points: 12500 },
  { id: 2, name: 'Bruno Costa', points: 11200 },
  { id: 3, name: 'Carla Dias', points: 10800 },
  { id: 4, name: 'Daniel Oliveira', points: 9500 },
  { id: 5, name: 'Eduarda Santos', points: 8900 },
];
