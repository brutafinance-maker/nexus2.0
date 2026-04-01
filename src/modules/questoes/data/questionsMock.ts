export type QuestionDifficulty = 'Fácil' | 'Médio' | 'Difícil';
export type QuestionType = 'Múltipla escolha' | 'Discursiva';

export interface Question {
  id: string;
  module: string; // ASE 1 to ASE 15
  problem?: string; // New: Problema 1, 2, 3...
  theme: string;
  difficulty: QuestionDifficulty;
  type: QuestionType;
  statement: string;
  options?: string[];
  correctOption?: number;
  comment: string;
}

export const MOCK_PBL_DATA: Record<string, Record<string, string[]>> = {
  'ASE 7': {
    'Problema 1': ['Embriogênese Inicial', 'Fecundação'],
    'Problema 2': ['Placentação', 'Anexos'],
    'Problema 3': [
      'Mecanismos Moleculares do Desenvolvimento',
      'Anexos Embrionários',
      'Sistema Urogenital',
      'Sistema Cardiovascular',
      'Mecanismos de Regulação e Maturação',
      'Introdução à Embriologia',
      'Sistema Respiratório',
      'Sistema Digestório',
      'Teratologia e Programação Fetal',
      'Sistema Musculoesquelético',
      'Desenvolvimento Inicial e Implantação',
      'Gastrulação e Destino dos Folhetos',
      'Sistema Nervoso Central',
      'Gastrulação e Dinâmica Celular',
      'Sistema Nervoso e Crista Neural',
      'Gastrulação e Indução',
      'Introdução e História',
      'Sistema Hematopoiético',
      'Sistema Endócrino',
      'Mecanismos de Regulação',
      'Desenvolvimento Inicial'
    ]
  }
};

export const MOCK_QUESTIONS: Question[] = [
  // ... existing questions
  {
    id: 'q1',
    module: 'ASE 1',
    theme: 'Introdução à Medicina',
    difficulty: 'Fácil',
    type: 'Múltipla escolha',
    statement: 'Qual é o principal objetivo da Atenção Primária à Saúde no Brasil?',
    options: [
      'Tratamento de doenças complexas',
      'Porta de entrada preferencial e ordenadora da rede',
      'Atendimento exclusivo em hospitais',
      'Realização de cirurgias de alta complexidade'
    ],
    correctOption: 1,
    comment: 'A Atenção Primária à Saúde (APS) é a porta de entrada preferencial do sistema e deve ordenar o fluxo dos usuários na rede de atenção.'
  },
  {
    id: 'q2',
    module: 'ASE 2',
    theme: 'Biologia Celular',
    difficulty: 'Médio',
    type: 'Múltipla escolha',
    statement: 'Durante a mitose, em qual fase os cromossomos se alinham na placa equatorial?',
    options: [
      'Prófase',
      'Metáfase',
      'Anáfase',
      'Telófase'
    ],
    correctOption: 1,
    comment: 'Na metáfase, os cromossomos atingem seu grau máximo de condensação e se alinham na região central da célula.'
  },
  {
    id: 'q3',
    module: 'ASE 3',
    theme: 'Fisiologia',
    difficulty: 'Difícil',
    type: 'Múltipla escolha',
    statement: 'Qual hormônio é responsável pela reabsorção de água nos túbulos coletores renais?',
    options: [
      'Aldosterona',
      'ADH (Vasopressina)',
      'Renina',
      'Angiotensina II'
    ],
    correctOption: 1,
    comment: 'O Hormônio Antidiurético (ADH) aumenta a permeabilidade dos túbulos coletores à água através da inserção de aquaporinas.'
  },
  {
    id: 'q4',
    module: 'ASE 5',
    theme: 'Metabolismo',
    difficulty: 'Médio',
    type: 'Múltipla escolha',
    statement: 'Qual é o principal produto final da glicólise aeróbica?',
    options: [
      'Lactato',
      'Piruvato',
      'Acetil-CoA',
      'Citrato'
    ],
    correctOption: 1,
    comment: 'Na glicólise, a glicose é convertida em duas moléculas de piruvato.'
  },
  {
    id: 'q5',
    module: 'ASE 13',
    theme: 'Nefrologia',
    difficulty: 'Médio',
    type: 'Múltipla escolha',
    statement: 'A presença de cilindros hemáticos no sedimento urinário é sugestiva de:',
    options: [
      'Cistite',
      'Glomerulonefrite',
      'Pielonefrite',
      'Uretrite'
    ],
    correctOption: 1,
    comment: 'Cilindros hemáticos indicam sangramento de origem glomerular.'
  },
  {
    id: 'q6',
    module: 'ASE 1',
    theme: 'Ética Médica',
    difficulty: 'Fácil',
    type: 'Discursiva',
    statement: 'Explique brevemente o princípio da autonomia na bioética.',
    comment: 'O princípio da autonomia refere-se ao direito do paciente de decidir sobre os tratamentos e intervenções em seu próprio corpo, desde que devidamente informado.'
  },
  {
    id: 'q7',
    module: 'ASE 10',
    theme: 'Neurologia',
    difficulty: 'Difícil',
    type: 'Múltipla escolha',
    statement: 'Qual área cerebral é primariamente responsável pela produção da fala?',
    options: [
      'Área de Wernicke',
      'Área de Broca',
      'Córtex Occipital',
      'Giro Pós-central'
    ],
    correctOption: 1,
    comment: 'A área de Broca, localizada no lobo frontal, é responsável pela expressão da linguagem.'
  },
  {
    id: 'q8',
    module: 'ASE 4',
    theme: 'Cardiologia',
    difficulty: 'Médio',
    type: 'Múltipla escolha',
    statement: 'O primeiro ruído cardíaco (B1) corresponde ao:',
    options: [
      'Fechamento das valvas semilunares',
      'Fechamento das valvas atrioventriculares',
      'Abertura das valvas atrioventriculares',
      'Enchimento ventricular rápido'
    ],
    correctOption: 1,
    comment: 'B1 ocorre no início da sístole ventricular e é causado pelo fechamento das valvas mitral e tricúspide.'
  },
  {
    id: 'q9',
    module: 'ASE 6',
    theme: 'Infectologia',
    difficulty: 'Fácil',
    type: 'Múltipla escolha',
    statement: 'Qual é o principal reservatório natural do vírus da Febre Amarela no ciclo silvestre?',
    options: [
      'Seres humanos',
      'Primatas não humanos',
      'Aves',
      'Roedores'
    ],
    correctOption: 1,
    comment: 'No ciclo silvestre da febre amarela, os primatas não humanos são os principais hospedeiros e reservatórios do vírus.'
  },
  {
    id: 'q10',
    module: 'ASE 7',
    theme: 'Ginecologia e Obstetrícia',
    difficulty: 'Médio',
    type: 'Múltipla escolha',
    statement: 'Onde ocorre normalmente a fecundação humana?',
    options: [
      'Útero',
      'Vagina',
      'Ampola da tuba uterina',
      'Ovário'
    ],
    correctOption: 2,
    comment: 'A fecundação ocorre geralmente na ampola da tuba uterina, a parte mais larga e longa da tuba.'
  },
  {
    id: 'q11',
    module: 'ASE 8',
    theme: 'Pediatria',
    difficulty: 'Fácil',
    type: 'Múltipla escolha',
    statement: 'Até que idade a OMS recomenda o aleitamento materno exclusivo?',
    options: [
      '4 meses',
      '6 meses',
      '1 ano',
      '2 anos'
    ],
    correctOption: 1,
    comment: 'A recomendação é de aleitamento materno exclusivo até os 6 meses de vida.'
  },
  {
    id: 'q12',
    module: 'ASE 9',
    theme: 'Geriatria',
    difficulty: 'Médio',
    type: 'Discursiva',
    statement: 'Cite três alterações fisiológicas comuns no sistema cardiovascular durante o envelhecimento.',
    comment: 'Algumas alterações incluem: aumento da rigidez arterial, hipertrofia ventricular esquerda leve e redução da frequência cardíaca máxima.'
  },
  {
    id: 'q13',
    module: 'ASE 11',
    theme: 'Infectologia',
    difficulty: 'Difícil',
    type: 'Múltipla escolha',
    statement: 'Qual é o mecanismo de ação principal das penicilinas?',
    options: [
      'Inibição da síntese proteica',
      'Inibição da síntese da parede celular',
      'Inibição da replicação do DNA',
      'Alteração da membrana citoplasmática'
    ],
    correctOption: 1,
    comment: 'As penicilinas agem inibindo a síntese de peptideoglicano, componente essencial da parede celular bacteriana.'
  },
  {
    id: 'q14',
    module: 'ASE 12',
    theme: 'Hematologia',
    difficulty: 'Médio',
    type: 'Múltipla escolha',
    statement: 'Qual é a principal causa de anemia ferropriva em homens adultos?',
    options: [
      'Baixa ingestão de ferro',
      'Má absorção intestinal',
      'Perda sanguínea crônica (geralmente TGI)',
      'Aumento da demanda metabólica'
    ],
    correctOption: 2,
    comment: 'Em homens adultos e mulheres pós-menopausa, a perda sanguínea crônica, especialmente pelo trato gastrointestinal, deve ser sempre investigada como causa de anemia ferropriva.'
  },
  {
    id: 'q15',
    module: 'ASE 15',
    theme: 'Psiquiatria',
    difficulty: 'Médio',
    type: 'Múltipla escolha',
    statement: 'Qual é o neurotransmissor primariamente associado ao sistema de recompensa cerebral?',
    options: [
      'Serotonina',
      'Dopamina',
      'GABA',
      'Glutamato'
    ],
    correctOption: 1,
    comment: 'A dopamina é o principal neurotransmissor envolvido nas vias de recompensa e prazer no cérebro.'
  },
  // ASE 7 - Problema 3 Questions
  {
    id: 'ase7-p3-q1',
    module: 'ASE 7',
    problem: 'Problema 3',
    theme: 'Mecanismos Moleculares do Desenvolvimento',
    difficulty: 'Difícil',
    type: 'Múltipla escolha',
    statement: 'Durante o estabelecimento do eixo dorsoventral no disco embrionário, a sinalização por BMP4 atua como um morfógeno crucial. Sobre a regulação desse processo, assinale a alternativa correta:',
    options: [
      'A alta concentração de BMP4 na região dorsal induz a formação do neuroectoderma.',
      'Moléculas como Cordina e Nogina, secretadas pelo nó primitivo, atuam como agonistas de BMP4 para promover a neuralização.',
      'O ectoderma ventral (futura epiderme) é especificado por baixas concentrações de BMP4.',
      'A crista neural é especificada em regiões de concentração intermediária de BMP4, na borda da placa neural.',
      'O ácido retinoico é o principal inibidor de BMP4 durante a indução neural primária.'
    ],
    correctOption: 3,
    comment: 'A crista neural surge na borda da placa neural, onde a concentração de BMP4 é intermediária (entre o zero do neuroectoderma e o alto da epiderme).'
  },
  {
    id: 'ase7-p3-q2',
    module: 'ASE 7',
    problem: 'Problema 3',
    theme: 'Anexos Embrionários',
    difficulty: 'Difícil',
    type: 'Múltipla escolha',
    statement: 'A pré-eclampsia é descrita como uma doença decorrente de falha na implantação placentária. Do ponto de vista embriológico, esse processo está diretamente ligado a:',
    options: [
      'Falha do citotrofoblasto viloso em diferenciar-se em sinciciotrofoblasto durante a 2ª semana.',
      'Invasão inadequada das artérias espirais pelo citotrofoblasto extravilo, mantendo vasos de alta resistência.',
      'Produção excessiva de hCG pelo sinciciotrofoblasto, causando hipertireoidismo gestacional.',
      'Ausência de fechamento do ducto venoso, sobrecarregando a circulação materna.',
      'Destruição excessiva da camada muscular lisa das artérias uterinas, causando hipotensão placentária.'
    ],
    correctOption: 1,
    comment: 'O citotrofoblasto extravilo deve invadir e destruir a camada muscular das artérias espirais maternas, tornando-as vasos de baixa resistência. A falha nesse processo gera hipóxia placentária e hipertensão materna.'
  },
  {
    id: 'ase7-p3-q3',
    module: 'ASE 7',
    problem: 'Problema 3',
    theme: 'Sistema Urogenital',
    difficulty: 'Médio',
    type: 'Múltipla escolha',
    statement: 'Um feto com cariótipo 46,XY apresenta uma mutação que inativa os receptores de testosterona (Síndrome de Insensibilidade aos Andrógenos). Apesar disso, o testículo fetal produz AMH (Hormônio Antimülleriano) normalmente. Qual será o fenótipo esperado ao nascimento para a genitália interna e externa, respectivamente?',
    options: [
      'Presença de útero e tubas; genitália externa feminina.',
      'Ausência de útero e tubas; genitália externa feminina.',
      'Presença de ductos deferentes e epidídimo; genitália externa ambígua.',
      'Ausência de útero e tubas; genitália externa masculina.',
      'Presença de útero e tubas; genitália externa masculina.'
    ],
    correctOption: 1,
    comment: 'Sem receptor de andrógenos, a testosterona não age e a genitália externa segue a via padrão (feminina). Como há AMH, os ductos de Müller regridem, então a genitália interna também não é feminina.'
  },
  {
    id: 'ase7-p3-q4',
    module: 'ASE 7',
    problem: 'Problema 3',
    theme: 'Sistema Cardiovascular',
    difficulty: 'Difícil',
    type: 'Múltipla escolha',
    statement: 'A Tetralogia de Fallot é uma cardiopatia complexa que envolve quatro anomalias anatômicas. O evento embriológico primário que unifica essa patologia é:',
    options: [
      'Falha no fechamento do forame oval por excesso de apoptose no septum primum.',
      'Divisão desigual do tronco arterioso devido ao deslocamento anterior do septo infundibular (troncoconal).',
      'Persistência do ducto arterioso após o nascimento por baixa PO2.',
      'Falha na rotação de 270º do coração primitivo durante a 4ª semana.',
      'Ausência de formação das almofadas endocárdicas na transição atrioventricular.'
    ],
    correctOption: 1,
    comment: 'O deslocamento anterior do septo infundibular gera uma cascata: o septo não se alinha com o interventricular (gerando CIV), a aorta fica "a cavaleiro" e a via de saída do VD fica estreitada (estenose pulmonar), levando à hipertrofia do VD.'
  },
  {
    id: 'ase7-p3-q5',
    module: 'ASE 7',
    problem: 'Problema 3',
    theme: 'Mecanismos de Regulação e Maturação',
    difficulty: 'Médio',
    type: 'Múltipla escolha',
    statement: 'O cortisol fetal é fundamental no terceiro trimestre. Qual dos seguintes mecanismos de retroalimentação (feedback) é exclusivo da unidade fetoplacentária humana e crucial para o início do parto?',
    options: [
      'O cortisol fetal inibe a produção de CRH pela placenta.',
      'O cortisol fetal estimula a produção de progesterona pelo corpo lúteo.',
      'O cortisol fetal estimula a produção de CRH placentário, criando uma cascata de retroalimentação positiva.',
      'O cortisol fetal inibe a expressão de receptores de ocitocina no miométrio.',
      'A insulina fetal inibe a síntese de cortisol para priorizar o anabolismo.'
    ],
    correctOption: 2,
    comment: 'No eixo adulto o cortisol inibe o CRH, mas na placenta humana ele estimula, sendo uma exceção biológica. O aumento do cortisol fetal dispara mais CRH placentário, que dispara mais cortisol, culminando na maturação pulmonar e início das contrações.'
  },
  {
    id: 'ase7-p3-q6',
    module: 'ASE 7',
    problem: 'Problema 3',
    theme: 'Introdução à Embriologia',
    difficulty: 'Médio',
    type: 'Múltipla escolha',
    statement: 'A história da embriologia foi marcada pelo embate entre o preformacionismo e a epigênese. Karl Ernst von Baer, no século XIX, estabeleceu leis que fundamentam a embriologia comparada moderna. Sobre os conceitos históricos e as Leis de Von Baer, assinale a alternativa correta:',
    options: [
      'O preformacionismo defendia que o embrião se desenvolvia a partir de uma massa amorfa que ganhava forma gradualmente.',
      'Von Baer demonstrou que as características específicas de uma espécie aparecem no embrião antes das características gerais do grupo (ex: filo).',
      'A "Lei da Biogenética" de Haeckel, que afirma que a ontogenia recapitula a filogenia, é uma interpretação estrita e validada das leis de Von Baer.',
      'Von Baer propôs que os embriões de formas "superiores" nunca passam pelos estágios adultos de formas "inferiores", mas apenas se assemelham aos seus embriões.',
      'A teoria da epigênese foi proposta inicialmente por Antonie van Leeuwenhoek após a invenção do microscópio.'
    ],
    correctOption: 3,
    comment: 'Esta é a essência do pensamento de Von Baer: o embrião humano assemelha-se ao embrião de peixe, mas não ao peixe adulto.'
  },
  {
    id: 'ase7-p3-q7',
    module: 'ASE 7',
    problem: 'Problema 3',
    theme: 'Sistema Respiratório',
    difficulty: 'Difícil',
    type: 'Múltipla escolha',
    statement: 'Um recém-nascido prematuro de 25 semanas apresenta desconforto respiratório grave (Síndrome da Angústia Respiratória). Com base na cronologia do desenvolvimento pulmonar, a causa fisiopatológica primária e o estágio de desenvolvimento correspondente são:',
    options: [
      'Deficiência de surfactante por pneumócitos tipo I; estágio pseudoglandular.',
      'Falha na formação dos alvéolos definitivos; estágio alveolar.',
      'Barreira alvéolo-capilar espessa e falta de surfactante; estágio canalicular.',
      'Ausência de divisão do septo traqueoesofágico; estágio embrionário.',
      'Hipoplasia pulmonar por compressão externa; estágio sacular.'
    ],
    correctOption: 2,
    comment: 'Aos 25 semanas, o feto está no estágio canalicular (16-26 sem). Nele, os lúmens aumentam e o tecido torna-se vascularizado, mas a barreira ainda é espessa e a produção de surfactante pelos pneumócitos II está apenas começando, sendo insuficiente.'
  },
  {
    id: 'ase7-p3-q8',
    module: 'ASE 7',
    problem: 'Problema 3',
    theme: 'Sistema Digestório',
    difficulty: 'Difícil',
    type: 'Múltipla escolha',
    statement: 'Durante a 6ª semana, o intestino médio sofre uma herniação fisiológica para o cordão umbilical. Sobre os movimentos de rotação e retorno dessa alça intestinal para a cavidade abdominal, assinale a alternativa que descreve corretamente o processo:',
    options: [
      'A alça intestinal rotaciona um total de 90º no sentido horário em torno da artéria mesentérica inferior.',
      'O retorno das alças ocorre na 10ª semana, com uma rotação adicional de 180º no sentido anti-horário.',
      'O ceco é a primeira estrutura a retornar para a cavidade abdominal, alojando-se no quadrante superior esquerdo.',
      'A falha no retorno das alças intestinais para a cavidade, permanecendo cobertas por âmnio, caracteriza a Gastrosquise.',
      'A artéria celíaca serve como o eixo central de rotação para todo o intestino posterior.'
    ],
    correctOption: 1,
    comment: 'O processo total soma 270º (90º na herniação + 180º no retorno), sempre no sentido anti-horário.'
  },
  {
    id: 'ase7-p3-q9',
    module: 'ASE 7',
    problem: 'Problema 3',
    theme: 'Teratologia e Programação Fetal',
    difficulty: 'Difícil',
    type: 'Múltipla escolha',
    statement: 'A Hipótese de Barker sugere que insultos nutricionais durante períodos críticos do desenvolvimento resultam em mudanças permanentes na fisiologia, aumentando o risco de doenças crônicas no adulto. Esse conceito é regido pelos princípios da Teratologia. Sobre esses princípios, analise:',
    options: [
      'O estágio de desenvolvimento no momento da exposição (período crítico) é irrelevante se a dose do teratógeno for extremamente alta.',
      'A manifestação final do desenvolvimento anormal pode ser morte, malformação, retardo do crescimento ou deficiência funcional.',
      'O genótipo da mãe é o único fator determinante da susceptibilidade ao agente teratogênico, independente do genótipo fetal.',
      'Agentes teratogênicos atuam de forma genérica em todos os tecidos, sem mecanismos patogênicos específicos.',
      'A placenta atua como uma barreira absoluta contra qualquer agente químico ou biológico (TORCH).'
    ],
    correctOption: 1,
    comment: 'Este é um dos 6 princípios fundamentais de James Wilson (1973).'
  },
  {
    id: 'ase7-p3-q10',
    module: 'ASE 7',
    problem: 'Problema 3',
    theme: 'Sistema Musculoesquelético',
    difficulty: 'Médio',
    type: 'Múltipla escolha',
    statement: 'A segmentação do mesoderma paraxial em somitos é um processo rítmico controlado pelo "relógio de segmentação". Sobre a diferenciação dos somitos e sua regulação, assinale a correta:',
    options: [
      'Cada somito se divide em esclerótomo (que origina a derme) e dermomiótomo (que origina os ossos).',
      'Os genes Hox (Homeobox) determinam a identidade regional dos somitos ao longo do eixo anteroposterior.',
      'A via de sinalização Notch é responsável apenas pela apoptose das células entre os somitos.',
      'As vértebras são formadas pela fusão simples de um esclerótomo inteiro com o esclerótomo subjacente.',
      'O mesoderma lateral dá origem à musculatura axial (do dorso).'
    ],
    correctOption: 1,
    comment: 'A expressão combinatória dos genes Hox (código Hox) especifica se um somito formará uma vértebra cervical, torácica, etc.'
  },
  {
    id: 'ase7-p3-q11',
    module: 'ASE 7',
    problem: 'Problema 3',
    theme: 'Desenvolvimento Inicial e Implantação',
    difficulty: 'Difícil',
    type: 'Múltipla escolha',
    statement: 'Para que o blastocisto realize a nidação no endométrio secretor, ele deve primeiro livrar-se de uma barreira acelular rígida. Sobre esse processo e a sinalização inicial, assinale a alternativa correta:',
    options: [
      'A eclosão (hatching) ocorre devido à secreção de estrógenos pelo trofoblasto, que digerem a membrana pelúcida.',
      'A zona pelúcida impede a implantação prematura (tópica) na tuba uterina; sua degradação é mediada por proteases como a estrepsina.',
      'O blastocisto implanta-se preferencialmente no polo abembrionário, onde a concentração de integrinas é menor.',
      'A Reação Decidual ocorre antes mesmo do contato do blastocisto com o endométrio, sendo mediada exclusivamente por progesterona de origem placentária.',
      'O citotrofoblasto é a camada externa multinucleada que perde suas membranas celulares para invadir o estroma uterino.'
    ],
    correctOption: 1,
    comment: 'A zona pelúcida impede que o blastocisto "grude" na tuba (evitando gravidez ectópica tubária). A eclosão ocorre no útero para expor os receptores de adesão.'
  },
  {
    id: 'ase7-p3-q12',
    module: 'ASE 7',
    problem: 'Problema 3',
    theme: 'Gastrulação e Destino dos Folhetos',
    difficulty: 'Difícil',
    type: 'Múltipla escolha',
    statement: 'O mesoderma lateral divide-se em duas camadas, criando o celoma intraembrionário. Uma falha no fechamento da parede ventral do corpo, resultando em órgãos abdominais expostos sem cobertura de membrana (exceto peritônio visceral), está ligada ao desenvolvimento de qual camada?',
    options: [
      'Mesoderma paraxial (esclerótomo).',
      'Mesoderma intermediário (crista urogenital).',
      'Mesoderma somático (parietal) junto com o ectoderma sobrejacente.',
      'Mesoderma esplâncnico (visceral) junto com o endoderma.',
      'Endoderma do saco vitelino.'
    ],
    correctOption: 2,
    comment: 'O mesoderma somático forma as paredes laterais e ventral do corpo. Falhas nesse fechamento levam a ectopia cordis, gastrosquise ou extrofia vesical.'
  },
  {
    id: 'ase7-p3-q13',
    module: 'ASE 7',
    problem: 'Problema 3',
    theme: 'Sistema Nervoso Central',
    difficulty: 'Difícil',
    type: 'Múltipla escolha',
    statement: 'A holoprosencefalia é uma malformação grave onde há falha na divisão do prosencéfalo em dois hemisférios cerebrais. Este defeito está frequentemente associado a mutações na via de sinalização:',
    options: [
      'Wnt/Beta-catenina.',
      'Notch/Delta.',
      'Sonic Hedgehog (Shh).',
      'FGF-8.',
      'BMP-4.'
    ],
    correctOption: 2,
    comment: 'Sonic Hedgehog (Shh) é secretado pela notocorda e pela placa do assoalho para ventralizar o tubo neural e induzir a divisão do campo ocular e telencefálico em dois. A falta de Shh causa ciclopia e holoprosencefalia.'
  },
  {
    id: 'ase7-p3-q14',
    module: 'ASE 7',
    problem: 'Problema 3',
    theme: 'Sistema Urogenital',
    difficulty: 'Difícil',
    type: 'Múltipla escolha',
    statement: 'A formação do rim definitivo (metanefro) depende de uma indução recíproca entre duas estruturas. Se o broto uretérico falhar em ramificar-se ou em contatar o tecido alvo, o resultado clínico será a agenesia renal. Quais são as estruturas envolvidas e seus respectivos derivados?',
    options: [
      'Broto uretérico (origina os néfrons) e blastema metanéfrico (origina os cálices).',
      'Ducto de Wolff (origina a bexiga) e alantoide (origina os ureteres).',
      'Broto uretérico (origina o sistema coletor: ureter, pelve, cálices) e blastema metanéfrico (origina o sistema excretor: néfrons).',
      'Pronefro (origina os néfrons) e mesonefro (origina o ureter).',
      'Endoderma da cloaca (origina os glomérulos) e mesoderma paraxial (origina o bacinete).'
    ],
    correctOption: 2,
    comment: 'O Broto Uretérico (evaginação do ducto mesonéfrico) forma a "árvore coletora". O Blastema Metanéfrico (mesoderma) forma as "fábricas de urina" (néfrons). Um depende do outro para se diferenciar.'
  },
  {
    id: 'ase7-p3-q15',
    module: 'ASE 7',
    problem: 'Problema 3',
    theme: 'Sistema Cardiovascular',
    difficulty: 'Médio',
    type: 'Múltipla escolha',
    statement: 'Ao nascimento, a transição da circulação fetal para a neonatal envolve o fechamento de três shunts fisiológicos. Sobre a sequência e a causa desses fechamentos, assinale a alternativa correta:',
    options: [
      'O forame oval fecha-se devido à queda da pressão no átrio esquerdo após a primeira respiração.',
      'O ducto arterioso fecha-se funcionalmente nas primeiras horas de vida devido ao aumento da PO2 arterial e queda das prostaglandinas.',
      'O ducto venoso permanece aberto para garantir que o sangue do trato digestório chegue rapidamente à veia cava inferior.',
      'A contração do esfíncter do ducto venoso é mediada pelo aumento súbito de cortisol materno durante o parto.',
      'O ligamento redondo do fígado é o remanescente anatômico das artérias umbilicais.'
    ],
    correctOption: 1,
    comment: 'O aumento de oxigênio no sangue arterial pós-natal inibe as prostaglandinas E2 (que mantinham o ducto aberto), causando contração da musculatura lisa do ducto.'
  },
  {
    id: 'ase7-p3-q16',
    module: 'ASE 7',
    problem: 'Problema 3',
    theme: 'Desenvolvimento Inicial',
    difficulty: 'Médio',
    type: 'Múltipla escolha',
    statement: 'Durante a primeira semana do desenvolvimento, o zigoto sofre sucessivas divisões mitóticas denominadas clivagem. Sobre as características biofísicas e genéticas desse processo, assinale a alternativa correta:',
    options: [
      'Durante a clivagem, o volume total da massa citoplasmática aumenta exponencialmente a cada divisão.',
      'As células resultantes (blastômeros) tornam-se progressivamente menores, pois não há crescimento celular entre as divisões.',
      'A ativação do genoma zigótico ocorre imediatamente após a fusão dos pronúcleos, cessando a dependência de mRNAs maternos.',
      'A compactação dos blastômeros é mediada pela perda de moléculas de adesão, como a E-caderina, facilitando a migração.',
      'A zona pelúcida é degradada logo na primeira divisão para permitir o aumento do diâmetro da mórula.'
    ],
    correctOption: 1,
    comment: 'Como não há fase de crescimento G1 e G2 prolongada entre as mitoses, o citoplasma original do zigoto é subdividido em células cada vez menores.'
  },
  {
    id: 'ase7-p3-q17',
    module: 'ASE 7',
    problem: 'Problema 3',
    theme: 'Gastrulação e Dinâmica Celular',
    difficulty: 'Difícil',
    type: 'Múltipla escolha',
    statement: 'A gastrulação é o evento morfogenético mais importante da 3ª semana. Para que as células do epiblasto migrem através da linha primitiva e formem o mesoderma e o endoderma, elas devem sofrer uma Transição Epitélio-Mesenquimal (TEM). Esse processo é caracterizado molecularmente por:',
    options: [
      'Aumento da expressão de E-caderina para fortalecer a união entre as células migrantes.',
      'Regulação positiva (up-regulation) de genes como Snail e Slug, que reprimem a expressão de caderinas epiteliais.',
      'Transformação de células mesenquimais em células epiteliais colunares altamente polarizadas.',
      'Inibição da via de sinalização FGF-8 pelo nó primitivo.',
      'Estabilização da lâmina basal para impedir a invasão celular no espaço hipoblástico.'
    ],
    correctOption: 1,
    comment: 'Os fatores de transcrição Snail e Slug (induzidos por FGF-8) reprimem a E-caderina, permitindo que as células percam a polaridade epitelial e ganhem mobilidade mesenquimal (pseudópodes).'
  },
  {
    id: 'ase7-p3-q18',
    module: 'ASE 7',
    problem: 'Problema 3',
    theme: 'Sistema Nervoso e Crista Neural',
    difficulty: 'Médio',
    type: 'Múltipla escolha',
    statement: 'As células da crista neural são frequentemente chamadas de "quarto folheto germinativo" devido à sua multipotencialidade. Qual das seguintes estruturas tem sua origem exclusivamente ou predominantemente ligada a essas células?',
    options: [
      'Astrócitos e oligodendrócitos do Sistema Nervoso Central.',
      'Músculo estriado esquelético dos membros superiores.',
      'Melanócitos, gânglios sensitivos cranianos e medula da glândula suprarrenal.',
      'Epitélio de revestimento da bexiga e uretra.',
      'Córtex da glândula suprarrenal e parênquima renal.'
    ],
    correctOption: 2,
    comment: 'A crista neural origina o SNP (gânglios), células pigmentares (melanócitos) e a medula adrenal (neurônios modificados).'
  },
  {
    id: 'ase7-p3-q19',
    module: 'ASE 7',
    problem: 'Problema 3',
    theme: 'Sistema Digestório',
    difficulty: 'Difícil',
    type: 'Múltipla escolha',
    statement: 'O pâncreas origina-se de dois brotos (ventral e dorsal) do endoderma do intestino anterior. Uma anomalia clínica conhecida como Pâncreas Anular ocorre devido a:',
    options: [
      'Falha na diferenciação das células beta das ilhotas de Langerhans por mutação no gene PDX1.',
      'Fusão prematura dos brotos pancreáticos antes da rotação do estômago.',
      'Migração do broto pancreático ventral em direções opostas, circundando e comprimindo o duodeno.',
      'Permanência do pâncreas dentro do cordão umbilical durante a herniação fisiológica.',
      'Inversão da posição do pâncreas com o baço durante a rotação do grande omento.'
    ],
    correctOption: 2,
    comment: 'O broto ventral é bífido. Se as duas partes migrarem em direções opostas ao redor do duodeno para encontrar o broto dorsal, elas formam um anel de tecido pancreático que pode causar obstrução duodenal.'
  },
  {
    id: 'ase7-p3-q20',
    module: 'ASE 7',
    problem: 'Problema 3',
    theme: 'Sistema Respiratório',
    difficulty: 'Difícil',
    type: 'Múltipla escolha',
    statement: 'O divertículo respiratório aparece na 4ª semana como uma evaginação da parede ventral do intestino anterior. A separação definitiva entre a traqueia e o esôfago depende do crescimento do septo traqueoesofágico. A falha nesse processo resulta frequentemente na associação VACTERL. Sobre a fístula traqueoesofágica (FTE) mais comum, assinale a alternativa que a descreve corretamente:',
    options: [
      'Atresia do esôfago proximal e comunicação do segmento distal do esôfago com a traqueia.',
      'Comunicação direta entre o esôfago proximal e a laringe, sem atresia.',
      'Ausência completa de formação da traqueia (agenesia traqueal).',
      'Atresia da traqueia com esôfago pérvio e funcional.',
      'Comunicação entre o brônquio principal esquerdo e o estômago.'
    ],
    correctOption: 0,
    comment: 'Este é o tipo mais frequente (85-90% dos casos). O bebê apresenta salivação excessiva, tosse e cianose ao tentar amamentar, pois o leite para no fundo cego do esôfago e o ar entra no estômago pela fístula distal.'
  },
  {
    id: 'ase7-p3-q21',
    module: 'ASE 7',
    problem: 'Problema 3',
    theme: 'Anexos Embrionários',
    difficulty: 'Difícil',
    type: 'Múltipla escolha',
    statement: 'O volume de líquido amniótico (LA) é um indicador crítico do bem-estar fetal. A partir do segundo trimestre, a principal fonte de produção e a principal via de reabsorção do LA são, respectivamente:',
    options: [
      'Secreção pelo epitélio amniótico e deglutição fetal.',
      'Urina fetal e deglutição fetal.',
      'Transudação do sangue materno e absorção pela pele fetal (queratinizada).',
      'Urina fetal e transporte intramembranoso (vasos da face fetal da placenta).',
      'Secreção pulmonar e micção fetal.'
    ],
    correctOption: 1,
    comment: 'A partir da 16ª-20ª semana, o rim fetal começa a funcionar, e a urina fetal torna-se o principal constituinte do LA. Para manter o equilíbrio (homeostase), o feto deglute o líquido, que é absorvido pelo seu trato digestório.'
  },
  {
    id: 'ase7-p3-q22',
    module: 'ASE 7',
    problem: 'Problema 3',
    theme: 'Sistema Urogenital',
    difficulty: 'Médio',
    type: 'Múltipla escolha',
    statement: 'No desenvolvimento do sistema genital feminino, a ausência de testosterona e de Hormônio Antimülleriano (AMH) resulta em mudanças estruturais definitivas. Assinale a alternativa que descreve corretamente esse processo:',
    options: [
      'Os ductos de Wolff (mesonéfricos) persistem e formam o útero e a vagina superior.',
      'Os ductos de Müller (paramesonéfricos) regridem sob influência do estrógeno materno.',
      'As porções distais dos ductos paramesonéfricos fundem-se para formar o primórdio útero-vaginal.',
      'Os ductos mesonéfricos dão origem às tubas uterinas após a apoptose do blastema metanéfrico.',
      'O tubérculo genital regride completamente, formando o hímen.'
    ],
    correctOption: 2,
    comment: 'A fusão dos ductos paramesonéfricos na linha média forma o útero e a parte superior da vagina. As partes não fundidas formam as tubas uterinas.'
  },
  {
    id: 'ase7-p3-q23',
    module: 'ASE 7',
    problem: 'Problema 3',
    theme: 'Sistema Cardiovascular',
    difficulty: 'Difícil',
    type: 'Múltipla escolha',
    statement: 'O estabelecimento da assimetria esquerda-direita é fundamental para o dobramento (looping) correto do coração. Pacientes com Situs Inversus total podem apresentar o coração voltado para a direita (dextrocardia). Molecularmente, esse processo de lateralidade inicial depende de:',
    options: [
      'Um fluxo de fluido mediado por cílios no nó primitivo, que concentra a proteína Nodal no lado esquerdo.',
      'Alta expressão de Shh no lado direito para repelir o átrio primitivo.',
      'Inibição da via Wnt pelo mesoderma paraxial direito.',
      'Secreção de surfactante cardíaco que altera a tensão superficial do tubo endocárdico.',
      'Expressão exclusiva de genes Hox na região cranial do campo cardiogênico.'
    ],
    correctOption: 0,
    comment: 'Cílios móveis no nó primitivo giram e criam um fluxo nodal para a esquerda. Isso concentra moléculas como Nodal e Lefty-2 no lado esquerdo, ativando o gene mestre de lateralidade PITX2.'
  },
  {
    id: 'ase7-p3-q24',
    module: 'ASE 7',
    problem: 'Problema 3',
    theme: 'Gastrulação e Indução',
    difficulty: 'Médio',
    type: 'Múltipla escolha',
    statement: 'A notocorda é uma estrutura celular transitória, mas com papel indutor fundamental na 3ª e 4ª semanas. Sobre suas funções e destino final, é correto afirmar:',
    options: [
      'Ela origina a medula espinhal através da diferenciação direta de suas células em neurônios.',
      'Atua como o centro sinalizador primário para a indução do ectoderma sobrejacente em placa neural.',
      'Desaparece completamente antes do nascimento, sem deixar remanescentes anatômicos.',
      'Origina os corpos vertebrais das vértebras cervicais e torácicas.',
      'Sua principal função é secretar hCG para manter o corpo lúteo gravídico.'
    ],
    correctOption: 1,
    comment: 'Ela secreta fatores (Nogina, Cordina) que bloqueiam o BMP4 no ectoderma acima dela, permitindo a neuralização.'
  },
  {
    id: 'ase7-p3-q25',
    module: 'ASE 7',
    problem: 'Problema 3',
    theme: 'Sistema Digestório',
    difficulty: 'Difícil',
    type: 'Múltipla escolha',
    statement: 'A porção terminal do intestino posterior deságua na cloaca, que é posteriormente dividida pelo septo urorretal. Uma falha nessa septação ou na perfuração das membranas relacionadas pode gerar anomalias. Sobre isso, assinale a alternativa correta:',
    options: [
      'O septo urorretal divide a cloaca em seio urogenital (dorsal) e canal anal (ventral).',
      'A membrana anal rompe-se normalmente na 4ª semana para permitir a passagem do mecônio.',
      'O megacólon congênito (Doença de Hirschsprung) é causado pela falha na migração de células da crista neural para a parede do intestino.',
      'A fístula retovaginal decorre de uma hipertrofia do septo urorretal.',
      'O proctodeu (foveola anal) tem origem endodérmica, assim como o restante do intestino posterior.'
    ],
    correctOption: 2,
    comment: 'As células da crista neural devem migrar para formar os plexos de Meissner e Auerbach. Se elas não chegarem ao reto/sigmoide, o segmento fica sem peristaltismo, causando obstrução (megacólon).'
  },
  {
    id: 'ase7-p3-q26',
    module: 'ASE 7',
    problem: 'Problema 3',
    theme: 'Introdução e História',
    difficulty: 'Difícil',
    type: 'Múltipla escolha',
    statement: 'Karl Ernst von Baer é amplamente reconhecido como o "pai da embriologia moderna". Entre suas contribuições mais significativas, destaca-se a descoberta do óvulo dos mamíferos em 1827. Sobre as Leis de Von Baer e sua importância teórica, assinale a alternativa correta:',
    options: [
      'Von Baer propôs que o embrião de um animal superior passa por todos os estágios adultos de animais inferiores de seu grupo.',
      'Ele demonstrou que as características gerais de um grupo animal aparecem mais tarde no desenvolvimento do que as características especializadas da espécie.',
      'Suas descobertas sobre as camadas germinativas fundamentaram a compreensão de que todos os tecidos derivam de folhetos primordiais comuns.',
      'Von Baer foi o principal defensor do preformacionismo, utilizando a descoberta do óvulo para provar a existência do homúnculo.',
      'Ele estabeleceu que a gastrulação é o primeiro evento funcional do embrião, ocorrendo antes da fecundação.'
    ],
    correctOption: 2,
    comment: 'Ao descrever as camadas germinativas (ectoderma, mesoderma, endoderma), ele estabeleceu o pilar central da embriologia: a origem comum dos tecidos.'
  },
  {
    id: 'ase7-p3-q27',
    module: 'ASE 7',
    problem: 'Problema 3',
    theme: 'Desenvolvimento Inicial',
    difficulty: 'Médio',
    type: 'Múltipla escolha',
    statement: 'A entrada de mais de um espermatozoide no ovócito (polispermia) resultaria em um embrião com múltiplos conjuntos cromossômicos, o que é letal. Para evitar isso, o ovócito humano utiliza dois mecanismos principais. Sobre a Reação Cortical (Bloqueio Lento), é correto afirmar que:',
    options: [
      'É mediada por uma mudança elétrica imediata no potencial da membrana plasmática que dura apenas alguns segundos.',
      'Consiste na liberação de enzimas dos grânulos corticais que inativam os receptores de espermatozoides e endurecem a zona pelúcida.',
      'Ocorre exclusivamente na corona radiata, impedindo que os espermatozoides alcancem a zona pelúcida.',
      'É um processo reversível que permite a fertilização por um segundo espermatozoide após 24 horas.',
      'Depende da secreção de progesterona pelas células da teca para estabilizar a membrana vitelina.'
    ],
    correctOption: 1,
    comment: 'A reação cortical envolve a liberação de grânulos que alteram a química da zona pelúcida ("reação de zona"), tornando-a impenetrável de forma permanente.'
  },
  {
    id: 'ase7-p3-q28',
    module: 'ASE 7',
    problem: 'Problema 3',
    theme: 'Sistema Hematopoiético',
    difficulty: 'Difícil',
    type: 'Múltipla escolha',
    statement: 'A hematopoiese no feto humano é um processo dinâmico que "migra" entre diferentes órgãos ao longo da gestação. De acordo com a cronologia correta desse desenvolvimento, qual é o principal órgão responsável pela produção de células sanguíneas entre a 6ª semana e o início do 3º trimestre?',
    options: [
      'Saco vitelínico, produzindo exclusivamente eritrócitos nucleados.',
      'Medula óssea, que assume o protagonismo logo após o fechamento do tubo neural.',
      'Baço, que é o órgão dominante durante todo o período embrionário.',
      'Fígado, que atua como o centro hematopoiético primário nesse intervalo.',
      'Timo, onde ocorre a diferenciação de todas as linhagens mieloides e linfoides.'
    ],
    correctOption: 3,
    comment: 'O fígado é o principal órgão hematopoiético do feto durante a maior parte do período fetal inicial e médio (6ª semana ao 3º trimestre).'
  },
  {
    id: 'ase7-p3-q29',
    module: 'ASE 7',
    problem: 'Problema 3',
    theme: 'Sistema Endócrino',
    difficulty: 'Difícil',
    type: 'Múltipla escolha',
    statement: 'A glândula hipófise possui uma origem embriológica dupla, resultando em lobos com características histológicas e funcionais distintas. Sobre essa formação, assinale a alternativa correta:',
    options: [
      'A neurohipófise deriva da Bolsa de Rathke, uma evaginação do ectoderma do teto da faringe primitiva.',
      'A adenohipófise origina-se de uma projeção caudal do neuroectoderma do diencéfalo.',
      'O craniofaringioma é um tumor que pode surgir de remanescentes epiteliais da Bolsa de Rathke ao longo de seu trajeto de migração.',
      'Ambos os lobos da hipófise derivam exclusivamente do mesoderma lateral esplâncnico induzido pela notocorda.',
      'A fusão dos dois primórdios hipofisários ocorre apenas após o nascimento, sob estímulo da ocitocina materna.'
    ],
    correctOption: 2,
    comment: 'O craniofaringioma é um tumor clássico derivado de restos epiteliais desse processo de evaginação da faringe primitiva.'
  },
  {
    id: 'ase7-p3-q30',
    module: 'ASE 7',
    problem: 'Problema 3',
    theme: 'Mecanismos de Regulação',
    difficulty: 'Difícil',
    type: 'Múltipla escolha',
    statement: 'A diferenciação de um zigoto totipotente em centenas de tipos celulares distintos ocorre sem alterações na sequência do DNA, sendo governada pelo epigenoma. Um dos mecanismos epigenéticos fundamentais é a metilação do DNA. Sobre este processo, é correto afirmar:',
    options: [
      'A adição de grupos metil às citosinas em ilhas CpG está geralmente associada à ativação da expressão gênica.',
      'Imediatamente após a fertilização, ocorre um apagamento global dos padrões de metilação herdados dos pais (reprogramação).',
      'A metilação das histonas H3ac e H4ac é o principal sinal para a formação da eucromatina aberta.',
      'O imprinting genômico é um processo de metilação que afeta ambos os alelos (paterno e materno) de forma idêntica e simétrica.',
      'A deficiência de folato na dieta materna aumenta a metilação global, protegendo o embrião de defeitos do tubo neural.'
    ],
    correctOption: 1,
    comment: 'Para permitir a totipotência do zigoto e o novo desenvolvimento, os padrões epigenéticos dos pais são "limpos" e reconstruídos.'
  }
];

export const MOCK_THEMES = [
  'Cardiologia',
  'Endocrinologia',
  'Neurologia',
  'Nefrologia',
  'Gastroenterologia',
  'Hematologia',
  'Infectologia',
  'Ética Médica',
  'Biologia Celular',
  'Fisiologia',
  'Metabolismo',
  'Ginecologia e Obstetrícia',
  'Pediatria',
  'Geriatria',
  'Psiquiatria',
  'Mecanismos Moleculares do Desenvolvimento',
  'Anexos Embrionários',
  'Sistema Urogenital',
  'Sistema Cardiovascular',
  'Mecanismos de Regulação e Maturação',
  'Introdução à Embriologia',
  'Sistema Respiratório',
  'Sistema Digestório',
  'Teratologia e Programação Fetal',
  'Sistema Musculoesquelético',
  'Desenvolvimento Inicial e Implantação',
  'Gastrulação e Destino dos Folhetos',
  'Sistema Nervoso Central',
  'Gastrulação e Dinâmica Celular',
  'Sistema Nervoso e Crista Neural',
  'Gastrulação e Indução',
  'Introdução e História',
  'Sistema Hematopoiético',
  'Sistema Endócrino',
  'Mecanismos de Regulação',
  'Desenvolvimento Inicial'
];

export const MOCK_MODULES = Array.from({ length: 15 }, (_, i) => `ASE ${i + 1}`);

export interface QuestionSession {
  id: string;
  createdAt: string;
  filters: {
    module: string[];
    problem: string[];
    subject: string[];
    theme: string[];
    difficulty: QuestionDifficulty[];
    type: QuestionType[];
    quantity: number;
  };
  questions: {
    questionId: string;
    userAnswer: number | string | null;
    isCorrect: boolean | null;
    timeSpent: number; // in seconds
  }[];
  stats: {
    totalQuestions: number;
    answeredCount: number;
    correctCount: number;
    totalTime: number; // in seconds
  };
  isFinished: boolean;
}
