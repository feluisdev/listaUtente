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
import {getTipoUtente} from '@/app/[locale]/(myapp)/functions/services/config-service'
import {getGenero} from '@/app/[locale]/(myapp)/functions/services/config-service'
import {getTipoDocumento} from '@/app/[locale]/(myapp)/functions/services/config-service'
import {createUtente} from '@/app/[locale]/(myapp)/functions/services/utente-service'


export default function PageUtenteformComponent() {

  
  const form1 = z.object({
    tipoUtente: z.string().optional(),
    nome: z.string().optional(),
    nif: z.string().optional(),
    tipoIdentificacao: z.string().optional(),
    identificacao: z.string().optional(),
    nomeMae: z.string().optional(),
    nomePai: z.string().optional(),
    dataNascimento: z.date().optional(),
    genero: z.string().optional(),
    nacionalidade: z.string().optional(),
    endereco: z.string().optional(),
    telefone: z.string().optional(),
    email: z.string().optional(),
    caixaPostal: z.string().optional(),
    departamentoResponsavel: z.string().optional()
})

type Form1ZodType = typeof form1;

const initForm1: z.infer<Form1ZodType> = {
    tipoUtente: ``,
    nome: ``,
    nif: ``,
    tipoIdentificacao: ``,
    identificacao: ``,
    nomeMae: ``,
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

  const [form1Data, setForm1Data] = useState<any>(initForm1);
  const [selecttipoUtenteOptions, setSelecttipoUtenteOptions] = useState<IGRPOptionsProps[]>([]);
  const [selecttipoIdentificacaoOptions, setSelecttipoIdentificacaoOptions] = useState<IGRPOptionsProps[]>([]);
  const [selectgeneroOptions, setSelectgeneroOptions] = useState<IGRPOptionsProps[]>([]);
  const formform1Ref = useRef<IGRPFormHandle<Form1ZodType> | null>(null);
  
const [isEditMode, setIsEditMode] = useState(false);
const [loading, setLoading] = useState(false);
//const searchParams = useSearchParams();



// Usando o esquema de validação do serviço
//const form1 = utenteFormSchema;

//type Form1ZodType = typeof form1;

// Usando os valores iniciais do serviço
//const initForm1 = initialUtenteForm;

useEffect(() => {
  const loadFormData = async () => {
    setLoading(true);
    try {
      // Carregar opções do combobox
      const options = getTipoUtente();
      const optionsGenero = getGenero();
      const optionsTpDocs = getTipoDocumento();
      setSelecttipoUtenteOptions(options || []);
      setSelectgeneroOptions(optionsGenero||[])
      setSelecttipoIdentificacaoOptions(optionsTpDocs||[])


      // Verificar se existe um ID na URL (modo edição)
      const id = null;//searchParams.get('id');
      if (id) {
        console.log(`[LOG-PAGE] Tentando carregar utente ID: ${id}`);
        try {
          // Importação dinâmica das funções necessárias para edição
          const { fetchUtenteById, formatUtenteDataForForm } = await utenteService();

          // Carregar dados do utente pelo ID
          const utenteData = await fetchUtenteById(Number(id));
          console.log('[LOG-PAGE] Dados do utente recebidos:', utenteData);

          if (utenteData) {
            // Usar a função de formatação do serviço
            const formattedData = formatUtenteDataForForm(utenteData);

            console.log('[LOG-PAGE] Dados formatados para o formulário:', formattedData);
            setForm1Data(formattedData);
            setIsEditMode(true);
          } else {
            console.error('[LOG-PAGE] Dados do utente não encontrados');
            setForm1Data(initForm1);
          }
        } catch (error) {
          console.error('[LOG-PAGE] Erro ao carregar dados do utente:', error);
          setForm1Data(initForm1);
        }
      } else {
        console.log('[LOG-PAGE] Modo de criação - usando valores iniciais');
        setForm1Data(initForm1);
        setIsEditMode(false);
      }
    } catch (error) {
      console.error('[LOG-PAGE] Erro ao carregar dados do formulário:', error);
    } finally {
      setLoading(false);
    }
  };

  loadFormData();
}, []);



  return (
<div className={ cn('page','space-y-6',)}    >
	<div className={ cn('section',' space-x-3 space-y-3',)}    >
	<IGRPPageHeader
  title={ `Novo Utente` }
  iconBackButton={ `ArrowLeft` }
  showBackButton={ true }
  urlBackButton={ `/utentes` }
  variant={ `h3` }
  
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
  gridClassName={ `flex flex-col` }
formRef={ formform1Ref }
  onSubmit={ createUtente }
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

  
  
>
</IGRPHeadline>
</IGRPCardHeader>
  <IGRPCardContent
  
>
  <div className={ cn('grid','grid-cols-4',' gap-4',)}    >
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
  
  options={ selecttipoUtenteOptions }
>
</IGRPCombobox>
<IGRPInputText
  name={ `nome` }
  label={ `Nome Completo` }
showIcon={ false }
required={ true }


  className={ cn('col-span-1',) }
  
  
>
</IGRPInputText>
<IGRPInputText
  name={ `nif` }
  label={ `NIF` }
placeholder={ undefined }
helperText={ undefined }
showIcon={ false }
disabled={ false }
required={ true }


  className={ cn('col-span-1',) }
  
  value={ undefined }
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
  
  options={ selecttipoIdentificacaoOptions }
>
</IGRPCombobox>
<IGRPInputText
  name={ `identificacao` }
  label={ `Identificação` }
placeholder={ undefined }
helperText={ undefined }
showIcon={ false }
disabled={ false }
required={ true }


  className={ cn('col-span-1',) }
  
  value={ undefined }
>
</IGRPInputText>
<IGRPInputText
  name={ `nomeMae` }
  label={ `Nome da Mãe` }
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
  name={ `nomePai` }
  label={ `Nome do Pai` }
placeholder={ undefined }
helperText={ undefined }
showIcon={ false }
disabled={ false }
required={ false }


  className={ cn('col-span-1',) }
  
  value={ undefined }
>
</IGRPInputText>
<IGRPDatePicker
  placeholder={ `Please select a date...` }
  name={ `dataNascimento` }
  id={ `dataNascimento` }
  label={ `Data de Nascimento` }
  startDate={ new Date(`1900-01-01`) }
  endDate={ new Date(`2099-12-31`) }
  gridSize={ `full` }
  dateFormat={ `dd/MM/yyyy` }
  today={ new Date(`2025-01-01`) }
  defaultMonth={ new Date(`2025-01-01`) }
  startMonth={ new Date(`2025-01-01`) }
  month={ new Date(`2025-01-01`) }
  endMonth={ new Date(`2025-12-31`) }
  numberOfMonths={ 1 }
  captionLayout={ `label` }
  className={ cn('col-span-1',) }
  
/>
<IGRPCombobox
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
>
</IGRPCombobox>
<IGRPInputText
  name={ `nacionalidade` }
  label={ `Nacionalidade` }
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
placeholder={ undefined }
helperText={ undefined }
showIcon={ false }
disabled={ false }
required={ true }


  className={ cn('col-span-1',) }
  
  value={ undefined }
>
</IGRPInputText>
<IGRPInputText
  name={ `email` }
  label={ `Email` }
placeholder={ undefined }
helperText={ undefined }
showIcon={ false }
disabled={ false }
required={ true }


  className={ cn('col-span-1',) }
  
  value={ undefined }
>
</IGRPInputText>
<IGRPInputText
  name={ `caixaPostal` }
  label={ `Caixa Postal` }
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
  name={ `departamentoResponsavel` }
  label={ `Departamento Responsável` }
placeholder={ undefined }
helperText={ undefined }
showIcon={ false }
disabled={ false }
required={ false }


  className={ cn('col-span-1',) }
  
  value={ undefined }
>
</IGRPInputText></div>
</IGRPCardContent>
  <IGRPCardFooter
  
>
</IGRPCardFooter>
</IGRPCard>
</>
</IGRPForm></div></div>
  );
}
