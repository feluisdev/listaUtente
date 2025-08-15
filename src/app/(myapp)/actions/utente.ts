import { callClientApi } from '../lib/api-client';
import { Divida, PaginatedResponse, PessoaResponse, Servico, Utente } from '../types/global';

// Helper function to build query string and filter out null/undefined values
function buildQueryString(params: Record<string, string | number | undefined>): string {
  const filteredParams = Object.entries(params).filter(
    ([_, value]) => value !== null && value !== undefined && value !== '',
  );

  if (filteredParams.length === 0) return '';

  const queryString = filteredParams
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');

  return `?${queryString}`;
}

export async function getUtenteByID(utenteId: string) {
  return await callClientApi<Utente>(`/api/utente?utenteId=${utenteId}`, {
    method: 'GET',
  });
}

export async function getUtentes(
  params: {
    search?: string;
    tipo?: string;
    numero?: string;
    nome?: string;
    nif?: string;
    documento?: string;
    estado?: string;
  } = {},
) {
  const query = buildQueryString(params as Record<string, string | number | undefined>);

  const raw = await callClientApi<PaginatedResponse<Utente>>(`/api/utente${query}`, {
    method: 'GET',
  });

  return raw;
}

export async function getServicosAssociados(utenteId: string) {
  return await callClientApi<PaginatedResponse<Servico>>(`/api/utente/${utenteId}/servicos`, {
    method: 'GET',
  });
}

export async function getDivida(utenteId: string) {
  return await callClientApi<PaginatedResponse<Divida>>(`/api/utente/${utenteId}/divida`, {
    method: 'GET',
  });
}

export async function getPessoaByNif(nif: string) {
  return await callClientApi<PessoaResponse>(`/api/external/pessoa-by-nif?nif=${nif}`, {
    method: 'GET',
  });
}

export async function getPessoaByIdentificacao(tipoIdentificacao: string, identificacao: string) {
  if (tipoIdentificacao === 'BI') {
    return await callClientApi<PessoaResponse>(`/api/external/pessoa-by-bi?bi=${identificacao}`, {
      method: 'GET',
    });
  }
  if (tipoIdentificacao === 'PEC' || tipoIdentificacao === 'CNI') {
    return await callClientApi<PessoaResponse>(`/api/external/pessoa-by-siniac?numeroSiniac=${identificacao}`, {
      method: 'GET',
    });
  }

  return null
}
