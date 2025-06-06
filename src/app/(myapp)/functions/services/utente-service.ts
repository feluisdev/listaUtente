import { useIGRPToast } from "@igrp/igrp-framework-react-design-system";

export async function fetchUtentes(params: {
    search?: string;
    tipo?: string;
    numeroUtente?: string;
    nome?: string;
    nif?: string;
    documento?: string;
    estado?: string;
} = {}) {
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


