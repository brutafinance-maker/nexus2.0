export interface Skill {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  steps: string[];
  warnings: string[];
  checklist: string[];
  clinicalTips: string[];
  thumbnail: string;
}

export const MOCK_SKILLS: Skill[] = [
  {
    id: 1,
    title: 'Sutura Simples',
    description: 'Técnica básica de fechamento de feridas cutâneas.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    steps: [
      'Limpeza e antissepsia da ferida',
      'Anestesia local infiltrativa',
      'Escolha do fio adequado (ex: Nylon 4.0)',
      'Introdução da agulha a 90 graus',
      'Realização do nó de cirurgião'
    ],
    warnings: [
      'Evitar tensão excessiva nos bordos',
      'Não suturar feridas infectadas sem desbridamento',
      'Atenção à perfusão tecidual'
    ],
    checklist: [
      'Material completo na mesa',
      'Técnica asséptica mantida',
      'Bordos evertidos',
      'Simetria dos pontos'
    ],
    clinicalTips: [
      'O primeiro ponto deve ser no meio da ferida para melhor simetria.',
      'Use fios monofilamentares em áreas estéticas.'
    ],
    thumbnail: 'https://picsum.photos/seed/suture/400/250'
  },
  {
    id: 2,
    title: 'Acesso Venoso Periférico',
    description: 'Punção de veia periférica para administração de fluidos.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    steps: [
      'Garroteamento do membro',
      'Palpação e escolha da veia',
      'Antissepsia com álcool 70%',
      'Punção com o bisel para cima',
      'Visualização do refluxo e progressão do cateter'
    ],
    warnings: [
      'Não puncionar membros com fístulas',
      'Evitar articulações se possível',
      'Trocar o sítio a cada 72-96 horas'
    ],
    checklist: [
      'Identificação do paciente',
      'Escolha do calibre correto do Abocath',
      'Fixação adequada',
      'Teste de permeabilidade (flush)'
    ],
    clinicalTips: [
      'Peça ao paciente para abrir e fechar a mão para ingurgitar as veias.',
      'O calor local pode ajudar na vasodilatação.'
    ],
    thumbnail: 'https://picsum.photos/seed/iv/400/250'
  },
  {
    id: 3,
    title: 'Intubação Orotraqueal',
    description: 'Manejo avançado de via aérea.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    steps: [
      'Pré-oxigenação',
      'Posicionamento (coxim occipital)',
      'Laringoscopia direta',
      'Visualização das cordas vocais',
      'Passagem do tubo e insuflação do cuff'
    ],
    warnings: [
      'Sempre ter material de via aérea difícil à mão',
      'Monitorar saturação continuamente',
      'Cuidado com trauma dental'
    ],
    checklist: [
      'Laringoscópio testado',
      'Tubo com guia (stilet)',
      'Ausculta em 5 pontos após inserção',
      'Capnografia confirmada'
    ],
    clinicalTips: [
      'A manobra de BURP pode facilitar a visualização da glote.',
      'Não force o tubo se houver resistência.'
    ],
    thumbnail: 'https://picsum.photos/seed/intubation/400/250'
  }
];
