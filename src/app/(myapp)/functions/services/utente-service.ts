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
        options: [{ label: 'Ativo', value: 'A' }, { label: 'Inativo', value: 'I' }],
        optionsTipoUtente: [{ label: 'Cidadão', value: 'CI' }, { label: 'Camara', value: 'C' }, { label: 'Empresa', value: 'E' }],
        total: filtered.length,
        message:
            filtered.length > 0 ? 'Dados carregados com sucesso' : 'Nenhum utente encontrado',
    };
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
        utente.estado === 'Ativo'
            ? 'bg-green-100 text-green-800 hover:bg-green-100'
            : 'bg-red-100 text-red-800 hover:bg-red-100';

    const label = utente.estado;
    return { label, bgClass };
}