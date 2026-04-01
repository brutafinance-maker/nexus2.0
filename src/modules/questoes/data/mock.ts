export interface Question {
  id: number;
  text: string;
  options: string[];
  correctOption: number;
  module: string;
  theme: string;
}

export const MOCK_QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'Qual é o principal regulador do ciclo celular na fase G1?',
    options: ['Ciclina D', 'Ciclina B', 'p53', 'Caspase 3'],
    correctOption: 0,
    module: 'Crescimento Celular',
    theme: 'Biologia Celular'
  },
  {
    id: 2,
    text: 'Sobre a ética médica, qual princípio foca no bem-estar do paciente?',
    options: ['Autonomia', 'Beneficência', 'Não-maleficência', 'Justiça'],
    correctOption: 1,
    module: 'Introdução',
    theme: 'Ética'
  }
];
