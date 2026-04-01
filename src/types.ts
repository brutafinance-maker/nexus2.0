export type NavTab = 'dashboard' | 'pbl' | 'questoes' | 'morfo' | 'foco' | 'biblioteca' | 'habilidades' | 'cursos' | 'profile' | 'ranking';

export interface RankingUser {
  id: number;
  name: string;
  points: number;
  level: number;
}
