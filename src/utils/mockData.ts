
// Utility function to format CNPJ
export function formatCNPJ(cnpj: string): string {
  // Format as XX.XXX.XXX/XXXX-XX
  return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
}

// Mock Dashboard Data
export const mockDashboardData = {
  stateDistribution: [
    { state: 'SP', percentage: 32 },
    { state: 'RJ', percentage: 16 },
    { state: 'MG', percentage: 12 },
    { state: 'RS', percentage: 8 },
    { state: 'PR', percentage: 6 }
  ],
  sizeDistribution: [
    { size: 'MEI', percentage: 45 },
    { size: 'Micro', percentage: 30 },
    { size: 'Pequena', percentage: 15 },
    { size: 'Média', percentage: 7 },
    { size: 'Grande', percentage: 3 }
  ]
};

// Mock Recent Companies
export const mockRecentCompanies = [
  { cnpj: '12.345.678/0001-90', name: 'Empresa ABC Ltda', size: 'Pequeno', state: 'SP' },
  { cnpj: '98.765.432/0001-21', name: 'XYZ Comércio S.A.', size: 'Médio', state: 'RJ' },
  { cnpj: '45.678.901/0001-23', name: 'Tech Solutions Eireli', size: 'Pequeno', state: 'MG' },
  { cnpj: '23.456.789/0001-34', name: 'Indústrias Silva Ltda', size: 'Grande', state: 'RS' }
];

// Mock Company Data for Search
export const mockCompanyData = [
  { 
    cnpj: '12345678000190', 
    name: 'Empresa ABC Ltda', 
    tradeName: 'ABC Solutions',
    status: 'Ativa', 
    size: 'Pequeno', 
    legalNature: 'LTDA',
    state: 'SP' 
  },
  { 
    cnpj: '98765432000121', 
    name: 'XYZ Comércio S.A.', 
    tradeName: 'XYZ Retail',
    status: 'Ativa', 
    size: 'Médio', 
    legalNature: 'SA',
    state: 'RJ' 
  },
  { 
    cnpj: '45678901000123', 
    name: 'Tech Solutions Eireli', 
    tradeName: 'TechSol',
    status: 'Ativa', 
    size: 'Pequeno', 
    legalNature: 'EIRELI',
    state: 'MG' 
  },
  { 
    cnpj: '23456789000134', 
    name: 'Indústrias Silva Ltda', 
    tradeName: 'Silva Industries',
    status: 'Suspensa', 
    size: 'Grande', 
    legalNature: 'LTDA',
    state: 'RS' 
  },
  { 
    cnpj: '78901234000145', 
    name: 'Loja do João ME', 
    tradeName: "João's Store",
    status: 'Ativa', 
    size: 'MEI', 
    legalNature: 'ME',
    state: 'SP' 
  },
  { 
    cnpj: '34567890000156', 
    name: 'Consultoria Financeira Ltda', 
    tradeName: 'FinConsult',
    status: 'Inapta', 
    size: 'Pequeno', 
    legalNature: 'LTDA',
    state: 'RJ' 
  },
  { 
    cnpj: '90123456000167', 
    name: 'Construtora Horizonte Ltda', 
    tradeName: 'Horizonte Construções',
    status: 'Ativa', 
    size: 'Médio', 
    legalNature: 'LTDA',
    state: 'MG' 
  },
  { 
    cnpj: '56789012000178', 
    name: 'Farmácia Saúde Total Ltda', 
    tradeName: 'Saúde Total',
    status: 'Baixada', 
    size: 'Pequeno', 
    legalNature: 'LTDA',
    state: 'SP' 
  }
];

// Mock Detailed Company Data
export const mockCompanyDetail: Record<string, any> = {
  '12345678000190': {
    cnpj: '12345678000190',
    name: 'Empresa ABC Ltda',
    tradeName: 'ABC Solutions',
    status: 'Ativa',
    size: 'Pequeno',
    legalNature: 'Sociedade Empresária Limitada',
    openingDate: '15/03/2010',
    capital: 100000,
    mainActivity: {
      code: '62.01-5-01',
      description: 'Desenvolvimento de programas de computador sob encomenda'
    },
    secondaryActivities: [
      {
        code: '62.02-3-00',
        description: 'Desenvolvimento e licenciamento de programas de computador customizáveis'
      },
      {
        code: '62.04-0-00',
        description: 'Consultoria em tecnologia da informação'
      }
    ],
    headquarters: {
      city: 'São Paulo',
      state: 'SP'
    },
    establishments: [
      {
        type: 'Matriz',
        cnpj: '12345678000190',
        status: 'Ativa',
        openingDate: '15/03/2010',
        address: 'Av. Paulista, 1000, 10º Andar, Bela Vista',
        zipCode: '01310-100',
        city: 'São Paulo',
        state: 'SP'
      },
      {
        type: 'Filial',
        cnpj: '12345678000271',
        status: 'Ativa',
        openingDate: '22/06/2015',
        address: 'Rua Rio de Janeiro, 1500, Sala 304, Centro',
        zipCode: '30160-041',
        city: 'Belo Horizonte',
        state: 'MG'
      }
    ],
    partners: [
      {
        name: 'João Silva',
        qualification: 'Sócio-Administrador',
        document: '123.456.789-00',
        capitalShare: 70,
        entryDate: '15/03/2010',
        country: 'Brasil'
      },
      {
        name: 'Maria Souza',
        qualification: 'Sócio',
        document: '987.654.321-00',
        capitalShare: 30,
        entryDate: '15/03/2010',
        country: 'Brasil'
      }
    ],
    simplesNacional: {
      optante: true,
      optionDate: '01/01/2011',
      effectDate: '01/01/2011',
      mei: false,
      meiDate: null
    }
  },
  '98765432000121': {
    cnpj: '98765432000121',
    name: 'XYZ Comércio S.A.',
    tradeName: 'XYZ Retail',
    status: 'Ativa',
    size: 'Médio',
    legalNature: 'Sociedade Anônima Fechada',
    openingDate: '10/08/2005',
    capital: 2500000,
    mainActivity: {
      code: '47.51-2-01',
      description: 'Comércio varejista especializado de equipamentos e suprimentos de informática'
    },
    secondaryActivities: [
      {
        code: '47.53-9-00',
        description: 'Comércio varejista especializado de eletrodomésticos e equipamentos de áudio e vídeo'
      },
      {
        code: '47.57-1-00',
        description: 'Comércio varejista especializado de peças e acessórios para aparelhos eletroeletrônicos'
      }
    ],
    headquarters: {
      city: 'Rio de Janeiro',
      state: 'RJ'
    },
    establishments: [
      {
        type: 'Matriz',
        cnpj: '98765432000121',
        status: 'Ativa',
        openingDate: '10/08/2005',
        address: 'Av. Rio Branco, 500, Centro',
        zipCode: '20040-002',
        city: 'Rio de Janeiro',
        state: 'RJ'
      },
      {
        type: 'Filial',
        cnpj: '98765432000202',
        status: 'Ativa',
        openingDate: '15/03/2008',
        address: 'Av. Paulista, 2000, Bela Vista',
        zipCode: '01310-200',
        city: 'São Paulo',
        state: 'SP'
      },
      {
        type: 'Filial',
        cnpj: '98765432000393',
        status: 'Fechada',
        openingDate: '05/06/2010',
        address: 'Av. Sete de Setembro, 1234, Centro',
        zipCode: '80230-000',
        city: 'Curitiba',
        state: 'PR'
      }
    ],
    partners: [
      {
        name: 'Investimentos XYZ Ltda',
        qualification: 'Acionista Majoritário',
        document: '12.345.678/0001-90',
        capitalShare: 75,
        entryDate: '10/08/2005',
        country: 'Brasil'
      },
      {
        name: 'Carlos Mendes',
        qualification: 'Presidente',
        document: '234.567.890-12',
        capitalShare: 15,
        entryDate: '10/08/2005',
        country: 'Brasil'
      },
      {
        name: 'Ana Ferreira',
        qualification: 'Diretor',
        document: '345.678.901-23',
        capitalShare: 10,
        entryDate: '15/10/2010',
        country: 'Brasil'
      }
    ],
    simplesNacional: {
      optante: false,
      optionDate: null,
      effectDate: null,
      mei: false,
      meiDate: null
    }
  }
};

// Add more mock data for other CNPJs
mockCompanyDetail['45678901000123'] = {
  cnpj: '45678901000123',
  name: 'Tech Solutions Eireli',
  tradeName: 'TechSol',
  status: 'Ativa',
  size: 'Pequeno',
  legalNature: 'Empresa Individual de Responsabilidade Limitada',
  openingDate: '05/12/2015',
  capital: 80000,
  mainActivity: {
    code: '62.01-5-01',
    description: 'Desenvolvimento de programas de computador sob encomenda'
  },
  secondaryActivities: [
    {
      code: '62.03-1-00',
      description: 'Desenvolvimento e licenciamento de programas de computador não-customizáveis'
    }
  ],
  headquarters: {
    city: 'Belo Horizonte',
    state: 'MG'
  },
  establishments: [
    {
      type: 'Matriz',
      cnpj: '45678901000123',
      status: 'Ativa',
      openingDate: '05/12/2015',
      address: 'Rua dos Inconfidentes, 1400, Savassi',
      zipCode: '30140-120',
      city: 'Belo Horizonte',
      state: 'MG'
    }
  ],
  partners: [
    {
      name: 'Roberto Alves',
      qualification: 'Titular Pessoa Física',
      document: '456.789.012-34',
      capitalShare: 100,
      entryDate: '05/12/2015',
      country: 'Brasil'
    }
  ],
  simplesNacional: {
    optante: true,
    optionDate: '01/01/2016',
    effectDate: '01/01/2016',
    mei: false,
    meiDate: null
  }
};

mockCompanyDetail['78901234000145'] = {
  cnpj: '78901234000145',
  name: 'Loja do João ME',
  tradeName: "João's Store",
  status: 'Ativa',
  size: 'MEI',
  legalNature: 'Empresário Individual',
  openingDate: '10/05/2018',
  capital: 0, // MEI doesn't require capital
  mainActivity: {
    code: '47.89-0-01',
    description: 'Comércio varejista de suvenires, bijuterias e artesanatos'
  },
  secondaryActivities: [],
  headquarters: {
    city: 'São Paulo',
    state: 'SP'
  },
  establishments: [
    {
      type: 'Matriz',
      cnpj: '78901234000145',
      status: 'Ativa',
      openingDate: '10/05/2018',
      address: 'Rua Augusta, 1200, Consolação',
      zipCode: '01304-001',
      city: 'São Paulo',
      state: 'SP'
    }
  ],
  partners: [
    {
      name: 'João Oliveira',
      qualification: 'Microempreendedor Individual',
      document: '789.012.345-67',
      capitalShare: 100,
      entryDate: '10/05/2018',
      country: 'Brasil'
    }
  ],
  simplesNacional: {
    optante: true,
    optionDate: '10/05/2018',
    effectDate: '01/06/2018',
    mei: true,
    meiDate: '10/05/2018'
  }
};
