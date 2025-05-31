import { useIGRPToast } from "@igrp/igrp-framework-react-design-system";

export async function fetchUtentes(search = '') {
    const res = await fetch('/api/utente');

    if (!res.ok) throw new Error('Erro ao buscar dados');

    const raw = await res.json();

    const filtered = raw.filter(
        (c) =>
            c.numeroUtente.toLowerCase().includes(search.toLowerCase()),
    );


    return {
        list: filtered,
        options: [{ label: 'Ativo', value: 'ATIVO' }, { label: 'Inativo', value: 'INATIVO' }],
        total: filtered.length,
        message:
            filtered.length > 0 ? 'Dados carregados com sucesso' : 'Nenhum utente encontrado',
    };
}

// GET by ID
export async function fetchUtenteById(id: number) {
    const res = await fetch(`/api/utente?id=${id}`);
    if (!res.ok) throw new Error('Erro ao buscar utente');
    return await res.json();
}

// POST: criar novo utente
export async function createUtente(data: any) {
    const res = await fetch('/api/utente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('Erro ao criar utente');
    return await res.json();
}

// PUT: atualizar utente
export async function updateUtente(id: number, data: any) {
    const res = await fetch(`/api/utente?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('Erro ao atualizar utente');
    return await res.json();
}

// DELETE: remover utente
export async function deleteUtente(id: number) {
    const res = await fetch(`/api/utente?id=${id}`, {
        method: 'DELETE',
    });

    if (!res.ok) throw new Error('Erro ao remover utente');
    return await res.json();
}



export function getStatusBadge(utente?: any): {
    iconName?: string;
    bgClass?: string;
    textClass?: string;
    label?: string;
    className?: string;
} {
    if (!utente) return {};
    const bgClass =
        utente.estado === 'ATIVO'
            ? 'bg-green-100 text-green-800 hover:bg-green-100'
            : 'bg-red-100 text-red-800 hover:bg-red-100';

    const label = utente.estado;
    return { label, bgClass };
}

export function getTipoUtente() {

    const tiposUtente = [
        { label: 'Cidadão', value: 'CIDADAO' },
        { label: 'Camara', value: 'EMPRESA' },
        { label: 'Empresa', value: 'CAMARA_MUNICPAL' }]

    return tiposUtente;

}