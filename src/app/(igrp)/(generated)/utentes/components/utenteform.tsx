'use client'

/* THIS FILE WAS GENERATED AUTOMATICALLY BY iGRP STUDIO. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { use, useState, useEffect, useRef } from 'react';
import { cn, useIGRPMenuNavigation, useIGRPToast } from '@igrp/igrp-framework-react-design-system';
import { IGRPFormHandle } from "@igrp/igrp-framework-react-design-system";
import { z } from "zod"
import { IGRPOptionsProps } from "@igrp/igrp-framework-react-design-system";
import { 
  IGRPPageHeader,
	IGRPButton,
	IGRPForm,
	IGRPCard,
	IGRPCardHeader,
	IGRPHeadline,
	IGRPCardContent,
	IGRPCombobox,
	IGRPInputText,
	IGRPDatePicker,
	IGRPCardFooter 
} from "@igrp/igrp-framework-react-design-system";
import {updateOrCreateUtente} from '@/app/(myapp)/functions/services/utente-service'
import {getTipoUtente} from '@/app/(myapp)/functions/services/config-service'
import {getGenero} from '@/app/(myapp)/functions/services/config-service'
import {getTipoDocumento} from '@/app/(myapp)/functions/services/config-service'
import {useFetchPessoaByNif} from '@/app/(myapp)/functions/services/utente-service'
import {useFetchPessoaByIdentificacao} from '@/app/(myapp)/functions/services/utente-service'

export default function Utenteform({ isEdit, utente } : { isEdit?: boolean, utente?: any }) {

  
  const form1 = z.object({
    tipoUtente: z.string().nonempty(),
    nif: z.string().min(9).max(9).nonempty(),
    tipoIdentificacao: z.string().nonempty(),
    identificacao: z.string().nonempty(),
    nomeMae: z.string().optional(),
    nome: z.string().nonempty(),
    nomePai: z.string().optional(),
    dataNascimento: z.date().optional(),
    genero: z.string().optional(),
    nacionalidade: z.string().optional(),
    endereco: z.string().nonempty(),
    telefone: z.string().min(7).max(7).nonempty(),
    email: z.string().regex(/^[^@]+@[^@]+$/).email().includes("@").nonempty(),
    caixaPostal: z.string().optional(),
    departamentoResponsavel: z.string().optional()
})

type Form1ZodType = typeof form1;

const initForm1: z.infer<Form1ZodType> = {
    tipoUtente: ``,
    nif: ``,
    tipoIdentificacao: ``,
    identificacao: ``,
    nomeMae: ``,
    nome: ``,
    nomePai: ``,
    dataNascimento: undefined,
    genero: ``,
    nacionalidade: ``,
    endereco: ``,
    telefone: ``,
    email: ``,
    caixaPostal: ``,
    departamentoResponsavel: ``
}


  const formform1Ref = useRef<IGRPFormHandle<Form1ZodType> | null>(null);
  const [form1Data, setForm1Data] = useState<any>(initForm1);
  const [selecttipoUtenteOptions, setSelecttipoUtenteOptions] = useState<IGRPOptionsProps[]>([]);
  const [selecttipoIdentificacaoOptions, setSelecttipoIdentificacaoOptions] = useState<IGRPOptionsProps[]>([]);
  const [selectgeneroOptions, setSelectgeneroOptions] = useState<IGRPOptionsProps[]>([]);
  
const [pageHeader1Title, setPageHeader1Title] = useState<string>('Novo Utente');

const [isCidadao, setIsCidadao] = useState<boolean>(false);

const [nifValue, setNifValue] = useState<string>('');

const [searchIdentificacao, setSearchIdentificacao] = useState<string>('');

const [tipoIdentificacaoValue, setTipoIdentificacaoValue] = useState<string>('');

const { igrpToast } = useIGRPToast()

async function handleUtenteSubmit (values: z.infer<any>): Promise<void  | undefined> {

  try {
  // Prepare the data for the cessar operation
  const data = {
    ...utente,
    ...values,
  };

  if (data.tipoUtente === 'EMPRESA' && data.nif && !String(data.nif).startsWith('2')) {
    igrpToast({
      title: 'Erro',
      description: 'NIF para empresa inválido. Deve começar por 2.',
      type: 'error',
    });
    return;
  }

  // Call the cessar function
  await updateOrCreateUtente(data);
  igrpToast({
    title: 'Sucesso',
    description: 'Operacao efetuado com sucesso!',
    type: 'success',
  });
  if (!isEdit) {
    formform1Ref.current?.reset(initForm1);
    setForm1Data(initForm1);
  }
} catch (error: any) {
  console.error('Error cessing utente:', error);
  igrpToast({
    title: 'Erro',
    description: `${error.message}`,
    type: 'error',
  });
}

}

const { data, isLoading } = useFetchPessoaByNif(nifValue)

const { data: dataIdentificacao, isLoading: isLoadingIdentificacao } = useFetchPessoaByIdentificacao({
  tipoIdentificacao: tipoIdentificacaoValue, identificacao: searchIdentificacao
});

useEffect(() => {
  if (isLoading || !data || !data?.Entries?.Entry) return;
  formform1Ref.current?.setValue('nome', data.Entries.Entry.NOME);
  formform1Ref.current?.setValue('nomeMae', data.Entries.Entry.NM_MAE);
  formform1Ref.current?.setValue('nomePai', data.Entries.Entry.NM_PAI);
  formform1Ref.current?.setValue('endereco', data.Entries.Entry.MORADA);
}, [isLoading, data]);

useEffect(() => {
  if (formform1Ref.current) {
    const subscription = formform1Ref.current.watch((value) => {
      if (value.nif?.length === 9) setNifValue(value.nif || '');
      if (value.identificacao?.length && value.identificacao?.length > 4) setSearchIdentificacao(value.identificacao || '');
    });

    return () => subscription.unsubscribe();
  }
}, []);

useEffect(() => {
  if (isLoadingIdentificacao || !dataIdentificacao || !dataIdentificacao?.Entries?.Entry) return;


  formform1Ref.current?.setValue('nome', dataIdentificacao.Entries.Entry.NOME);
  formform1Ref.current?.setValue('nomeMae', dataIdentificacao.Entries.Entry.NOME_MAE);
  formform1Ref.current?.setValue('nomePai', dataIdentificacao.Entries.Entry.NOME_PAI);
  // Convert the date from DD-MM-YYYY format to a proper Date object
  const dateString = dataIdentificacao.Entries.Entry.DT_NASC;
  let dataNascimento;

  if (dateString) {
    // Parse DD-MM-YYYY format
    const [day, month, year] = dateString.split('-');
    dataNascimento = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  } else {
    dataNascimento = new Date();
  }

  formform1Ref.current?.setValue('dataNascimento', dataNascimento);
  formform1Ref.current?.setValue('genero', dataIdentificacao.Entries.Entry.SEXO);
  formform1Ref.current?.setValue('endereco', dataIdentificacao.Entries.Entry.RESIDENCIA);

}, [isLoadingIdentificacao, dataIdentificacao]);

useEffect(() => {
  setPageHeader1Title(isEdit ? 'Editar Utente' : 'Novo Utente')
}, [isEdit])

useEffect(() => {
  const loadFormData = async () => {
    // Carregar opções do combobox
    const options = getTipoUtente();
    const optionsGenero = getGenero();
    const optionsTpDocs = getTipoDocumento();
    setSelecttipoUtenteOptions(options || []);
    setSelectgeneroOptions(optionsGenero || [])
    setSelecttipoIdentificacaoOptions(optionsTpDocs || [])
  };

  loadFormData();
}, []);

useEffect(() => {

  if (utente) {
    if (utente.dataNascimento === null || utente.dataNascimento === undefined) {
      delete utente.dataNascimento;
    }
    if (utente.nacionalidade === null || utente.nacionalidade === undefined) {
      delete utente.nacionalidade;
    }
    setForm1Data(utente);
    setIsCidadao(utente.tipoUtente === 'CIDADAO');
  }
}, [utente]);

useEffect(() => {
  const optionsTpDocs = getTipoDocumento();
  
  if (isCidadao) {
    setSelecttipoIdentificacaoOptions(optionsTpDocs.filter((option) => option.value !== 'NIPC') || []);
  } else {
    setSelecttipoIdentificacaoOptions(optionsTpDocs.filter((option) => option.value === 'NIPC') || []);
  }
}, [isCidadao]);


  return (
<div className={ cn('component',)}    >
	<IGRPPageHeader
  name={ `pageHeader1` }
  iconBackButton={ `ArrowLeft` }
  showBackButton={ true }
  urlBackButton={ `/utentes` }
  variant={ `h3` }
  className={ cn() }
  title={ pageHeader1Title }
>
  <div className="flex items-center gap-2">
    <IGRPButton
  name={ `button2` }
  variant={ `default` }
size={ `default` }
showIcon={ true }
iconName={ `Save` }
  className={ cn() }
  onClick={ () => formform1Ref.current?.submit() }
  
>
  Salvar
</IGRPButton>
</div>
</IGRPPageHeader>

<IGRPForm
  schema={ form1 }
  validationMode={ `onBlur` }
  gridClassName={ `flex flex-col mt-3` }
formRef={ formform1Ref }
  className={ cn() }
  onSubmit={ handleUtenteSubmit }
  defaultValues={ form1Data }
>
  <>
  <IGRPCard
  name={ `card1` }
  
  className={ cn() }
  
  
>
  <IGRPCardHeader
  
>
  <IGRPHeadline
  name={ `headline1` }
  title={ `Informações do Utente` }
description={ undefined }
variant={ `h6` }
roleColor={ `solid` }
color={ `primary` }
showIcon={ true }
iconName={ `CircleUser` }
  className={ cn('mt-2',) }
  
  
>
</IGRPHeadline>
</IGRPCardHeader>
  <IGRPCardContent
  
>
  <div className={ cn('grid','grid-cols-1 ','md:grid-cols-2 ','lg:grid-cols-4 ',' gap-4',)}    >
	<IGRPCombobox
  name={ `tipoUtente` }
  label={ `Tipo De Utente` }
variant={ `single` }
placeholder={ `Select an option...` }
required={ true }
selectLabel={ `No option found` }
showSearch={ true }
showIcon={ false }
iconName={ `CornerDownRight` }
gridSize={ `full` }
  className={ cn('col-span-1',) }
  onChange={ (value)=>{
  setIsCidadao(value === 'CIDADAO')

} }
  options={ selecttipoUtenteOptions }
disabled={ isEdit }
>
</IGRPCombobox>
<IGRPInputText
  name={ `nif` }
  label={ `NIF` }
showIcon={ false }
required={ true }
  className={ cn('col-span-1',) }
  
  disabled={ isEdit }
>
</IGRPInputText>
<IGRPCombobox
  name={ `tipoIdentificacao` }
  label={ `Tipo de Identificação` }
variant={ `single` }
placeholder={ `Selecione uma opção...` }
required={ true }
selectLabel={ `Nenhuma opção encontrada` }
showSearch={ true }
showIcon={ false }
iconName={ `CornerDownRight` }
gridSize={ `full` }
  className={ cn('col-span-1',) }
  onChange={ (value)=>setTipoIdentificacaoValue(value as string)
 }
  options={ selecttipoIdentificacaoOptions }
disabled={ isEdit }
>
</IGRPCombobox>
<IGRPInputText
  name={ `identificacao` }
  label={ `Identificação` }
showIcon={ false }
required={ true }
  className={ cn('col-span-1',) }
  
  disabled={ isEdit }
>
</IGRPInputText>
{ isCidadao && (<IGRPInputText
  name={ `nomeMae` }
  label={ `Nome da Mãe` }
showIcon={ false }
required={ false }
  className={ cn('col-span-1',) }
  
  disabled={ isEdit }
>
</IGRPInputText>)}
<IGRPInputText
  name={ `nome` }
  label={ `Nome Completo` }
showIcon={ false }
required={ true }
  className={ cn('col-span-1',) }
  
  disabled={ isEdit }
>
</IGRPInputText>
{ isCidadao && (<IGRPInputText
  name={ `nomePai` }
  label={ `Nome do Pai` }
showIcon={ false }
required={ false }
  className={ cn('col-span-1',) }
  
  disabled={ isEdit }
>
</IGRPInputText>)}
{ isCidadao && (<IGRPDatePicker
  placeholder={ `Please select a date...` }
  name={ `dataNascimento` }
  id={ `dataNascimento` }
  label={ `Data de Nascimento` }
  startDate={ new Date(`1900-01-01`) }
  endDate={ new Date(`2099-12-31`) }
  gridSize={ `full` }
  dateFormat={ `dd-MM-yyyy` }
  today={ new Date(`2025-01-01`) }
  defaultMonth={ new Date(`2025-01-01`) }
  startMonth={ new Date(`2025-01-01`) }
  month={ new Date(`2025-01-01`) }
  endMonth={ new Date(`2025-12-31`) }
  numberOfMonths={ 1 }
  captionLayout={ `label` }
  className={ cn('col-span-1',) }
  
/>)}
{ isCidadao && (<IGRPCombobox
  name={ `genero` }
  label={ `Gênero` }
variant={ `single` }
placeholder={ `Selecione uma opção...` }
required={ false }
selectLabel={ `Nenhuma opção encontrada` }
showSearch={ true }
showIcon={ false }
iconName={ `CornerDownRight` }
gridSize={ `full` }
  className={ cn('col-span-1',) }
  
  options={ selectgeneroOptions }
disabled={ isEdit }
>
</IGRPCombobox>)}
{ isCidadao && (<IGRPInputText
  name={ `nacionalidade` }
  label={ `Nacionalidade` }
showIcon={ false }
required={ false }
  className={ cn('col-span-1',) }
  
  disabled={ isEdit }
>
</IGRPInputText>)}
<IGRPInputText
  name={ `endereco` }
  label={ `Endereço` }
showIcon={ false }
required={ true }
  className={ cn('col-span-1',) }
  
  
>
</IGRPInputText>
<IGRPInputText
  name={ `telefone` }
  label={ `Telefone` }
showIcon={ false }
required={ true }
  className={ cn('col-span-1',) }
  
  
>
</IGRPInputText>
<IGRPInputText
  name={ `email` }
  label={ `Email` }
showIcon={ false }
required={ true }
disabled={ false }
  className={ cn('col-span-1',) }
  
  
>
</IGRPInputText>
<IGRPInputText
  name={ `caixaPostal` }
  label={ `Caixa Postal` }
showIcon={ false }
required={ false }
  className={ cn('col-span-1',) }
  
  
>
</IGRPInputText>
<IGRPInputText
  name={ `departamentoResponsavel` }
  label={ `Departamento Responsável` }
showIcon={ false }
required={ false }
  className={ cn('col-span-1',) }
  
  
>
</IGRPInputText></div>
</IGRPCardContent>
  <IGRPCardFooter
  
>
</IGRPCardFooter>
</IGRPCard>
</>
</IGRPForm></div>
  );
}