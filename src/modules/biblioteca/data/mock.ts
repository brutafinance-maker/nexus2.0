export interface LibraryItem {
  id: number;
  title: string;
  type: 'PDF' | 'Resumo' | 'Vídeo';
  category: string;
  thumbnail: string;
}

export const MOCK_LIBRARY: LibraryItem[] = [
  { id: 1, title: 'Guia de Anatomia Humana', type: 'PDF', category: 'Anatomia', thumbnail: 'https://picsum.photos/seed/anatomy/200/300' },
  { id: 2, title: 'Resumo de Histologia', type: 'Resumo', category: 'Histologia', thumbnail: 'https://picsum.photos/seed/histo/200/300' },
  { id: 3, title: 'Embriologia Clínica', type: 'PDF', category: 'Embriologia', thumbnail: 'https://picsum.photos/seed/embryo/200/300' },
  { id: 4, title: 'Fisiologia Renal', type: 'Vídeo', category: 'Fisiologia', thumbnail: 'https://picsum.photos/seed/physio/200/300' },
  { id: 5, title: 'Semiologia Médica', type: 'PDF', category: 'Clínica', thumbnail: 'https://picsum.photos/seed/semi/200/300' },
  { id: 6, title: 'Farmacologia Básica', type: 'Resumo', category: 'Farmaco', thumbnail: 'https://picsum.photos/seed/pharma/200/300' }
];
