'use client'


import { useState, useEffect, useRef } from 'react';
import { cn } from '@igrp/igrp-framework-react-design-system';
import { IGRPPageHeader } from "@igrp/igrp-framework-react-design-system";
import { IGRPButton } from "@igrp/igrp-framework-react-design-system";
import { IGRPStatsCard } from "@igrp/igrp-framework-react-design-system";
import { IGRPCombobox } from "@igrp/igrp-framework-react-design-system";
import { IGRPOptionsProps } from "@igrp/igrp-framework-react-design-system";
import { IGRPInputText } from "@igrp/igrp-framework-react-design-system";
import { IGRPDataTable } from "@igrp/igrp-framework-react-design-system";
import { IGRPDataTableFacetedFilterFn , IGRPDataTableDateRangeFilterFn } from "@igrp/igrp-framework-react-design-system";
import { IGRPDataTableHeaderSortToggle, IGRPDataTableHeaderSortDropdown, IGRPDataTableHeaderRowsSelect } from "@igrp/igrp-framework-react-design-system";
import { IGRPDataTableCellBadge } from "@igrp/igrp-framework-react-design-system";
import { IGRPDataTableRowAction } from "@igrp/igrp-framework-react-design-system";
import { IGRPDataTableDropdownMenu } from "@igrp/igrp-framework-react-design-system";
import { IGRPDataTableDropdownMenuAlert } from "@igrp/igrp-framework-react-design-system";
import { IGRPDataTableFilterInput } from "@igrp/igrp-framework-react-design-system";
import { useRouter } from "next/navigation";


export default function PageListautenteComponent() {

  
  type Table1 = {
    numUtente: string;
    tipoUtente: string;
    nomeUtente: string;
    nif: string;
    estado: string;
}

  const [statstatsCard2Value, setStatstatsCard2Value] = useState<string | number>(0);
  const [statstatsCard4Value, setStatstatsCard4Value] = useState<string | number>(0);
  const [statstatsCard3Value, setStatstatsCard3Value] = useState<string | number>(0);
  const [statstatsCard1Value, setStatstatsCard1Value] = useState<string | number>(0);
  const [selectcombobox2Options, setSelectcombobox2Options] = useState<IGRPOptionsProps[]>([]);
  const [selectcombobox1Options, setSelectcombobox1Options] = useState<IGRPOptionsProps[]>([]);
  const [contentTabletable1, setContentTabletable1] = useState<any[]>([]);
  
  
const router = useRouter()

function onClicknovoUtente (): void {
  router.push("novoutente");
}


  return (
<div className={ cn('page','mx-auto px-4 space-y-6',)}   >
	<div className={ cn('section',' space-x-3 space-y-3',)}   >
	<IGRPPageHeader
  title="Gestão de Utentes"
  description="Gerir todos os utentes do sistema"
  variant="h3"
  className={ cn() }
>
  <div className="flex items-center gap-2">
    <IGRPButton
  variant="default"
  size="default"
  showIcon={ true }
  iconName="Plus"
  className={ cn() }
  onClick={ () => onClicknovoUtente() }
>
  Novo Utente
</IGRPButton>

</div>
</IGRPPageHeader>

<div className={ cn('grid','grid-cols-4',' gap-4',)}   >
	<IGRPStatsCard
  variant="info"
  title="Total"
  border={ true }
  borderPosition="top"
  showIcon={ true }
  iconName="Box"
  
  value={ statstatsCard2Value }
  className={ cn() }
>
</IGRPStatsCard>
<IGRPStatsCard
  variant="destructive"
  title="Cidadãos"
  border={ true }
  borderPosition="top"
  showIcon={ true }
  iconName="Box"
  
  value={ statstatsCard4Value }
  className={ cn() }
>
</IGRPStatsCard>
<IGRPStatsCard
  variant="primary"
  title="Empresas"
  border={ true }
  borderPosition="top"
  showIcon={ true }
  iconName="Box"
  
  value={ statstatsCard3Value }
  className={ cn() }
>
</IGRPStatsCard>
<IGRPStatsCard
  variant="success"
  title="Utentes"
  border={ true }
  borderPosition="top"
  showIcon={ true }
  iconName="Box"
  
  value={ statstatsCard1Value }
  className={ cn() }
>
</IGRPStatsCard></div>
<div className={ cn(' border rounded-sm p-4',)}   >
	<div className={ cn('grid','grid-cols-5','mb-2',' gap-4',)}   >
	<IGRPCombobox
  name="combobox2"
  placeholder="Select an option..."
  label="Tipo Utente"
  selectLabel="No option found"
  gridSize="full"
  showSearch = { true }
  className={ cn('col-span-1',) }
  
  value={ undefined }
options={ selectcombobox2Options }
/>
<IGRPInputText
  name="inputText2"
placeholder=""
  label="Numero Utente"
  className={ cn('col-span-1',) }
  
/>
<IGRPInputText
  name="inputText1"
placeholder=""
  label="Nome"
  className={ cn('col-span-1',) }
  
/>
<IGRPInputText
  name="inputText3"
placeholder=""
  label="NIF"
  className={ cn('col-span-1',) }
  
/>
<IGRPCombobox
  name="combobox1"
  placeholder="Select an option..."
  label="Estado"
  selectLabel="No option found"
  gridSize="full"
  showSearch = { true }
  className={ cn('col-span-1',) }
  
  value={ undefined }
options={ selectcombobox1Options }
/></div>
<div className={ cn('flex','flex flex-row flex-wrap items-end justify-end gap-2',)}   >
	<IGRPButton
  variant="outline"
  size="default"
  showIcon={ true }
  iconName="Search"
  className={ cn() }
  
>
  Pesquisar
</IGRPButton>
</div>
<IGRPDataTable<Table1, Table1>
  showPagination={ false }
  className={ cn() }
  columns={
    [
        {
          header: ({ column }) => (<IGRPDataTableHeaderSortToggle column={column} title="Nº Utente" />)
,accessorKey: 'numUtente',
          cell: ({ row }) => {
          return row.getValue("numUtente")
          },
        filterFn: IGRPDataTableFacetedFilterFn
        },
        {
          header: ({ column }) => (<IGRPDataTableHeaderSortToggle column={column} title="Tipo" />)
,accessorKey: 'tipoUtente',
          cell: ({ row }) => {
          return row.getValue("tipoUtente")
          },
        filterFn: IGRPDataTableFacetedFilterFn
        },
        {
          header: ({ column }) => (<IGRPDataTableHeaderSortToggle column={column} title="Nome" />)
,accessorKey: 'nomeUtente',
          cell: ({ row }) => {
          return row.getValue("nomeUtente")
          },
        filterFn: IGRPDataTableFacetedFilterFn
        },
        {
          header: ({ column }) => (<IGRPDataTableHeaderSortToggle column={column} title="NIF" />)
,accessorKey: 'nif',
          cell: ({ row }) => {
          return row.getValue("nif")
          },
        filterFn: IGRPDataTableFacetedFilterFn
        },
        {
          header: ({ column }) => (<IGRPDataTableHeaderSortToggle column={column} title="Estado" />)
,accessorKey: 'estado',
          cell: ({ row }) => {
          const rowData = row.original;


return <IGRPDataTableCellBadge
  label={ row.original.estado }
  variant="outline"
className={ "" }
>

</IGRPDataTableCellBadge>
          },
        filterFn: IGRPDataTableFacetedFilterFn
        },
        {
          header: 'Acções'
,accessorKey: 'tableActionListCell1',
          enableHiding: false,cell: ({ row }) => {
          const rowData = row.original;

return (
<IGRPDataTableRowAction>
  <IGRPDataTableDropdownMenu
  items={
    [
      {
        component: IGRPDataTableDropdownMenuAlert,
        props: {
          title: "New Alert",labelTrigger: "Alert",variant: "default",showIcon: true,showCancel: true,labelCancel: "Cancel",variantCancel: "default",showConfirm: true,labelConfirm: "Confirm",variantConfirm: "default",}
      },
]
  }
>
</IGRPDataTableDropdownMenu>
</IGRPDataTableRowAction>
);
          },
        filterFn: IGRPDataTableFacetedFilterFn
        },
]
  }
  clientFilters={
    [
        {
          columnId: "numUtente",
          component: (column) => (
          <IGRPDataTableFilterInput column={column} />
          )
        },
    ]
  }
  
  data={ contentTabletable1 }
/></div></div></div>
  );
}
