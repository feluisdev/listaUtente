export interface Utente {
  id: number;
  tipoUtente: string;
  nome: string;
  numero: string;
  nif: string;
  tipoIdentificacao?: string; // Novo campo do backend
  identificacao?: string; // Novo campo do backend
  nomeMae?: string;
  nomePai?: string;
  dataNascimento?: string;
  genero?: string; // Campo para gênero
  nacionalidade?: string; // Campo para nacionalidade
  estado: string;
  endereco?: string;
  telefone?: string;
  email?: string;
  caixaPostal?: string;
  departamentoResponsavel?: string;
  tipoUtenteDesc: string;
}

export interface PaginatedResponse<T> {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  content: T[];
}

//Create a intereface
export interface Servico {
  id: number;
  tipo: string;
  descricao: string;
  referencia: string;
  objetoID: number;
  dataInicio: string;
  dataFim: string;
  estado: string;
  valor: number;
  detalhes: {
    additionalProp1: Record<string, unknown>;
    additionalProp2: Record<string, unknown>;
    additionalProp3: Record<string, unknown>;
  };
}

export interface Divida {
  duc: string;
  valor: number;
  juros: number;
  dtLimite: string;
  sujeito: number;
  servicos: string;
  estado: string;
}

export interface PessoaEntry {
  NU_NIF: number;
  NM_PAI: string;
  NM_MAE: string;
  NOME: string;
  DATA_NASCIMENTO: string;
  DATA_EMISSAO: string;
  NATURALIDADE: string;
  MORADA: string;
  BI: number;
  SEXO: string;
  DT_NASC: string;
  NOME_MAE: string;
  NOME_PAI: string;
  DT_EMISSAO: string;
  EMISSOR: string;
  NAT_CONCELHO: string;
  RESIDENCIA: string;
  DT_VALIDADE: string;
  NAT_COD_RNI: number;
}

export interface PessoaResponse {
  Entries: {
    Entry: PessoaEntry;
  };
}
