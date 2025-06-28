'use client'

/* THIS FILE WAS GENERATED AUTOMATICALLY BY iGRP STUDIO. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, useRef } from 'react';
import { cn, useIGRPMenuNavigation, useIGRPToast } from '@igrp/igrp-framework-react-design-system';
import { IGRPFormHandle } from "@igrp/igrp-framework-react-design-system";
import { z } from "@igrp/igrp-framework-react-design-system"
import { IGRPOptionsProps } from "@igrp/igrp-framework-react-design-system";
import { IGRPDataTableFacetedFilterFn , IGRPDataTableDateRangeFilterFn } from "@igrp/igrp-framework-react-design-system";
import { IGRPDataTableHeaderSortToggle, IGRPDataTableHeaderSortDropdown, IGRPDataTableHeaderRowsSelect } from "@igrp/igrp-framework-react-design-system";
import NovoUtenteModal from '@/app/[locale]/(igrp)/(generated)/listautente/components/novoutentemodal'
import { 
  IGRPPageHeader,
	IGRPButton,
	IGRPStatsCard,
	IGRPForm,
	IGRPCombobox,
	IGRPInputText,
	IGRPDataTable,
	IGRPDataTableCellBadge,
	IGRPDataTableRowAction,
	IGRPDataTableButtonModal,
	IGRPDataTableDropdownMenu,
	IGRPDataTableDropdownMenuLink,
	IGRPDataTableDropdownMenuAlert,
	IGRPDataTableFilterInput 
} from "@igrp/igrp-framework-react-design-system";
import {fetchUtentes} from '@/app/(myapp)/functions/services/utente-service'
import {getEstado, getTipoUtente} from '@/app/(myapp)/functions/services/config-service'
import {getStatusBadge} from '@/app/(myapp)/functions/services/config-service'
import { useRouter } from "next/navigation";


export default function PageListautenteComponent() {

  
  type Table1 = {
    numeroUtente: string;
    tipoUtente: string;
    nomeUtente: string;
    nif: string;
    estado: string;
    id: number;
}

  const [contentFormform1, setContentFormform1] = useState<z.infer<any>>(null);
  const formform1Ref = useRef<IGRPFormHandle<anyZodType> | null>(null);
  
const [openModal, setOpenModal] = useState<boolean>(false);

const router = useRouter()

const [loading, setLoading] = useState(false)
useEffect(() => {
  let isMounted = true; // flag de controle

  const loadData = async () => {    

    setLoading(true);      
    
    setSelectcombobox1Options(getEstado);
    setSelectcombobox2Options(getTipoUtente);
    try {
      const { list, total, options,totalCamara,totalCidadao,totalEmpresa } = await fetchUtentes(inputSearchinputSearch1Value); // toda a lógica está aqui

      if (isMounted){
        setContentTabletable1(list);   

        setStatstatsCard2Value(total);
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
}, [inputSearchinputSearch1Value]);

function goTonovoUtente (row?: any): void {
  router.push(`/novoutente?id=%7Bid%7D`);
}


  return (
<div className={ cn('page','space-y-6',)}    >
	<div className={ cn('section',' space-x-3 space-y-3',)}    >
	<IGRPPageHeader
  title={ `Gestão de Utentes` }
  description={ `Gerir todos os utentes do sistema` }
  variant={ `h3` }
  
>
  <div className="flex items-center gap-2">
    <IGRPButton
  name={ `button1` }
  
variant={ `default` }
size={ `default` }
showIcon={ true }
iconName={ `Plus` }

  className={ cn() }
  onClick={ () => setOpenModal(!openModal)

 }
  
>
  Button
</IGRPButton>
</div>
</IGRPPageHeader>

<div className={ cn('grid','grid-cols-4',' gap-4',)}    >
	<IGRPStatsCard
  name={ `statTotal` }
  variant={ `info` }
borderPosition={ `top` }
border={ true }
title={ `Total` }
showIcon={ true }
iconName={ `Box` }

  
  value={ statstatsCard2Value }
>
</IGRPStatsCard>
<IGRPStatsCard
  name={ `statsCard4` }
  variant={ `destructive` }
borderPosition={ `top` }
border={ true }
title={ `Cidadãos` }
showIcon={ true }
iconName={ `Box` }

  
  value={ statstatsCard4Value }
>
</IGRPStatsCard>
<IGRPStatsCard
  name={ `statsCard3` }
  variant={ `primary` }
borderPosition={ `top` }
border={ true }
title={ `Empresas` }
showIcon={ true }
iconName={ `Box` }

  
  value={ statstatsCard3Value }
>
</IGRPStatsCard>
<IGRPStatsCard
  name={ `statsCard1` }
  variant={ `success` }
borderPosition={ `top` }
border={ true }
title={ `Entidade Público` }
showIcon={ true }
iconName={ `Box` }

cardBorderPosition={ `top` }
cardBorder={ `rounded-xl` }
cardVariant={ `primary` }
iconBackground={ `none` }
showIconBackground={ false }
showIconBorder={ false }
titleSize={ `sm` }
valueSize={ `2xl` }
itemPlacement={ `start` }
  
  value={ statstatsCard1Value }
>
</IGRPStatsCard></div>
<div className={ cn(' border rounded-sm p-4',)}    >
	<IGRPForm
  validationMode={ `onBlur` }
  gridClassName={ `flex flex-col` }
formRef={ formform1Ref }
  className={ cn() }
  onSubmit={ (e) => {} }
  defaultValues={ contentFormform1 }
>
  <>
  <div className={ cn('grid','grid-cols-1',' gap-4',)}    >
	<div className={ cn('grid','grid-cols-5','mb-2',' gap-4',)}    >
	<IGRPCombobox
  name={ `combobox2` }
  label={ `Tipo Utente` }
variant={ `single` }
placeholder={ `Select an option...` }
selectLabel={ `No option found` }
showSearch={ true }
gridSize={ `full` }


  className={ cn('col-span-1',) }
  
  value={ undefined }
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
gridSize={ `full` }


  className={ cn('col-span-1',) }
  
  value={ undefined }
options={ selectcombobox1Options }
>
</IGRPCombobox></div></div>
  <IGRPButton
  name={ `button2` }
  
variant={ `secondary` }
size={ `default` }
showIcon={ false }
disabled={ false }

  onClick={ () => {} }
  
>
  Pesquisar
</IGRPButton>
</>
</IGRPForm>
<IGRPDataTable<Table1, Table1>
  showPagination={ false }
  className={ cn() }
  columns={
    [
        {
          header: ({ column }) => (<IGRPDataTableHeaderSortToggle column={column} title={ `Nº Utente` } />)
,accessorKey: 'numeroUtente',
          cell: ({ row }) => {
          return row.getValue("numeroUtente")
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
,accessorKey: 'nomeUtente',
          cell: ({ row }) => {
          return row.getValue("nomeUtente")
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
          id: 'tableActionListCell1',
          enableHiding: false,cell: ({ row }) => {
          const rowData = row.original;

return (
<IGRPDataTableRowAction>
  <IGRPDataTableButtonModal
  labelTrigger={ `Editar` }
  variant={ `default` }
  icon={ `Pencil` }
  variantCancel={ `default` }
  variantConfirm={ `default` }
  modalTitle={ `Editar` }
  className={ cn('',) }
  onClickConfirm={ () => goTonovoUtente() }
>
</IGRPDataTableButtonModal>
  <IGRPDataTableDropdownMenu
  items={
    [
      {
        component: IGRPDataTableDropdownMenuLink,
        props: {
          labelTrigger: `Detalhes Utente`,icon: `UserRoundSearch`,href: `/${row.original.id}/detalhesutente`,          showIcon: true,          action: (e) => {},
}
      },
      {
        component: IGRPDataTableDropdownMenuAlert,
        props: {
          modalTitle: `Eliminar Utente`,labelTrigger: `Eliminar`,icon: `CircleX`,          showIcon: true,showCancel: true,labelCancel: `Cancelar`,variantCancel: `default`,showConfirm: true,labelConfirm: `Confirmar`,variantConfirm: `destructive`,          onClickConfirm: (e) => {},
          children: <>Deseja Eliminar o Utente</>
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
        {
          columnId: `numUtente`,
          component: (column) => (
          <IGRPDataTableFilterInput column={column} />
          )
        },
    ]
  }
  
  data={ contentTabletable1 }
/></div>
<NovoUtenteModal  open={ openModal }  setOpen={ () => setOpenModal(!openModal)
 } ></NovoUtenteModal></div></div>
  );
}
