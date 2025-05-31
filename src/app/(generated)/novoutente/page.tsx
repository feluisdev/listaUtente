'use client'


import { useState, useEffect, useRef } from 'react';
import { cn } from '@igrp/igrp-framework-react-design-system';
import { IGRPPageHeader } from "@igrp/igrp-framework-react-design-system";
import { IGRPButton } from "@igrp/igrp-framework-react-design-system";
import { IGRPForm } from "@igrp/igrp-framework-react-design-system";
import { IGRPFormHandle } from "@igrp/igrp-framework-react-design-system";
import { z } from "zod";
import { IGRPCard } from "@igrp/igrp-framework-react-design-system";
import { IGRPCardHeader } from "@igrp/igrp-framework-react-design-system";
import { IGRPHeadline } from "@igrp/igrp-framework-react-design-system";
import { IGRPCardContent } from "@igrp/igrp-framework-react-design-system";
import { IGRPCombobox } from "@igrp/igrp-framework-react-design-system";
import { IGRPOptionsProps } from "@igrp/igrp-framework-react-design-system";
import { IGRPInputText } from "@igrp/igrp-framework-react-design-system";
import { IGRPDatePicker } from "@igrp/igrp-framework-react-design-system";
import { IGRPCardFooter } from "@igrp/igrp-framework-react-design-system";
import {getTipoUtente} from '@/app/(myapp)/functions/services/utente-service'
import { useRouter } from "next/navigation";
import {createUtente} from '@/app/(myapp)/functions/services/utente-service'


export default function PageNovoutenteComponent() {

  
  const form1 = z.object({
    tipoUtente: z.string().optional(),
    nome: z.string().optional(),
    nif: z.string().optional(),
    bi: z.string().optional(),
    nome_mae: z.string().optional(),
    nomePai: z.string().optional(),
    dataNascimento: z.date().optional(),
    morada: z.string().optional(),
    telefone: z.string().optional(),
    email: z.string().optional(),
    inputText7: z.string().optional()
})

type Form1ZodType = typeof form1;

const initForm1: z.infer<Form1ZodType> = {
    tipoUtente: "",
    nome: "",
    nif: "",
    bi: "",
    nome_mae: "",
    nomePai: "",
    dataNascimento: undefined,
    morada: "",
    telefone: "",
    email: "",
    inputText7: ""
}


  const [contentFormform1, setContentFormform1] = useState<z.infer<any>>(initForm1);
  const [selectcombobox1Options, setSelectcombobox1Options] = useState<IGRPOptionsProps[]>([]);
  const formform1Ref = useRef<IGRPFormHandle<z.infer<anyZodType>> | null>(null);
  
const router = useRouter()

useEffect(() => {
  const loadFormData = () => {
    const options = getTipoUtente();
    setSelectcombobox1Options(options);
  };
  loadFormData();
}, []);


function onClicklistaUtente (): void {
  router.push("listautente");
}


  return (
<div className={ cn('page','mx-auto px-4 space-y-6',)}   >
	<div className={ cn('section',' space-x-3 space-y-3',)}   >
	<IGRPPageHeader
  title="Novo Utente"
  variant="h3"
  className={ cn() }
>
  <div className="flex items-center gap-2">
    <IGRPButton
  variant="secondary"
  size="default"
  showIcon={ true }
  className={ cn() }
  onClick={ () => onClicklistaUtente() }
>
  Voltar
</IGRPButton>

    <IGRPButton
  variant="default"
  size="default"
  showIcon={ true }
  iconName="Save"
  className={ cn() }
  onClick={ () => formform1Ref.current?.submit() }
>
  Gravar
</IGRPButton>

</div>
</IGRPPageHeader>

<IGRPForm
  schema={ form1 }
  validationMode="onBlur"
  gridClassName="flex flex-col"
formRef={ formform1Ref }
  className={ cn() }
  onSubmit={ createUtente }
  defaultValues={ contentFormform1 }
>
  <>
  <IGRPCard
  className={ cn() }
  
>
  <IGRPCardHeader
  className={ cn() }
  
>
  <IGRPHeadline
  title="Informações do Utente"
  variant="h6"
  className={ cn() }
>
</IGRPHeadline>

</IGRPCardHeader>
  <IGRPCardContent
  className={ cn('space-x-3','space-y-3',) }
  
>
  <div className={ cn('grid','grid-cols-4',' gap-4',)}   >
	<IGRPCombobox
  name="tipoUtente"
  placeholder="Select an option..."
  label="Tipo De Utente"
  required = { true }
  selectLabel="No option found"
  gridSize="full"
  showSearch = { true }
  className={ cn('col-span-1',) }
  
  value={ undefined }
options={ selectcombobox1Options }
/>
<IGRPInputText
  name="nome"
placeholder=""
  label="Nome Completo"
  required={ true }
  className={ cn('col-span-1',) }
  
/>
<IGRPInputText
  name="nif"
placeholder=""
  label="NIF"
  required={ true }
  className={ cn('col-span-1',) }
  
/>
<IGRPInputText
  name="bi"
placeholder=""
  label="CNI"
  required={ true }
  className={ cn('col-span-1',) }
  
/>
<IGRPInputText
  name="nome_mae"
placeholder=""
  label="Nome da Mãe"
  className={ cn('col-span-1',) }
  
/>
<IGRPInputText
  name="nomePai"
placeholder=""
  label="Nome do Pai"
  className={ cn('col-span-1',) }
  
/>
<IGRPDatePicker
  placeholder="Please select a date..."
  name="dataNascimento"
  label="Data de Nascimento"
  startDate={ new Date("1900-01-01") }
  endDate={ new Date("2099-12-31") }
  gridSize="full"
  dateFormat="dd/MM/yyyy"
  dateFormat="dd/MM/yyyy"
  today={ new Date("2025-01-01") }
  defaultMonth={ new Date("2025-01-01") }
  startMonth={ new Date("2025-01-01") }
  month={ new Date("2025-01-01") }
  endMonth={ new Date("2025-12-31") }
  numberOfMonths={ 1 }
  captionLayout="label"
  className={ cn('col-span-1',) }
  
/>
<IGRPInputText
  name="morada"
placeholder=""
  label="Morada"
  className={ cn('col-span-1',) }
  
/>
<IGRPInputText
  name="telefone"
placeholder=""
  label="Telefone"
  required={ true }
  className={ cn('col-span-1',) }
  
/>
<IGRPInputText
  name="email"
placeholder=""
  label="Email"
  required={ true }
  className={ cn('col-span-1',) }
  
/>
<IGRPInputText
  name="inputText7"
placeholder=""
  label="Caixa Postal"
  className={ cn('col-span-1',) }
  
/></div>
</IGRPCardContent>
  <IGRPCardFooter
  className={ cn() }
  
>
</IGRPCardFooter>
</IGRPCard>
</>
</IGRPForm></div></div>
  );
}
