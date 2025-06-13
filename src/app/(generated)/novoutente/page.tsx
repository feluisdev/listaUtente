'use client'


import { useState, useEffect, useRef, Suspense, useMemo, useCallback } from 'react';
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
import { useIGRPToast } from "@igrp/igrp-framework-react-design-system";
import { utenteFormSchema,initialUtenteForm, UtenteFormData} from '@/app/(myapp)/functions/services/utente-service'
import {getTipoUtente} from '@/app/(myapp)/functions/services/config-service'
import { useRouter, useSearchParams } from "next/navigation";
import {createUtente} from '@/app/(myapp)/functions/services/utente-service'
import { anyZodType } from "@/app/types/zod-types";


export default function PageNovoutenteComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NovoUtenteContent />
    </Suspense>
  );
}

function NovoUtenteContent() {
  
  const form1 = z.object({
    tipoUtente: z.string().optional(),
    nome: z.string().optional(),
    nif: z.string().optional(),
    bi: z.string().optional(),
    nomeMae: z.string().optional(),
    nomePai: z.string().optional(),
    dataNascimento: z.date().optional(),
    morada: z.string().optional(),
    telefone: z.string().optional(),
    email: z.string().optional(),
    cxPostal: z.string().optional()
})

type Form1ZodType = typeof form1;

// Use useMemo to prevent initForm1 from changing on every render
const initForm1 = useMemo(() => ({
    tipoUtente: "",
    nome: "",
    nif: "",
    bi: "",
    nomeMae: "",
    nomePai: "",
    dataNascimento: undefined,
    morada: "",
    telefone: "",
    email: "",
    cxPostal: ""
}), []);


  const [contentFormform1, setContentFormform1] = useState<z.infer<any>>(initForm1);
  const [selectcombobox1Options, setSelectcombobox1Options] = useState<IGRPOptionsProps[]>([]);
  const formform1Ref = useRef<IGRPFormHandle<z.infer<anyZodType>> | null>(null);
  
const router = useRouter()
const toast = useIGRPToast();
    
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

// Use useCallback to prevent utenteService from changing on every render
const utenteService = useCallback(() => import('@/app/(myapp)/functions/services/utente-service'), []);


  useEffect(() => {
    let isMounted = true; // Flag para controlar se o componente está montado
    const loadFormData = async () => {
      setLoading(true);
      try {
        // Carregar opções do combobox
        const options = getTipoUtente();
        setSelectcombobox1Options(options);


        // Verificar se existe um ID na URL (modo edição)
        const id = searchParams.get('id');
        
        if (id && isMounted) { // Verificar se o componente ainda está montado
          console.log(`[LOG-PAGE] Tentando carregar utente ID: ${id}`);
          try {
            // Importação dinâmica das funções necessárias para edição
            const { fetchUtenteById, formatUtenteDataForForm } = await utenteService();
            
            // Carregar dados do utente pelo ID
            const utenteData = await fetchUtenteById(Number(id));
            console.log('[LOG-PAGE] Dados do utente recebidos:', utenteData);

            if (utenteData && isMounted) { // Verificar novamente se o componente está montado
              // Usar a função de formatação do serviço
              const formattedData = formatUtenteDataForForm(utenteData);
              
              console.log('[LOG-PAGE] Dados formatados para o formulário:', formattedData);
              setContentFormform1(formattedData);
              setIsEditMode(true);
            } else if (isMounted) {
              console.error('[LOG-PAGE] Dados do utente não encontrados');
              setContentFormform1(initForm1);
            }
          } catch (error) {
            if (isMounted) {
              console.error('[LOG-PAGE] Erro ao carregar dados do utente:', error);
              setContentFormform1(initForm1);
            }
          }
        } else if (isMounted) {
          console.log('[LOG-PAGE] Modo de criação - usando valores iniciais');
          setContentFormform1(initForm1);
          setIsEditMode(false);
        }
      } catch (error) {
        if (isMounted) {
          console.error('[LOG-PAGE] Erro ao carregar dados do formulário:', error);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadFormData();

    return () => {
      isMounted = false; // Limpar quando o componente for desmontado
    };
  }, [searchParams, initForm1, utenteService]); // Dependências do useEffect

  const handleSubmit = async (data: UtenteFormData) => {
    console.log('[LOG-PAGE] Dados do formulário para envio:', data);
    setLoading(true);

    // Preparar dados para envio à API
    const id = searchParams.get('id');

    try {
      // Importar a função handleUtenteSubmit do serviço
      const { handleUtenteSubmit } = await utenteService();
      
      // Utilizar a função do serviço para processar a submissão
      const result = await handleUtenteSubmit(data, id);
      
      // Mostrar notificação de sucesso
      toast.igrpToast({
        title: isEditMode ? "Utente atualizado com sucesso!" : "Utente criado com sucesso!",
        description: `${data.nome} foi ${isEditMode ? 'atualizado' : 'registrado'} no sistema.`,
        type: "success",
        duration: 5000,
      });
      
      // Redirecionar para a lista após sucesso
      setTimeout(() => {
        router.push("listautente");
      }, 1500);
      
      return result;
    } catch (error) {
      console.error('[LOG-PAGE] Erro ao processar submissão:', error);
      
      // Mostrar notificação de erro
      toast.igrpToast({
        title: "Erro ao salvar utente",
        description: "Ocorreu um erro ao processar a operação. Por favor, tente novamente.",
        type: "error",
        duration: 5000,
      });
      
      // Não lançar o erro para evitar que o formulário seja reiniciado
      // e os dados sejam perdidos
      return false; // Retornar false para indicar que houve um erro
    } finally {
      setLoading(false);
    }
  };


function onClicklistaUtente (): void {
  router.push("listautente");
}


  return (
<div className={ cn('page','mx-auto px-4 space-y-6',)}   >
	<div className={ cn('section',' space-x-3 space-y-3',)}   >
	<IGRPPageHeader
  title={isEditMode ? `Editar Utente Nr: ${contentFormform1.nrUtente || ''}` : "Novo Utente"}
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
  disabled={loading}
>
  {isEditMode ? "Atualizar" : "Gravar"}
</IGRPButton>

</div>
</IGRPPageHeader>
{loading ? (
          <div className="flex justify-center items-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            <span className="ml-3">Carregando...</span>
          </div>
        ) : (
<IGRPForm
  schema={ form1 }
  validationMode="onBlur"
  gridClassName="flex flex-col"
formRef={ formform1Ref }
  className={ cn() }
  onSubmit={ handleSubmit }
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
  name="nomeMae"
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
  id="dataNascimento"
  placeholder="Please select a date..."
  name="dataNascimento"
  label="Data de Nascimento"
  startDate={ new Date("1900-01-01") }
  endDate={ new Date("2099-12-31") }
  gridSize="full"
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
  name="cxPostal"
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
</IGRPForm>)}
</div></div>
  );
}
