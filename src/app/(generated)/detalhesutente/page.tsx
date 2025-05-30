'use client'


import { useState, useEffect, useRef } from 'react';
import { cn } from '@igrp/igrp-framework-react-design-system';
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
import { IGRPDataTableRowAction } from "@igrp/igrp-framework-react-design-system";
import { useRouter } from "next/navigation";


export default function PageDetalhesutenteComponent() {

  const [contentTabletable1, setContentTabletable1] = useState<any[]>([]);
  
  
const router = useRouter()

function goTolistaUtente (): void {
  router.push("listautente");
}


  return (
<div className={ cn('page','mx-auto px-4 space-y-6',)}   >
	<div className={ cn('section',' space-x-3 space-y-3',)}   >
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
  name="inputText5"
placeholder=""
  disabled
  label="Nome"
  className={ cn('col-span-1',) }
  
/>
<IGRPInputText
  name="inputText1"
placeholder=""
  disabled
  label="NIF"
  className={ cn('col-span-1',) }
  
/>
<IGRPInputText
  name="inputText4"
placeholder=""
  disabled
  label="CNI"
  className={ cn('col-span-1',) }
  
/>
<IGRPInputText
  name="inputText3"
placeholder=""
  disabled
  label="Estado"
  className={ cn('col-span-1',) }
  
/>
<IGRPInputText
  name="inputText2"
placeholder=""
  disabled
  label="Nome da Mãe"
  className={ cn('col-span-1',) }
  
/>
<IGRPInputText
  name="inputText9"
placeholder=""
  disabled
  label="Nome do Pai"
  className={ cn('col-span-1',) }
  
/>
<IGRPInputText
  name="inputText10"
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
</IGRPCardHeader>
  <IGRPCardContent
  className={ cn('space-x-3','space-y-3','block',) }
  
>
  <div className={ cn('grid','grid-cols-1',' gap-4',)}   >
	<IGRPInputText
  name="inputText6"
placeholder=""
  disabled
  label="Email"
  className={ cn('col-span-1',) }
  
/></div>
  <IGRPInputText
  name="inputText7"
placeholder=""
  label="Telefone"
  className={ cn() }
  
/>
  <IGRPInputText
  name="inputText8"
placeholder=""
  disabled
  label="Morada"
  className={ cn() }
  
/>
  <IGRPInputText
  name="inputText11"
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
</IGRPCard></div></div>
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
,accessorKey: 'tableTextCell1',
          cell: ({ row }) => {
          return row.getValue("tableTextCell1")
          },
        filterFn: IGRPDataTableFacetedFilterFn
        },
        {
          header: 'Descrição'
,accessorKey: 'tableTextCell2',
          cell: ({ row }) => {
          return row.getValue("tableTextCell2")
          },
        filterFn: IGRPDataTableFacetedFilterFn
        },
        {
          header: 'Referência'
,accessorKey: 'tableTextCell3',
          cell: ({ row }) => {
          return row.getValue("tableTextCell3")
          },
        filterFn: IGRPDataTableFacetedFilterFn
        },
        {
          header: 'Data Inicio'
,accessorKey: 'tableTextCell4',
          cell: ({ row }) => {
          return row.getValue("tableTextCell4")
          },
        filterFn: IGRPDataTableFacetedFilterFn
        },
        {
          header: 'Data Fim'
,accessorKey: 'tableTextCell5',
          cell: ({ row }) => {
          return row.getValue("tableTextCell5")
          },
        filterFn: IGRPDataTableFacetedFilterFn
        },
        {
          header: 'Estado'
,accessorKey: 'tableTextCell7',
          cell: ({ row }) => {
          return row.getValue("tableTextCell7")
          },
        filterFn: IGRPDataTableFacetedFilterFn
        },
        {
          header: 'Ações'
,accessorKey: 'tableActionListCell1',
          enableHiding: false,cell: ({ row }) => {
          const rowData = row.original;

return (
<IGRPDataTableRowAction>
</IGRPDataTableRowAction>
);
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
