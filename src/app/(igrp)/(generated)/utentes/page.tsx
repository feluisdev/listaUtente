'use client'

/* THIS FILE WAS GENERATED AUTOMATICALLY BY iGRP STUDIO. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { use, useState, useEffect, useRef } from 'react';
import { cn, useIGRPMenuNavigation, useIGRPToast } from '@igrp/igrp-framework-react-design-system';
import { IGRPOptionsProps } from "@igrp/igrp-framework-react-design-system";
import { IGRPDataTableFacetedFilterFn , IGRPDataTableDateRangeFilterFn } from "@igrp/igrp-framework-react-design-system";
import { IGRPDataTableHeaderSortToggle, IGRPDataTableHeaderSortDropdown, IGRPDataTableHeaderRowsSelect } from "@igrp/igrp-framework-react-design-system";
import { 
  IGRPPageHeader,
	IGRPButton,
	IGRPStatsCard,
	IGRPCombobox,
	IGRPInputText,
	IGRPDataTable,
	IGRPDataTableCellBadge,
	IGRPDataTableRowAction,
	IGRPDataTableDropdownMenu,
	IGRPDataTableDropdownMenuAlert,
	IGRPDataTableDropdownMenuLink 
} from "@igrp/igrp-framework-react-design-system";
import {getEstado} from '@/app/(myapp)/functions/services/config-service'
import {getTipoUtente} from '@/app/(myapp)/functions/services/config-service'
import {useFetchUtentes} from '@/app/(myapp)/functions/services/utente-service'
import { useRouter } from "next/navigation";
import {getStatusBadge} from '@/app/(myapp)/functions/services/config-service'
import {deleteUtente} from '@/app/(myapp)/functions/services/utente-service'


export default function PageUtentesComponent() {


  
  type Table1 = {
    numero: string;
    tipoUtenteDesc: string;
    nome: string;
    nif: string;
    estado: string;
    id: number;
}

  const [statstatTotalValue, setStatstatTotalValue] = useState<string | number>(0);
  const [statstatsCard4Value, setStatstatsCard4Value] = useState<string | number>(0);
  const [statstatsCard3Value, setStatstatsCard3Value] = useState<string | number>(0);
  const [statstatsCard1Value, setStatstatsCard1Value] = useState<string | number>(0);
  const [selectcombobox2Options, setSelectcombobox2Options] = useState<IGRPOptionsProps[]>([]);
  const [selectcomboEstadoOptions, setSelectcomboEstadoOptions] = useState<IGRPOptionsProps[]>([]);
  const [contentTabletable1, setContentTabletable1] = useState<Table1[]>([]);
  
  
const [numeroFlt, setNumeroFlt] = useState<any>(undefined);

const [tpUtenteFlt, setTpUtenteFlt] = useState<any>(undefined);

const [estadoFlt, setEstadoFlt] = useState<string>(`ATIVO`);

const [nifFlt, setNifFlt] = useState<any>(undefined);

const [nomeFlt, setNomeFlt] = useState<any>(undefined);

const { igrpToast } = useIGRPToast()

const router = useRouter()

const { data, stats, isLoading } = useFetchUtentes({
 tipo: tpUtenteFlt,
 numeroUtente: numeroFlt,
 estado: estadoFlt,
 nome: nomeFlt,
 nif: nifFlt
});

useEffect(() => {

  if (isLoading || !data) return

  console.log(data)

  setContentTabletable1(data?.content);
  setStatstatTotalValue(stats?.total ?? 0);
  setStatstatsCard1Value(stats?.totalCamara ?? 0);
  setStatstatsCard3Value(stats?.totalEmpresa ?? 0);
  setStatstatsCard4Value(stats?.totalCidadao ?? 0);

}, [isLoading, data])

useEffect(() => {
  const loadData = async () => {
    setSelectcomboEstadoOptions(getEstado);
    setSelectcombobox2Options(getTipoUtente);
  };

  loadData();
}, []);

function goTonovoUtente (row?: any): void {
  router.push(`/utentes/novo`);
}


  return (
<div className={ cn('page','space-y-6',)}    >
	<div className={ cn('section',' space-x-3 space-y-3',)}    >
	<IGRPPageHeader
  name={ `pageHeader1` }
  title={ `Gestão de Utentes` }
  description={ `Gerir todos os utentes do sistema` }
  variant={ `h3` }
  className={ cn() }
  
>
  <div className="flex items-center gap-2">
    <IGRPButton
  name={ `button1` }
  
variant={ `default` }
size={ `default` }
showIcon={ true }
iconName={ `Plus` }

  className={ cn() }
  onClick={ () => goTonovoUtente() }
  
>
  Novo Utente
</IGRPButton>
</div>
</IGRPPageHeader>

<div className={ cn('grid','grid-cols-1 ','md:grid-cols-2 ','lg:grid-cols-4 ',' gap-4',)}    >
	<IGRPStatsCard
  name={ `statTotal` }
  cardBorderPosition={ `top` }
cardBorder={ `rounded-xl` }
cardVariant={ `primary` }
iconBackground={ `none` }
title={ `Total` }
titleSize={ `sm` }
valueSize={ `2xl` }
showIcon={ true }
iconName={ `Box` }
iconSize={ `md` }
iconVariant={ `primary` }
iconPlacement={ `end` }
itemPlacement={ `start` }

  className={ cn('col-span-1',) }
  
  value={ statstatTotalValue }
>
</IGRPStatsCard>
<IGRPStatsCard
  name={ `statsCard4` }
  cardBorderPosition={ `top` }
cardBorder={ `rounded-xl` }
cardVariant={ `primary` }
iconBackground={ `none` }
title={ `Cidadãos` }
titleSize={ `sm` }
valueSize={ `2xl` }
showIcon={ true }
iconName={ `Box` }
iconSize={ `md` }
iconVariant={ `primary` }
iconPlacement={ `end` }
itemPlacement={ `start` }

  className={ cn('col-span-1',) }
  
  value={ statstatsCard4Value }
>
</IGRPStatsCard>
<IGRPStatsCard
  name={ `statsCard3` }
  cardBorderPosition={ `top` }
cardBorder={ `rounded-xl` }
cardVariant={ `primary` }
iconBackground={ `none` }
title={ `Empresas` }
titleSize={ `sm` }
valueSize={ `2xl` }
showIcon={ true }
iconName={ `Box` }
iconSize={ `md` }
iconVariant={ `primary` }
iconPlacement={ `end` }
itemPlacement={ `start` }

  className={ cn('col-span-1',) }
  
  value={ statstatsCard3Value }
>
</IGRPStatsCard>
<IGRPStatsCard
  name={ `statsCard1` }
  cardBorderPosition={ `top` }
cardBorder={ `rounded-xl` }
cardVariant={ `primary` }
iconBackground={ `none` }
title={ `Entidade Público` }
titleSize={ `sm` }
valueSize={ `2xl` }
showIcon={ true }
iconName={ `Box` }
iconSize={ `md` }
iconVariant={ `primary` }
iconPlacement={ `end` }
itemPlacement={ `start` }

  className={ cn('col-span-1',) }
  
  value={ statstatsCard1Value }
>
</IGRPStatsCard></div>
<div className={ cn(' border rounded-sm p-4',)}    >
	<div className={ cn('grid','grid-cols-1 ','md:grid-cols-2 ','lg:grid-cols-4 ','mb-2',' gap-4',)}    >
	<IGRPCombobox
  name={ `combobox2` }
  label={ `Tipo Utente` }
variant={ `single` }
placeholder={ `Select an option...` }
selectLabel={ `No option found` }
showSearch={ true }
showIcon={ false }
iconName={ `CornerDownRight` }


gridSize={ `full` }

  className={ cn('col-span-1',) }
  onChange={ (value)=>{setTpUtenteFlt(value as string)
} }
  options={ selectcombobox2Options }
>
</IGRPCombobox>
<IGRPInputText
  name={ `inputText2` }
  label={ `Numero Utente` }
showIcon={ false }
required={ false }


  className={ cn('col-span-1',) }
  onChange={ (e)=>setNumeroFlt(e.target.value) }
  value={ numeroFlt }
>
</IGRPInputText>
<IGRPInputText
  name={ `inputText1` }
  label={ `Nome` }
showIcon={ false }
required={ false }


placeholder={ undefined }
helperText={ undefined }
disabled={ false }
  className={ cn('col-span-1',) }
  onChange={ (e)=>setNomeFlt(e.target.value)
 }
  value={ nomeFlt }
>
</IGRPInputText>
<IGRPInputText
  name={ `inputText3` }
  label={ `NIF` }
showIcon={ false }
required={ false }


placeholder={ undefined }
helperText={ undefined }
disabled={ false }
  className={ cn('col-span-1',) }
  onChange={ (e) => setNifFlt(e.target.value)
 }
  value={ nifFlt }
>
</IGRPInputText>
<IGRPCombobox
  name={ `comboEstado` }
  label={ `Estado` }
variant={ `single` }
placeholder={ `Select an option...` }
selectLabel={ `No option found` }
showSearch={ true }
showIcon={ false }
iconName={ `CornerDownRight` }


gridSize={ `full` }

  className={ cn('col-span-1',) }
  onChange={ (value)=>setEstadoFlt(value as string)
 }
  options={ selectcomboEstadoOptions }
value={ estadoFlt }
>
</IGRPCombobox></div>
<IGRPDataTable<Table1, Table1>
  className={ cn() }
  columns={
    [
        {
          header: ({ column }) => (<IGRPDataTableHeaderSortToggle column={column} title={ `Nº Utente` } />)
,accessorKey: 'numero',
          cell: ({ row }) => {
          return row.getValue("numero")
          },
          filterFn: IGRPDataTableFacetedFilterFn
        },
        {
          header: ({ column }) => (<IGRPDataTableHeaderSortToggle column={column} title={ `Tipo` } />)
,accessorKey: 'tipoUtenteDesc',
          cell: ({ row }) => {
          return row.getValue("tipoUtenteDesc")
          },
          filterFn: IGRPDataTableFacetedFilterFn
        },
        {
          header: ({ column }) => (<IGRPDataTableHeaderSortToggle column={column} title={ `Nome` } />)
,accessorKey: 'nome',
          cell: ({ row }) => {
          return row.getValue("nome")
          },
          filterFn: IGRPDataTableFacetedFilterFn
        },
        {
          header: ({ column }) => (<IGRPDataTableHeaderSortToggle column={column} title={ `NIF` } />)
,accessorKey: 'nif',
          cell: ({ row }) => {
          return row.getValue("nif")
          },
          filterFn: IGRPDataTableFacetedFilterFn
        },
        {
          header: ({ column }) => (<IGRPDataTableHeaderSortToggle column={column} title={ `Estado` } />)
,accessorKey: 'estado',
          cell: ({ row }) => {
          const rowData = row.original;

const { iconName, bgClass, textClass, label, className } = getStatusBadge(rowData);

return <IGRPDataTableCellBadge
  label={ label ?? row.original.estado }
  variant={ `soft` }
badgeClassName={ `${bgClass} ${textClass} ${className}` }
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
          modalTitle: `Inativar`,labelTrigger: `Inativar`,          showIcon: true,showCancel: true,labelCancel: `Cancel`,variantCancel: `default`,showConfirm: true,labelConfirm: `Confirm`,variantConfirm: `default`,          onClickConfirm: async () => {  try {
     await deleteUtente(rowData.id);
     setContentTabletable1(prev =>
      prev.map(r => (r.id === rowData.id ? { ...r, estado: 'INATIVO' } : r))
    );

    igrpToast({
      title: 'Sucesso',
      description: 'Utente inativado com sucesso!',
      type: 'success',
    });
    router.refresh();
  } catch (error) {
    igrpToast({
      title: 'Erro',
      description: 'Falha ao inativar o utente',
      type: 'error',
    });
  }
},
          children: <>Deseja inativar o utente?</>
}
      },
      {
        component: IGRPDataTableDropdownMenuLink,
        props: {
          labelTrigger: `Editar`,icon: `UserPen`,href: `/utentes/${row.original.id}/edit`,          showIcon: true,          
}
      },
      {
        component: IGRPDataTableDropdownMenuLink,
        props: {
          labelTrigger: `Detalhes`,icon: `UserCog`,href: `/utentes/${row.original.id}/detalhes`,          showIcon: true,          
}
      },
      {
        component: IGRPDataTableDropdownMenuLink,
        props: {
          labelTrigger: `Divida do Utente`,icon: `CreditCard`,href: `/utentes/${row.original.id}/divida`,          showIcon: true,          
}
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
    ]
  }
  
  data={ contentTabletable1 }
/></div></div></div>
  );
}
