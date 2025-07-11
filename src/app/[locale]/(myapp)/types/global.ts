export interface Utente {
  id?: number;
  tipoUtente?: string;
  nome?: string;
  numero?: string;
  nif?: string;
  tipoIdentificacao?: string; // Novo campo do backend
  identificacao?: string;     // Novo campo do backend
  nomeMae?: string;
  nomePai?: string;
  dataNascimento?: string;
  genero?: string;            // Campo para gênero
  nacionalidade?: string;     // Campo para nacionalidade
  estado?: string;
  endereco?: string;
  telefone?: string;
  email?: string;
  caixaPostal?: string;
  departamentoResponsavel?: string;
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