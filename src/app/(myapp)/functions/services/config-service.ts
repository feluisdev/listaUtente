
export function getTipoUtente() {

    const tiposUtente = [
        { label: 'Cidadão', value: 'CIDADAO' },
        { label: 'Servidor Público', value: 'SERV_PUBLICO' },
        { label: 'Empresa', value: 'EMPRESA' }]

    return tiposUtente;

}

export function getEstado() {

    const tiposUtente = [
        { label: 'Ativo', value: 'ATIVO' },
        { label: 'Inativo', value: 'INATIVO' }]

    return tiposUtente;

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

    const label = formatCamelCase(utente.estado);
    return { label, bgClass };
}

const NON_SPECIAL_CHARS_REGEX = /\W+|[_]+/;
const WHITE_SPACE_REGEX = /\s+/;
const formatCamelCase = (text: string) => {
    const formatCase = (word: string, index: number) => {
        const formattedNonFirstWord = word.charAt(0).toUpperCase() + word.slice(1);
        return index === 0 ? word.toLowerCase() : formattedNonFirstWord
    };

    return text
        .replace(NON_SPECIAL_CHARS_REGEX, ' ')
        .split(WHITE_SPACE_REGEX)
        .map((word, index) => formatCase(word, index))
        .join('')
};