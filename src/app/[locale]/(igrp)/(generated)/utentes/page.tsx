'use client'

/* THIS FILE WAS GENERATED AUTOMATICALLY BY iGRP STUDIO. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, useRef } from 'react';
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
import {getEstado} from '@/app/[locale]/(myapp)/functions/services/config-service'
import {getTipoUtente} from '@/app/[locale]/(myapp)/functions/services/config-service'
import {fetchUtentes} from '@/app/[locale]/(myapp)/functions/services/utente-service'
import { useRouter } from "next/navigation";
import {getStatusBadge} from '@/app/[locale]/(myapp)/functions/services/config-service'


export default function PageUtentesComponent() {

  
  type Table1 = {
    numero: string;
    tipoUtente: string;
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
  
  
const router = useRouter()

const [loading, setLoading] = useState(false)
useEffect(() => {
  let isMounted = true; // flag de controle

  const loadData = async () => {    

    setLoading(true);      
    
    setSelectcomboEstadoOptions(getEstado);
    setSelectcombobox2Options(getTipoUtente);
    try {
      const { list, total, options,totalCamara,totalCidadao,totalEmpresa } = await fetchUtentes(); // toda a lógica está aqui

      if (isMounted){
        setContentTabletable1(list);   

         setStatstatTotalValue(total);
        setStatstatsCard1Value(totalCamara);
        setStatstatsCard3Value(totalEmpresa);
        setStatstatsCard4Value(totalCidadao);    

        /*   setList(data.list);
          setOptions(data.options);
          setTotal(data.total);
          setMessage(data.message); */
      }
    }  catch (e) {
      if (isMounted) console.error(e);
    } finally {
      if (isMounted) setLoading(false);
    }
  };

  loadData();

  return () => {
    isMounted = false; // cleanup quando o componente for desmontado
  };
}, []);

function goTonovoUtente (row?: any): void {
  router.push(`/utentes/novo`);
}


  return (
<div className={ cn('page','space-y-6',)}    >
	<div className={ cn('section',' space-x-3 space-y-3',)}    >
	<IGRPPageHeader
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
  
  options={ selectcombobox2Options }
>
</IGRPCombobox>
<IGRPInputText
  name={ `inputText2` }
  label={ `Numero Utente` }
placeholder={ undefined }
helperText={ undefined }
showIcon={ false }
disabled={ false }
required={ false }


  className={ cn('col-span-1',) }
  
  value={ undefined }
>
</IGRPInputText>
<IGRPInputText
  name={ `inputText1` }
  label={ `Nome` }
placeholder={ undefined }
helperText={ undefined }
showIcon={ false }
disabled={ false }
required={ false }


  className={ cn('col-span-1',) }
  
  value={ undefined }
>
</IGRPInputText>
<IGRPInputText
  name={ `inputText3` }
  label={ `NIF` }
placeholder={ undefined }
helperText={ undefined }
showIcon={ false }
disabled={ false }
required={ false }


  className={ cn('col-span-1',) }
  
  value={ undefined }
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
  
  options={ selectcomboEstadoOptions }
>
</IGRPCombobox></div>
<div className={ cn('flex','flex-1','flex flex-row flex-nowrap items-stretch justify-end gap-2',)}    >
	<IGRPButton
  name={ `button2` }
  
variant={ `secondary` }
size={ `default` }
showIcon={ true }
iconName={ `Search` }

  className={ cn() }
  onClick={ () => {} }
  
>
  Pesquisar
</IGRPButton></div>
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
,accessorKey: 'tipoUtente',
          cell: ({ row }) => {
          return row.getValue("tipoUtente")
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
          modalTitle: `New Alert`,labelTrigger: `Inativar`,          showIcon: true,showCancel: true,labelCancel: `Cancel`,variantCancel: `default`,showConfirm: true,labelConfirm: `Confirm`,variantConfirm: `default`,          onClickConfirm: (e) => {},
          children: <>A new alert triggered</>
}
      },
      {
        component: IGRPDataTableDropdownMenuLink,
        props: {
          labelTrigger: `Editar`,icon: `UserPen`,href: `/utentes/${row.original.id}/edit`,          showIcon: true,          action: (e) => {},
}
      },
      {
        component: IGRPDataTableDropdownMenuLink,
        props: {
          labelTrigger: `Detalhes`,icon: `UserCog`,href: `/utentes/${row.original.id}/detalhes`,          showIcon: true,          action: (e) => {},
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
