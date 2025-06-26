'use client'

/* THIS FILE WAS GENERATED AUTOMATICALLY BY iGRP STUDIO. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, useRef } from 'react';
import { cn, useIGRPMenuNavigation, useIGRPToast } from '@igrp/igrp-framework-react-design-system';
import UtenteForm from '@/app/[locale]/(igrp)/(generated)/listautente/components/utenteform'
import { 
  IGRPPageHeader,
	IGRPButton 
} from "@igrp/igrp-framework-react-design-system";
import { utenteFormSchema,initialUtenteForm, UtenteFormData} from '@/app/(myapp)/functions/services/utente-service'
import {getTipoUtente, getTipoDocumento} from '@/app/(myapp)/functions/services/config-service'
import { useRouter } from "next/navigation";


export default function PageNovoutenteComponent() {

  
  
  
  
const router = useRouter()

    
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

// Importações dinâmicas para funções usadas condicionalmente
  const utenteService = () => import('@/app/(myapp)/functions/services/utente-service');

  // Usando o esquema de validação do serviço
  const form1 = utenteFormSchema;

  type Form1ZodType = typeof form1;

  // Usando os valores iniciais do serviço
  const initForm1 = initialUtenteForm;

  useEffect(() => {
    const loadFormData = async () => {
      setLoading(true);
      try {
        // Carregar opções do combobox
        const options = getTipoUtente();
        setSelectcombobox1Options(options);

        // Verificar se existe um ID na URL (modo edição)
        const id = searchParams.get('id');
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
              setContentFormform1(formattedData);
              setIsEditMode(true);
            } else {
              console.error('[LOG-PAGE] Dados do utente não encontrados');
              setContentFormform1(initForm1);
            }
          } catch (error) {
            console.error('[LOG-PAGE] Erro ao carregar dados do utente:', error);
            setContentFormform1(initForm1);
          }
        } else {
          console.log('[LOG-PAGE] Modo de criação - usando valores iniciais');
          setContentFormform1(initForm1);
          setIsEditMode(false);
        }
      } catch (error) {
        console.error('[LOG-PAGE] Erro ao carregar dados do formulário:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFormData();
  }, [searchParams]);

  const handleSubmit = async (data: UtenteFormData) => {
    console.log('[LOG-PAGE] Dados do formulário para envio:', data);

    // Preparar dados para envio à API
    const id = searchParams.get('id');

    try {
      if (id) {
        // Modo edição - importar apenas as funções necessárias para atualização
        const { updateUtente, prepareUpdateUtenteData } = await utenteService();
        
        // Usar a função de preparação de dados do serviço
        const updateData = prepareUpdateUtenteData(data);

        console.log('[LOG-PAGE] Dados formatados para API (update):', updateData);
        return updateUtente(Number(id), updateData);
      } else {
        // Modo criação - importar apenas as funções necessárias para criação
        const { createUtente, prepareCreateUtenteData } = await utenteService();
        
        // Usar a função de preparação de dados do serviço
        const createData = prepareCreateUtenteData(data);

        console.log('[LOG-PAGE] Dados formatados para API (create):', createData);
        return createUtente(createData);
      }
    } catch (error) {
      console.error('[LOG-PAGE] Erro ao processar submissão:', error);
      throw error;
    }
  };


function onClicklistaUtente (row?: any): void {
  router.push(`/listautente`);
}


  return (
<div className={ cn('page','space-y-6',)}    >
	<div className={ cn('section',' space-x-3 space-y-3',)}    >
	<IGRPPageHeader
  title={ `Novo Utente` }
  variant={ `h3` }
  
>
  <div className="flex items-center gap-2">
    <IGRPButton
  name={ `button1` }
  label={ `Voltar` }
variant={ `secondary` }
size={ `default` }
showIcon={ true }
disabled={ false }

  className={ cn() }
  onClick={ () => onClicklistaUtente() }
  
>
</IGRPButton>
    <IGRPButton
  name={ `button2` }
  label={ `Gravar` }
variant={ `default` }
size={ `default` }
showIcon={ true }
iconName={ `Save` }
disabled={ false }

  className={ cn() }
  onClick={ () => formform1Ref.current?.submit() }
  
>
</IGRPButton>
</div>
</IGRPPageHeader>

<UtenteForm    ></UtenteForm></div></div>
  );
}
