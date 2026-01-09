'use client'

/* THIS FILE WAS GENERATED AUTOMATICALLY BY iGRP STUDIO. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { use, useState, useEffect, useRef } from 'react';
import { cn, useIGRPMenuNavigation, useIGRPToast } from '@igrp/igrp-framework-react-design-system';
import { IGRPDataTableFacetedFilterFn , IGRPDataTableDateRangeFilterFn } from "@igrp/igrp-framework-react-design-system";
import { IGRPDataTableHeaderSortToggle, IGRPDataTableHeaderSortDropdown, IGRPDataTableHeaderRowsSelect } from "@igrp/igrp-framework-react-design-system";
import { 
  IGRPPageHeader,
	IGRPStatusBanner,
	IGRPCardDetails,
	IGRPCard,
	IGRPCardContent,
	IGRPHeadline,
	IGRPDataTable,
	IGRPDataTableCellBadge 
} from "@igrp/igrp-framework-react-design-system";
import {useFetchUtente} from '@/app/(myapp)/functions/services/utente-service'
import {useFetchServicosAssociados} from '@/app/(myapp)/functions/services/utente-service'
import { IGRPCardDetailsItemProps, } from '@igrp/igrp-framework-react-design-system';


export default function PageDetalhesutenteComponent({ params } : { params: Promise<{ id: string }> } ) {

  const { id } = use(params);

  
  type Table1 = {
    tipo: string;
    descricao: string;
    referencia: string;
    dataInicio: string;
    dataFim: string;
    estado: string;
}

  const [contentTabletable1, setContentTabletable1] = useState<Table1[]>([]);
  
  
const [statusBanner1Text, setStatusBanner1Text] = useState<string | undefined>(undefined);

const [statusBanner1BadgeText, setStatusBanner1BadgeText] = useState<string | undefined>(undefined);

const [nome, setNome] = useState<string | undefined>(undefined);

const [identificacao, setIdentificacao] = useState<string | undefined>(undefined);

const [estado, setEstado] = useState<string | undefined>(undefined);

const [nomePai, setNomePai] = useState<string | undefined>(undefined);

const [genero, setGenero] = useState<string | undefined>(undefined);

const [nif, setNif] = useState<string | undefined>(undefined);

const [tipoIdentificacao, setTipoIdentificacao] = useState<string | undefined>(undefined);

const [nomeMae, setNomeMae] = useState<string | undefined>(undefined);

const [dataNascimento, setDataNascimento] = useState<string | undefined>(undefined);

const [nacionalidade, setNacionalidade] = useState<string | undefined>(undefined);

const [email, setEmail] = useState<string | undefined>(undefined);

const [telefone, setTelefone] = useState<string | undefined>(undefined);

const [endereco, setEndereco] = useState<string | undefined>(undefined);

const [caixaPostal, setCaixaPostal] = useState<string | undefined>(undefined);

const [departamentoResponsavel, setDepartamentoResponsavel] = useState<string | undefined>(undefined);

const [contactosItems, setContactosItems] = useState<any>([]);

const [dadosPessoasItems, setDadosPessoasItems] = useState<any>([]);

const { igrpToast } = useIGRPToast()


const { data, isLoading } = useFetchUtente(id);

const { data: servicos, isLoading: isLoadingServico } = useFetchServicosAssociados(id);

useEffect(() => {
  if (isLoadingServico || !data) return;
  setContentTabletable1(servicos?.content || [])

}, [isLoadingServico, data])

// Lógica para carregar os dados do utente pelo ID e preencher o formulário
useEffect(() => {
  if (isLoading || !data) return;

  setContentTabletable1(servicos?.content || [])

  setStatusBanner1Text(data?.tipoUtenteDesc || '')
  setStatusBanner1BadgeText(data?.estado || '')
  /*setNome(data?.nome || '')
 setIdentificacao(data?.identificacao || '')
 setEstado(data?.estado || '')
 setNomePai(data?.nomePai || '')
 setGenero(data?.genero || '')
 setTipoIdentificacao(data?.tipoIdentificacao || '')
 setNif(data?.nif || '')
 setNomeMae(data?.nomeMae || '')
 setDataNascimento(data?.dataNascimento || '')
 setNacionalidade(data?.nacionalidade || '')
 setDepartamentoResponsavel(data?.departamentoResponsavel || '')
 setCaixaPostal(data?.caixaPostal || '')
 setEndereco(data?.endereco || '')
 setTelefone(data?.telefone || '')
 setEmail(data?.email || '')*/
  console.log(data)

  const contactosItems: IGRPCardDetailsItemProps[] = [
    {
      label: 'Email',
      content: data?.email || '',
      showCopyTo: true,
    },
    {
      label: 'Telefone',
      content: data?.telefone || '',
      showCopyTo: true,
    },
    {
      label: 'Endereço',
      content: data?.endereco || '',
      showCopyTo: true,
    },
    {
      label: 'Caixa Postal',
      content: data?.caixaPostal || '',
      showCopyTo: true,
    },
    {
      label: 'Departamento Responsável',
      content: data?.departamentoResponsavel || '',
      showCopyTo: true,
    }
  ]

  setContactosItems(contactosItems)

  const dadosPessoasItems: IGRPCardDetailsItemProps[] = [
    {
      label: 'Nome',
      content: data?.nome || '',
      showCopyTo: true,
    },

    {
      label: 'NIF',
      content: data?.nif || '',
      showCopyTo: true,
    },
    {
      label: 'Gênero',
      content: data?.generoDesc || '',
      showCopyTo: true,
    },
    {
      label: 'Tipo de Identificação',
      content: data?.tipoIdentificacaoDesc || '',
      showCopyTo: true,
    }, {
      label: 'Identificação',
      content: data?.identificacao || '',
      showCopyTo: true,
    },
    {
      label: 'Nome da Mãe',
      content: data?.nomeMae || '',
      showCopyTo: true,
    },
    {
      label: 'Nome do Pai',
      content: data?.nomePai || '',
      showCopyTo: true,
    },
    {
      label: 'Data de Nascimento',
      content: data?.dataNascimento || '',
      showCopyTo: true,
    },
    {
      label: 'Nacionalidade',
      content: data?.nacionalidade || '',
      showCopyTo: true,
    },
  ];

  setDadosPessoasItems(dadosPessoasItems);
}, [isLoading, data]);


  return (
<div className={ cn('page','space-y-6',)}    >
	<div className={ cn('section',' space-x-3 space-y-3',)}    >
	<IGRPPageHeader
  id={ `pageHeader1` }
  title={ `Detalhes do Utente` }
  iconBackButton={ `ArrowLeft` }
  showBackButton={ true }
  urlBackButton={ `/utentes` }
  variant={ `h3` }
  
>
  <div className="flex items-center gap-2">
</div>
</IGRPPageHeader>

<IGRPStatusBanner
  id={ `statusBanner1` }
  color={ `secondary` }
variant={ `soft` }
badgeColor={ `secondary` }
badgeVariant={ `soft` }
  
  badgeText={ statusBanner1BadgeText }
text={ statusBanner1Text }
>
</IGRPStatusBanner>
<IGRPCardDetails
  title={ `Informações Pessoais` }
  items={ dadosPessoasItems }
/>
<IGRPCardDetails
  title={ `Contatos` }
  items={ contactosItems }
/>
<IGRPCard
  id={ `card1` }
  
  
  
>
  <IGRPCardContent
  className={ cn('space-y-4','space-x-3','space-y-3',) }
  
>
  <IGRPHeadline
  id={ `headline1` }
  title={ `Serviços Associados` }
description={ undefined }
variant={ `h6` }
roleColor={ `outline` }
color={ `primary` }
showIcon={ false }
  className={ cn('',) }
  
  
>
</IGRPHeadline>
  <IGRPDataTable<Table1, Table1>
  id={ `table1` }
  className={ cn('',) }
  columns={
    [
        {
          header: 'Tipo'
,accessorKey: 'tipo',
          cell: ({ row }) => {
          return row.getValue("tipo")
          },
          filterFn: IGRPDataTableFacetedFilterFn
        },
        {
          header: 'Descriçāo'
,accessorKey: 'descricao',
          cell: ({ row }) => {
          return row.getValue("descricao")
          },
          filterFn: IGRPDataTableFacetedFilterFn
        },
        {
          header: 'Referência'
,accessorKey: 'referencia',
          cell: ({ row }) => {
          return row.getValue("referencia")
          },
          filterFn: IGRPDataTableFacetedFilterFn
        },
        {
          header: 'Data Inicio'
,accessorKey: 'dataInicio',
          cell: ({ row }) => {
          return row.getValue("dataInicio")
          },
          filterFn: IGRPDataTableFacetedFilterFn
        },
        {
          header: 'Data Fim'
,accessorKey: 'dataFim',
          cell: ({ row }) => {
          return row.getValue("dataFim")
          },
          filterFn: IGRPDataTableFacetedFilterFn
        },
        {
          header: 'Estado'
,accessorKey: 'estado',
          cell: ({ row }) => {
          const rowData = row.original;


return <IGRPDataTableCellBadge
  label={ row.original.estado }
  variant={ `soft` }
badgeClassName={ `` }
>

</IGRPDataTableCellBadge>
          },
          filterFn: IGRPDataTableFacetedFilterFn
        },
]
  }
  clientFilters={
    [
    ]
  }
  
  data={ contentTabletable1 }
/>
</IGRPCardContent>
</IGRPCard></div></div>
  );
}
