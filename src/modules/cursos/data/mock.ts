export interface Lesson {
  id: number;
  title: string;
  duration: string;
  videoUrl: string;
}

export const MOCK_COURSES = [
  {
    id: 1,
    title: 'Semiologia Médica Avançada',
    professor: 'Dr. Ricardo Mendes',
    duration: '12h 30m',
    thumbnail: 'https://picsum.photos/seed/semiology/400/250',
    description: 'Domine as técnicas de exame físico e anamnese com foco em raciocínio clínico.',
    lessons: [
      { id: 1, title: 'Introdução à Semiologia', duration: '15:00', videoUrl: '' },
      { id: 2, title: 'Exame Físico Geral', duration: '45:00', videoUrl: '' },
      { id: 3, title: 'Semiologia Cardiovascular', duration: '60:00', videoUrl: '' },
      { id: 4, title: 'Semiologia Respiratória', duration: '55:00', videoUrl: '' },
      { id: 5, title: 'Semiologia Abdominal', duration: '50:00', videoUrl: '' }
    ]
  },
  {
    id: 2,
    title: 'Farmacologia Clínica',
    professor: 'Dra. Helena Souza',
    duration: '20h 00m',
    thumbnail: 'https://picsum.photos/seed/pharma/400/250',
    description: 'Entenda a farmacocinética e farmacodinâmica aplicada à prática hospitalar.',
    lessons: [
      { id: 1, title: 'Farmacocinética Básica', duration: '30:00', videoUrl: '' },
      { id: 2, title: 'Antibioticoterapia', duration: '90:00', videoUrl: '' },
      { id: 3, title: 'Anti-inflamatórios', duration: '45:00', videoUrl: '' },
      { id: 4, title: 'Drogas Vasoativas', duration: '60:00', videoUrl: '' }
    ]
  },
  {
    id: 3,
    title: 'Emergências Médicas',
    professor: 'Dr. Paulo Rocha',
    duration: '15h 45m',
    thumbnail: 'https://picsum.photos/seed/emergency/400/250',
    description: 'Protocolos atualizados de ACLS, ATLS e manejo de crises agudas.',
    lessons: [
      { id: 1, title: 'Parada Cardiorrespiratória', duration: '45:00', videoUrl: '' },
      { id: 2, title: 'Choque e Reposição Volêmica', duration: '60:00', videoUrl: '' },
      { id: 3, title: 'Trauma de Tórax', duration: '50:00', videoUrl: '' },
      { id: 4, title: 'Emergências Hipertensivas', duration: '40:00', videoUrl: '' }
    ]
  }
];
