import { useIGRPToast } from "@igrp/igrp-framework-react-design-system";
import { z } from "zod";
import { IGRPOptionsProps } from "@igrp/igrp-framework-react-design-system";

// Esquema de validação para o formulário de utente
export const utenteFormSchema = z.object({
    id: z.number().optional(),
    tipoUtente: z.string().optional(),
    nome: z.string().optional(),
    nrUtente: z.string().optional(),
    nif: z.string().optional(),
    bi: z.string().optional(),
    nomeMae: z.string().optional(),
    nomePai: z.string().optional(),
    dataNascimento: z.date().optional(),
    estado: z.string().optional(),
    morada: z.string().optional(),
    telefone: z.string().optional(),
    email: z.string().optional(),
    cxPostal: z.string().optional()
  });
  
  // Tipo derivado do esquema
  export type UtenteFormType = typeof utenteFormSchema;
  export type UtenteFormData = z.infer<UtenteFormType>;
  
  // Valores iniciais para o formulário
  export const initialUtenteForm: UtenteFormData = {
    id: undefined,
    tipoUtente: "",
    nome: "",
    nrUtente: "",
    nif: "",
    bi: "",
    nomeMae: "",
    nomePai: "",
    dataNascimento: undefined,
    estado: "ATIVO",
    morada: "",
    telefone: "",
    email: "",
    cxPostal: ""
  };

export async function fetchUtentes(params: {
  search?: string;
  tipo?: string;
  numeroUtente?: string;
  nome?: string;
  nif?: string;
  documento?: string;
  estado?: string;
} = {}, inputSearchinputSearch1Value: string) {
    // Construir URL com parâmetros de busca
    let url = '/api/utente';
    const queryParams = [];
    
    if (params.tipo) queryParams.push(`tipo=${params.tipo}`);
    if (params.numeroUtente) queryParams.push(`numeroUtente=${params.numeroUtente}`);
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
export async function fetchUtenteById(id: number) {
    // Usar um cache simples para evitar chamadas duplicadas
    const cacheKey = `utente_${id}`;
    const cachedData = sessionStorage.getItem(cacheKey);
    
    // Se temos dados em cache e eles não expiraram, use-os
    if (cachedData) {
        try {
            const { data, timestamp } = JSON.parse(cachedData);
            const now = new Date().getTime();
            const cacheAge = now - timestamp;
            
            // Cache válido por 5 minutos (300000 ms)
            if (cacheAge < 300000) {
                console.log(`[LOG] Usando dados em cache para utente ID ${id}`);
                return data;
            }
        } catch (error) {
            console.error('[LOG] Erro ao ler cache:', error);
            // Se houver erro ao ler o cache, continue com a requisição normal
        }
    }
    
    console.log(`[LOG] Buscando utente por ID: ${id}`);
    try {
        if (!id) {
            console.error('[LOG] ID inválido fornecido para fetchUtenteById');
            throw new Error('ID inválido');
        }
        
        const res = await fetch(`/api/utente?id=${id}`);
        if (!res.ok) {
            console.error(`[LOG] Erro ao buscar utente ID ${id}:`, { status: res.status, statusText: res.statusText });
            throw new Error(`Erro ao buscar utente: ${res.status}`);
        }
        
        const data = await res.json();
        console.log(`[LOG] Utente ID ${id} encontrado:`, { data });
        
        // Verificar se os dados recebidos são válidos
        if (!data || !data.id) {
            console.error('[LOG] Dados inválidos recebidos da API:', data);
            throw new Error('Dados inválidos recebidos da API');
        }
        
        // Armazenar no cache
        try {
            sessionStorage.setItem(cacheKey, JSON.stringify({
                data,
                timestamp: new Date().getTime()
            }));
        } catch (error) {
            console.error('[LOG] Erro ao armazenar em cache:', error);
            // Continuar mesmo se não conseguir armazenar em cache
        }
        
        return data;
    } catch (error) {
        console.error(`[LOG] Erro na função fetchUtenteById:`, error);
        throw error;
    }
}

// POST: criar novo utente
export async function createUtente(data: any) {
    console.log('[LOG] Iniciando criação de utente:', { nome: data.nomeUtente, tipo: data.tipoUtente });
    try {
        const res = await fetch('/api/utente', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            console.error('[LOG] Erro ao criar utente:', { status: res.status, statusText: res.statusText });
            throw new Error('Erro ao criar utente');
        }
        const result = await res.json();
        console.log('[LOG] Utente criado com sucesso:', { id: result.id, nome: result.nomeUtente });
        return result;
    } catch (error) {
        console.error('[LOG] Erro na função createUtente:', error);
        throw error;
    }
}

// PUT: atualizar utente
export async function updateUtente(id: number, data: any) {
    console.log(`[LOG] Iniciando atualização de utente ID ${id}:`, { data });
    try {
        const res = await fetch(`/api/utente?id=${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            console.error(`[LOG] Erro ao atualizar utente ID ${id}:`, { status: res.status, statusText: res.statusText });
            throw new Error('Erro ao atualizar utente');
        }
        const result = await res.json();
        console.log(`[LOG] Utente ID ${id} atualizado com sucesso`);
        return result;
    } catch (error) {
        console.error('[LOG] Erro na função updateUtente:', error);
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
  
    // Garantir que todos os campos estejam mapeados corretamente
    if (formattedData.nome_mae && !formattedData.nomeMae) {
      formattedData.nomeMae = formattedData.nome_mae;
    }
  
    if (!formattedData.estado) {
      formattedData.estado = 'ATIVO';
    }
    
    return formattedData as UtenteFormData;
  }
  
  // Função para preparar dados para criação de utente
  export function prepareCreateUtenteData(data: UtenteFormData) {
    return {
      nome: data.nome,
      tipoUtente: data.tipoUtente,
      nrUtente: data.nrUtente,
      nif: data.nif,
      bi: data.bi,
      nomeMae: data.nomeMae,
      nomePai: data.nomePai,
      dataNascimento: data.dataNascimento ? data.dataNascimento.toISOString().split('T')[0] : null,
      estado: data.estado,
      morada: data.morada,
      telefone: data.telefone,
      email: data.email,
      cxPostal: data.cxPostal
    };
  }
  
  // Função para preparar dados para atualização de utente
  export function prepareUpdateUtenteData(data: UtenteFormData) {
    return {
      nome: data.nome,
      morada: data.morada,
      telefone: data.telefone,
      email: data.email,
      cxPostal: data.cxPostal,
      nomeMae: data.nomeMae,
      nomePai: data.nomePai,
      nif: data.nif,
      bi: data.bi,
      tipoUtente: data.tipoUtente
    };
  }

  


// Função para processar a submissão do formulário de utente
export async function handleUtenteSubmit(data: UtenteFormData, id?: string | null) {
  console.log('[LOG] Dados do formulário para envio:', data);

  try {
    if (id) {
      // Modo edição
      // Usar a função de preparação de dados do serviço
      const updateData = prepareUpdateUtenteData(data);

      console.log('[LOG] Dados formatados para API (update):', updateData);
      return updateUtente(Number(id), updateData);
    } else {
      // Modo criação
      // Usar a função de preparação de dados do serviço
      const createData = prepareCreateUtenteData(data);

      console.log('[LOG] Dados formatados para API (create):', createData);
      return createUtente(createData);
    }
  } catch (error) {
    console.error('[LOG] Erro ao processar submissão:', error);
    throw error;
  }
}

  

