'use client'


import { useState, useEffect, useRef } from 'react';
import { cn } from '@igrp/igrp-framework-react-design-system';
import { IGRPForm } from "@igrp/igrp-framework-react-design-system";
import { IGRPFormHandle } from "@igrp/igrp-framework-react-design-system";
import { z } from "zod";
import { IGRPPageHeader } from "@igrp/igrp-framework-react-design-system";
import { IGRPButton } from "@igrp/igrp-framework-react-design-system";
import { IGRPCard } from "@igrp/igrp-framework-react-design-system";
import { IGRPCardHeader } from "@igrp/igrp-framework-react-design-system";
import { IGRPHeadline } from "@igrp/igrp-framework-react-design-system";
import { IGRPCardContent } from "@igrp/igrp-framework-react-design-system";
import { IGRPInputText } from "@igrp/igrp-framework-react-design-system";
import { IGRPCardFooter } from "@igrp/igrp-framework-react-design-system";
import { IGRPDataTable } from "@igrp/igrp-framework-react-design-system";
import { IGRPDataTableFacetedFilterFn , IGRPDataTableDateRangeFilterFn } from "@igrp/igrp-framework-react-design-system";
import { IGRPDataTableHeaderSortToggle, IGRPDataTableHeaderSortDropdown, IGRPDataTableHeaderRowsSelect } from "@igrp/igrp-framework-react-design-system";
import { useRouter } from "next/navigation";
import { anyZodType } from "@/app/types/zod-types";
import { utenteFormSchema, UtenteFormData } from '@/app/(myapp)/functions/services/utente-service';


export default function PageDetalhesutenteComponent() {

  const [contentFormform1, setContentFormform1] = useState<z.infer<any>>(null);
  const [contentTabletable1, setContentTabletable1] = useState<any[]>([]);
  const formform1Ref = useRef<IGRPFormHandle<z.infer<anyZodType>> | null>(null);
  
const router = useRouter()


// Lógica para carregar os dados do utente pelo ID e preencher o formulário
useEffect(() => {
  // Função para extrair o ID do utente da URL
  const getUtenteIdFromUrl = () => {
    // Verifica se estamos no navegador
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');
      return id ? parseInt(id, 10) : null;
    }
    return null;
  };

  // Função para carregar os dados do utente
  const loadUtenteData = async () => {
    const utenteId = getUtenteIdFromUrl();
    
    if (utenteId) {
      try {
        // Importação dinâmica para evitar problemas de SSR
        const { fetchUtenteById, formatUtenteDataForForm } = await import('../../(myapp)/functions/services/utente-service');
        
        // Buscar dados do utente
        const utenteData = await fetchUtenteById(utenteId);
        
        // Formatar dados para o formulário
        const formattedData = formatUtenteDataForForm(utenteData);
        
        // Atualizar o estado do formulário
        setContentFormform1(formattedData);
        
        // TODO: Carregar serviços associados ao utente (se necessário)
        // setContentTabletable1([...]);
      } catch (error) {
        console.error('Erro ao carregar dados do utente:', error);
        // Aqui poderia mostrar uma mensagem de erro para o usuário
      }
    }
  };

  // Carregar dados quando o componente for montado
  loadUtenteData();
}, []);

function goTolistaUtente (): void {
  router.push("listautente");
}


  return (
<div className={ cn('page','mx-auto px-4 space-y-6',)}   >
	<div className={ cn('section',' space-x-3 space-y-3',)}   >
	<IGRPForm
  schema={ utenteFormSchema }
  validationMode="onBlur"
  gridClassName="flex flex-col"
formRef={ formform1Ref }
  className={ cn() }
  onSubmit={ (e) => {} }
  defaultValues={ contentFormform1 }
>
  <>
  <IGRPPageHeader
  title="Detalhes do Utente"
  variant="h3"
  className={ cn() }
>
  <div className="flex items-center gap-2">
    <IGRPButton
  variant="secondary"
  size="default"
  showIcon={ true }
  iconName="X"
  className={ cn() }
  onClick={ () => goTolistaUtente() }
>
  Fechar
</IGRPButton>

</div>
</IGRPPageHeader>

  <div className={ cn('grid','grid-cols-1',' gap-4',)}   >
	<div className={ cn('grid','grid-cols-12',' gap-4',)}   >
	<div className={ cn('col-span-8 flex flex-col gap-6',)}   >
	<IGRPCard
  className={ cn() }
  
>
  <IGRPCardHeader
  className={ cn() }
  
>
  <IGRPHeadline
  title="Informações Pessoais"
  variant="h4"
  className={ cn() }
>
</IGRPHeadline>

</IGRPCardHeader>
  <IGRPCardContent
  className={ cn('space-x-3','space-y-3',) }
  
>
  <div className={ cn('grid','grid-cols-2','grid grid grid-rows-1 gap-2 justify-items-start items-start',' gap-4',)}   >
	<IGRPInputText
  name="nome"
placeholder=""
  disabled
  label="Nome"
  className={ cn('col-span-1',) }
  
/>
<IGRPInputText
  name="nif"
placeholder=""
  disabled
  label="NIF"
  className={ cn('col-span-1',) }
  
/>
<IGRPInputText
  name="bi"
placeholder=""
  disabled
  label="CNI"
  className={ cn('col-span-1',) }
  
/>
<IGRPInputText
  name="estado"
placeholder=""
  disabled
  label="Estado"
  className={ cn('col-span-1',) }
  
/>
<IGRPInputText
  name="nomeMae"
placeholder=""
  disabled
  label="Nome da Mãe"
  className={ cn('col-span-1',) }
  
/>
<IGRPInputText
  name="nomePai"
placeholder=""
  disabled
  label="Nome do Pai"
  className={ cn('col-span-1',) }
  
/>
<IGRPInputText
  name="dataNascimento"
placeholder=""
  disabled
  label="Data de Nascimento"
  className={ cn('col-span-1',) }
  
/></div>
</IGRPCardContent>
  <IGRPCardFooter
  className={ cn() }
  
>
</IGRPCardFooter>
</IGRPCard></div>
<div className={ cn('col-span-4 flex flex-col gap-6',)}   >
	<IGRPCard
  className={ cn() }
  
>
  <IGRPCardHeader
  className={ cn() }
  
>
  <IGRPHeadline
  title="Contatos"
  variant="h5"
  className={ cn() }
>
</IGRPHeadline>

</IGRPCardHeader>
  <IGRPCardContent
  className={ cn('space-x-3','space-y-3','block',) }
  
>
  <div className={ cn('grid','grid-cols-1',' gap-4',)}   >
	<IGRPInputText
  name="email"
placeholder=""
  disabled
  label="Email"
  className={ cn('col-span-1',) }
  
/></div>
  <IGRPInputText
  name="telefone"
placeholder=""
  label="Telefone"
  className={ cn() }
  
/>
  <IGRPInputText
  name="modara"
placeholder=""
  disabled
  label="Morada"
  className={ cn() }
  
/>
  <IGRPInputText
  name="cxPostal"
placeholder=""
  disabled
  label="Caixa Postal"
  className={ cn() }
  
/>
</IGRPCardContent>
  <IGRPCardFooter
  className={ cn() }
  
>
</IGRPCardFooter>
</IGRPCard></div></div></div>
</>
</IGRPForm>
<IGRPHeadline
  title="Serviços Associados"
  variant="h4"
  className={ cn() }
>
</IGRPHeadline>

<IGRPDataTable<any, any>
  className={ cn() }
  columns={
    [
        {
          header: 'Tipo'
,accessorKey: 'tipoServico',
          cell: ({ row }) => {
          return row.getValue("tipoServico")
          },
        filterFn: IGRPDataTableFacetedFilterFn
        },
        {
          header: 'Descrição'
,accessorKey: 'descricaoServico',
          cell: ({ row }) => {
          return row.getValue("descricaoServico")
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
,accessorKey: 'estadoServico',
          cell: ({ row }) => {
          return row.getValue("estadoServico")
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
/></div></div>
  );
}
