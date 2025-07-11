import { useIGRPToast } from "@igrp/igrp-framework-react-design-system";
import { z } from "zod";
import { IGRPOptionsProps } from "@igrp/igrp-framework-react-design-system";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Utente } from "../../types/global";
import { getUtenteByID } from "../../actions/utente";
import { callClientApi } from "../../lib/api-client";

// Esquema de validação para o formulário de utente
export const utenteFormSchema = z.object({
  id: z.number().optional(),
  tipo: z.string().optional(),
  nome: z.string().optional(),
  numero: z.string().optional(),
  nif: z.string().optional(),
  tipoIdentificacao: z.string().optional(), // Novo campo do backend
  identificacao: z.string().optional(), // Novo campo do backend
  nomeMae: z.string().optional(),
  nomePai: z.string().optional(),
  dataNascimento: z.date().optional(),
  genero: z.string().optional(), // Campo para gênero
  nacionalidade: z.string().optional(), // Campo para nacionalidade
  estado: z.string().optional(),
  endereco: z.string().optional(),
  telefone: z.string().optional(),
  email: z.string().optional(),
  caixaPostal: z.string().optional(),
  departamentoResponsavel: z.string().optional()
});

// Tipo derivado do esquema
export type UtenteFormType = typeof utenteFormSchema;
export type UtenteFormData = z.infer<UtenteFormType>;

// Valores iniciais para o formulário
export const initialUtenteForm: UtenteFormData = {
  id: undefined,
  tipo: "",
  nome: "",
  numero: "",
  nif: "",
  tipoIdentificacao: "", // Novo campo do backend
  identificacao: "", // Novo campo do backend
  nomeMae: "",
  nomePai: "",
  dataNascimento: undefined,
  genero: "", // Campo para gênero
  nacionalidade: "", // Campo para nacionalidade
  estado: "ATIVO",
  endereco: "", // Adicionado para compatibilidade com o backend
  telefone: "",
  email: "",
  caixaPostal: "",
  departamentoResponsavel: ""
};

export async function fetchUtentes(params: {
  search?: string;
  tipo?: string;
  numero?: string;
  nome?: string;
  nif?: string;
  documento?: string;
  estado?: string;
} = {}, inputSearchinputSearch1Value: string) {
  // Construir URL com parâmetros de busca
  let url = '/api/utente';
  const queryParams = [];

  if (params.tipo) queryParams.push(`tipo=${params.tipo}`);
  if (params.numero) queryParams.push(`numeroUtente=${params.numero}`);
  if (params.nome) queryParams.push(`nome=${params.nome}`);
  if (params.nif) queryParams.push(`nif=${params.nif}`);
  if (params.documento) queryParams.push(`documento=${params.documento}`);
  if (params.estado) queryParams.push(`estado=${params.estado}`);

  if (queryParams.length > 0) {
    url += `?${queryParams.join('&')}`;
  }

  console.log('[LOG] Iniciando busca de utentes:', { params, url });

  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.error('[LOG] Erro ao buscar utentes:', { status: res.status, statusText: res.statusText });
      throw new Error('Erro ao buscar dados');
    }

    const raw = await res.json();
    console.log(`[LOG] Utentes encontrados: ${raw.length}`);

    // Se tiver um termo de busca, filtra localmente
    let filtered = raw;
    if (params.search) {
      filtered = raw.filter(
        (c: { numeroUtente: string; }) => c.numeroUtente.toLowerCase().includes(params.search?.toLowerCase() || '')
      );
      console.log(`[LOG] Utentes filtrados por "${params.search}": ${filtered.length}`);
    }

    return {
      list: filtered,
      options: [{ label: 'Ativo', value: 'ATIVO' }, { label: 'Inativo', value: 'INATIVO' }],
      total: filtered.length,
      totalCidadao: filtered.filter((c: { tipoUtente: string; }) => c.tipoUtente === 'CIDADAO').length,
      totalEmpresa: filtered.filter((c: { tipoUtente: string; }) => c.tipoUtente === 'EMPRESA').length,
      totalCamara: filtered.filter((c: { tipoUtente: string; }) => c.tipoUtente === 'SERV_PUBLICO').length,
      message:
        filtered.length > 0 ? 'Dados carregados com sucesso' : 'Nenhum utente encontrado',
    };
  } catch (error) {
    console.error('[LOG] Erro na função fetchUtentes:', error);
    throw error;
  }
}

// GET by ID
export function useFetchUtente() {

  const params = useParams();
  const utenteId = params.id as string;

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
      return await fetch(`/api/utente?id=${data.id}`, {
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
    const res = await fetch(`/api/utente?id=${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      console.error(`[LOG] Erro ao inativar utente ID ${id}:`, { status: res.status, statusText: res.statusText });
      throw new Error('Erro ao inativar utente');
    }
    const result = await res.json();
    console.log(`[LOG] Utente ID ${id} inativado com sucesso`);
    return result;
  } catch (error) {
    console.error('[LOG] Erro na função deleteUtente:', error);
    throw error;
  }
}



// Função para formatar dados do utente para o formulário
export function formatUtenteDataForForm(utenteData: any): UtenteFormData {
  const formattedData = { ...utenteData };

  // Converter a data de nascimento para objeto Date se existir
  if (formattedData.dataNascimento) {
    formattedData.dataNascimento = new Date(formattedData.dataNascimento);
  }

  // Mapear campos do backend para o formulário
  if (formattedData.nomeUtente && !formattedData.nome) {
    formattedData.nome = formattedData.nomeUtente;
  }

  // Mapear o campo numero para nrUtente
  if (formattedData.numero) {
    formattedData.numero = formattedData.numero;
  }

  // Garantir que o campo endereco está preenchido
  if (formattedData.morada && !formattedData.endereco) {
    formattedData.endereco = formattedData.morada;
  }

  // Garantir que o campo identificacao está preenchido
  if (formattedData.bi && !formattedData.identificacao) {
    formattedData.identificacao = formattedData.bi;
    // Se não tiver tipo de identificação definido, assume BI
    if (!formattedData.tipoIdentificacao) {
      formattedData.tipoIdentificacao = 'BI';
    }
  }

  // Garantir que todos os campos estejam mapeados corretamente
  if (formattedData.nome_mae && !formattedData.nomeMae) {
    formattedData.nomeMae = formattedData.nome_mae;
  }

  // Mapear caixaPostal para cxPostal e vice-versa
  if (formattedData.caixaPostal && !formattedData.cxPostal) {
    formattedData.cxPostal = formattedData.caixaPostal;
  } else if (formattedData.cxPostal && !formattedData.caixaPostal) {
    formattedData.caixaPostal = formattedData.cxPostal;
  }

  // Garantir que os campos de gênero e nacionalidade estejam definidos
  if (!formattedData.genero) {
    formattedData.genero = "";
  }

  if (!formattedData.nacionalidade) {
    formattedData.nacionalidade = "";
  }

  if (!formattedData.estado) {
    formattedData.estado = 'ATIVO';
  }

  return formattedData as UtenteFormData;
}

// Função para preparar dados para criação de utente
export function prepareCreateUtenteData(data: UtenteFormData) {
  // Determinar qual campo usar para identificacao
  const identificacao = data.identificacao;

  return {
    nome: data.nome,
    tipo: data.tipo,
    nif: data.nif,
    tipoIdentificacao: data.tipoIdentificacao || 'BI', // Usar o tipo de identificação ou padrão BI
    identificacao: identificacao, // Usar o campo identificacao ou bi
    nomeMae: data.nomeMae,
    nomePai: data.nomePai,
    dataNascimento: data.dataNascimento ? data.dataNascimento.toISOString().split('T')[0] : null,
    genero: data.genero, // Campo para gênero
    nacionalidade: data.nacionalidade, // Campo para nacionalidade
    estado: data.estado,
    endereco: data.endereco, // Usar endereco ou morada
    telefone: data.telefone,
    email: data.email,
    caixaPostal: data.caixaPostal,
    departamentoResponsavel: data.departamentoResponsavel
  };
}

// Função para preparar dados para atualização de utente
export function prepareUpdateUtenteData(data: UtenteFormData) {
  // Determinar qual campo usar para identificacao
  const identificacao = data.identificacao;

  return {
    nome: data.nome,
    endereco: data.endereco, // Usar endereco ou morada
    telefone: data.telefone,
    email: data.email,
    caixaPostal: data.caixaPostal,
    departamentoResponsavel: data.departamentoResponsavel,
    nomeMae: data.nomeMae,
    nomePai: data.nomePai,
    nif: data.nif,
    tipoIdentificacao: data.tipoIdentificacao || 'BI', // Usar o tipo de identificação ou padrão BI
    identificacao: identificacao, // Usar o campo identificacao ou bi
    genero: data.genero, // Campo para gênero
    nacionalidade: data.nacionalidade, // Campo para nacionalidade
    tipo: data.tipo,
    dataNascimento: data.dataNascimento ? data.dataNascimento.toISOString().split('T')[0] : null,
    estado: data.estado
  };
}



