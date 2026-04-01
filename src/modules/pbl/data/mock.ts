export interface Module {
  id: string;
  title: string;
  description: string;
  cycle: 'basico' | 'clinico';
  problemsCount: number;
}

export const MOCK_MODULES: Module[] = [
  // Ciclo Básico
  {
    id: 'ase1',
    title: 'ASE 1: Introdução ao Estudo da Medicina',
    description: 'Fundamentos da prática médica, ética e o sistema de saúde.',
    cycle: 'basico',
    problemsCount: 3
  },
  {
    id: 'ase2',
    title: 'ASE 2: Proliferação, Alteração do Crescimento e Diferenciação Celular',
    description: 'Estudo do ciclo celular, oncogênese e processos de adaptação celular.',
    cycle: 'basico',
    problemsCount: 3
  },
  {
    id: 'ase3',
    title: 'ASE 3: Funções Biológicas 1',
    description: 'Estudo da fisiologia cardiovascular e respiratória.',
    cycle: 'basico',
    problemsCount: 3
  },
  {
    id: 'ase4',
    title: 'ASE 4: Funções Biológicas 2',
    description: 'Estudo da fisiologia renal e digestória.',
    cycle: 'basico',
    problemsCount: 3
  },
  {
    id: 'ase5',
    title: 'ASE 5: Metabolismo e Nutrição',
    description: 'Bioquímica clínica, metabolismo energético e distúrbios nutricionais.',
    cycle: 'basico',
    problemsCount: 3
  },
  {
    id: 'ase6',
    title: 'ASE 6: Mecanismo de Agressão e Defesa',
    description: 'Imunologia, microbiologia e parasitologia médica.',
    cycle: 'basico',
    problemsCount: 3
  },
  {
    id: 'ase7',
    title: 'ASE 7: Concepção, Formação do Ser Humano e Gestação',
    description: 'Embriologia, genética e fisiologia da gestação.',
    cycle: 'basico',
    problemsCount: 3
  },
  {
    id: 'ase8',
    title: 'ASE 8: Nascimento, Crescimento e Desenvolvimento da Criança e do Adolescente',
    description: 'Pediatria básica, neonatologia e marcos do desenvolvimento.',
    cycle: 'basico',
    problemsCount: 3
  },
  {
    id: 'ase9',
    title: 'ASE 9: Vida Adulta e Processo de Envelhecimento',
    description: 'Geriatria, fisiologia do envelhecimento e doenças crônicas.',
    cycle: 'basico',
    problemsCount: 3
  },
  {
    id: 'ase10',
    title: 'ASE 10: Percepção, Consciência e Emoções',
    description: 'Neurofisiologia, neuroanatomia e psiquiatria básica.',
    cycle: 'basico',
    problemsCount: 3
  },
  {
    id: 'ase11',
    title: 'ASE 11: Febre, Inflamação e Infecção',
    description: 'Fisiopatologia da febre, resposta inflamatória e doenças infecciosas.',
    cycle: 'basico',
    problemsCount: 3
  },
  {
    id: 'ase12',
    title: 'ASE 12: Fadiga, Perda de Peso e Anemias',
    description: 'Hematologia básica, metabolismo do ferro e abordagem ao paciente com fadiga.',
    cycle: 'basico',
    problemsCount: 3
  },
  // Ciclo Clínico
  {
    id: 'ase13',
    title: 'ASE 13: Disúria, Edema e Proteinúria',
    description: 'Nefrologia clínica e abordagem às doenças do trato urinário.',
    cycle: 'clinico',
    problemsCount: 3
  },
  {
    id: 'ase14',
    title: 'ASE 14: Perda de Sangue',
    description: 'Emergências hemorrágicas, coagulopatias e choque hipovolêmico.',
    cycle: 'clinico',
    problemsCount: 3
  },
  {
    id: 'ase15',
    title: 'ASE 15: Mente e Comportamento',
    description: 'Psiquiatria clínica, transtornos de humor e psicofarmacologia.',
    cycle: 'clinico',
    problemsCount: 3
  }
];
