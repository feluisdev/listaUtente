export function getTipoUtente() {
  const tiposUtente = [
    { label: 'Cidadão', value: 'CIDADAO' },
    { label: 'Entidade Pública', value: 'SERV_PUBLICO' },
    { label: 'Empresa', value: 'EMPRESA' },
  ];

  return tiposUtente;
}

export function getEstado() {
  const tiposUtente = [
    { label: 'Ativo', value: 'ATIVO' },
    { label: 'Inativo', value: 'INATIVO' },
  ];

  return tiposUtente;
}

export function getTipoDocumento() {
  const tiposUtente = [
    { label: 'Bilhete de Identidade', value: 'BI' },
    { label: 'Cartão Nacional de Identificação', value: 'CNI' },
    { label: 'Passaporte', value: 'PEC' },
    { label: 'Número de Identificação de Pessoa Coletiva', value: 'NIPC' },
    { label: 'NIF', value: 'NIF' },
  ];

  return tiposUtente;
}

export function getGenero() {
  const generos = [
    { label: 'Masculino', value: 'MASCULINO' },
    { label: 'Feminino', value: 'FEMININO' },
  ];

  return generos;
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
  return { label: label, bgClass: bgClass, textClass: '', className: '', iconName: '' };
}

const NON_SPECIAL_CHARS_REGEX = /\W+|[_]+/;
const WHITE_SPACE_REGEX = /\s+/;
const formatCamelCase = (text: string) => {
  const formatCase = (word: string, index: number) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  };

  return text
    .replace(NON_SPECIAL_CHARS_REGEX, ' ')
    .split(WHITE_SPACE_REGEX)
    .map((word, index) => formatCase(word, index))
    .join(' ');
};
