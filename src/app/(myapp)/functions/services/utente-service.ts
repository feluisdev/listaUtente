import { useQuery } from '@tanstack/react-query';
import { Divida, PaginatedResponse, PessoaResponse, Servico, Utente } from '../../types/global';
import {
  getUtenteByID,
  getUtentes,
  getServicosAssociados,
  getPessoaByNif,
  getPessoaByIdentificacao,
  getDivida,
} from '../../actions/utente';
import { callClientApi } from '../../lib/api-client';
import { useMemo } from 'react';

// Type for utente filters
export type FilterUtente = {
  search?: string;
  tipo?: string;
  numeroUtente?: string;
  nome?: string;
  nif?: string;
  documento?: string;
  estado?: string;
};

export function useFetchUtentes(params?: FilterUtente) {
  const queryResult = useQuery<PaginatedResponse<Utente>>({
    queryKey: ['utente', params],
    queryFn: () => getUtentes(params),
  });

  const stats = useMemo(() => {
    if (!queryResult.data) return null;

    const content = queryResult.data.content || [];
    return {
      total: content.length,
      totalCidadao: content.filter((c) => c.tipoUtente === 'CIDADAO').length,
      totalEmpresa: content.filter((c) => c.tipoUtente === 'EMPRESA').length,
      totalCamara: content.filter((c) => c.tipoUtente === 'SERV_PUBLICO').length,
      active: content.filter((c) => c.estado === 'ATIVO').length,
      inactive: content.filter((c) => c.estado === 'INATIVO').length,
    };
  }, [queryResult.data]);

  return {
    ...queryResult,
    stats,
  };
}

// GET by ID
export function useFetchUtente(utenteId: string) {
  return useQuery<Utente>({
    queryKey: ['utente', utenteId],
    queryFn: () => getUtenteByID(utenteId),
  });
}

// POST: criar novo utente
export async function updateOrCreateUtente(data: Utente) {
  console.log('[LOG] Iniciando criação de utente:', { data });
  try {
    if (data.id) {
      return await callClientApi(`/api/utente?id=${data.id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      });
    }
    return await callClientApi('/api/utente', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error('[LOG] Erro na função createUtente:', error);
    throw error;
  }
}

// DELETE: inativar utente (não remove completamente, apenas muda o estado para inativo)
export async function deleteUtente(id: number) {
  console.log(`[LOG] Iniciando inativação de utente ID ${id}`);
  try {
    const res = await callClientApi(`/api/utente?id=${id}`, {
      method: 'DELETE',
    });
    console.log(`[LOG] Utente ID ${id} inativado com sucesso`);
    return res;
  } catch (error) {
    console.error('[LOG] Erro na função deleteUtente:', error);
    throw error;
  }
}

//GET: Servicos Associados
//TODO: Implementar a função getServicosAssociados utentes/v1/{utenteId}/servicos
export function useFetchServicosAssociados(id: string) {
  return useQuery<PaginatedResponse<Servico>>({
    queryKey: ['servicosAssociados', id],
    queryFn: () => getServicosAssociados(id),
  });
}

export function useFetchDivida(id: string) {
  return useQuery<PaginatedResponse<Divida>>({
    queryKey: ['divida', id],
    queryFn: () => getDivida(id),
  });
}

//GET: Pessoa by NIF
export function useFetchPessoaByNif(nif: string) {
  return useQuery<PessoaResponse>({
    queryKey: ['pessoaByNif', nif],
    queryFn: () => getPessoaByNif(nif),
    enabled: !!nif, // Only run query if nif is provided
  });
}

export function useFetchPessoaByIdentificacao({
  tipoIdentificacao,
  identificacao,
}: {
  tipoIdentificacao: string;
  identificacao: string;
}) {
  return useQuery<PessoaResponse | null>({
    queryKey: ['pessoaByIdentificacao', identificacao],
    queryFn: () => getPessoaByIdentificacao(tipoIdentificacao, identificacao),
    enabled: !!identificacao && !!tipoIdentificacao, // Only run query if identificacao is provided
  });
}
