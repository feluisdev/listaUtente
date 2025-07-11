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
import { updateOrCreateUtente } from '@/app/[locale]/(myapp)/functions/services/utente-service'
import { getTipoUtente } from '@/app/[locale]/(myapp)/functions/services/config-service'
import { getGenero } from '@/app/[locale]/(myapp)/functions/services/config-service'
import { getTipoDocumento } from '@/app/[locale]/(myapp)/functions/services/config-service'
import { handleUtenteSubmit } from '@/app/[locale]/(myapp)/functions/services/utente-service'

export default function Utenteform({ isEdit, utente }: { isEdit?: boolean, utente?: any }) {


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

  const formform1Ref = useRef<IGRPFormHandle<Form1ZodType> | null>(null);
  const [form1Data, setForm1Data] = useState<any>(initForm1);
  const [selecttipoUtenteOptions, setSelecttipoUtenteOptions] = useState<IGRPOptionsProps[]>([]);
  const [selecttipoIdentificacaoOptions, setSelecttipoIdentificacaoOptions] = useState<IGRPOptionsProps[]>([]);
  const [selectgeneroOptions, setSelectgeneroOptions] = useState<IGRPOptionsProps[]>([]);

  const [pageHeader1Title, setPageHeader1Title] = useState<string>(`Novo Utente`);

  const { igrpToast } = useIGRPToast()

  async function handleUtenteSubmit(values: z.infer<any>): Promise<void | undefined> {


    try {
      // Prepare the data for the cessar operation
      const data = {
        ...utente,
        ...values
      };

      // Call the cessar function
      await updateOrCreateUtente(data);

      igrpToast({
        title: 'Sucesso',
        description: 'Operacao efetuado com sucesso!',
        type: 'success',
      });

    } catch (error: any) {
      console.error('Error cessing utente:', error);
      igrpToast({
        title: 'Erro',
        description: `${error.message}`,
        type: 'error',
      });
    }

  }

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
    if (utente)
      setForm1Data(utente)

  }, [utente])



  return (
    <div className={cn('component',)}    >
      <IGRPPageHeader
        title={``}
        iconBackButton={`ArrowLeft`}
        showBackButton={true}
        urlBackButton={`/utentes`}
        variant={`h3`}
        className={cn()}
        title={pageHeader1Title}
      >
        <div className="flex items-center gap-2">
          <IGRPButton
            name={`button2`}

            variant={`default`}
            size={`default`}
            showIcon={true}
            iconName={`Save`}

            className={cn()}
            onClick={() => formform1Ref.current?.submit()}

          >
            Salvar
          </IGRPButton>
        </div>
      </IGRPPageHeader>

      <IGRPForm
        schema={form1}
        validationMode={`onBlur`}
        gridClassName={`flex flex-col mt-3`}
        formRef={formform1Ref}
        className={cn()}
        onSubmit={handleUtenteSubmit}
        defaultValues={form1Data}
      >
        <>
          <IGRPCard
            name={`card1`}

            className={cn()}


          >
            <IGRPCardHeader

            >
              <IGRPHeadline
                name={`headline1`}
                title={`Informações do Utente`}
                description={undefined}
                variant={`h6`}
                roleColor={`solid`}
                color={`primary`}
                showIcon={true}
                iconName={`CircleUser`}


                className={cn('mt-2',)}


              >
              </IGRPHeadline>
            </IGRPCardHeader>
            <IGRPCardContent

            >
              <div className={cn('grid', 'grid-cols-1 ', 'md:grid-cols-2 ', 'lg:grid-cols-4 ', ' gap-4',)}    >
                <IGRPCombobox
                  name={`tipoUtente`}
                  label={`Tipo De Utente`}
                  variant={`single`}
                  placeholder={`Select an option...`}
                  required={true}
                  selectLabel={`No option found`}
                  showSearch={true}
                  showIcon={false}
                  iconName={`CornerDownRight`}


                  gridSize={`full`}
                  className={cn('col-span-1',)}

                  options={selecttipoUtenteOptions}
                >
                </IGRPCombobox>
                <IGRPInputText
                  name={`nome`}
                  label={`Nome Completo`}
                  showIcon={false}
                  required={true}


                  className={cn('col-span-1',)}


                >
                </IGRPInputText>
                <IGRPInputText
                  name={`nif`}
                  label={`NIF`}
                  showIcon={false}
                  required={true}


                  className={cn('col-span-1',)}


                >
                </IGRPInputText>
                <IGRPCombobox
                  name={`tipoIdentificacao`}
                  label={`Tipo de Identificação`}
                  variant={`single`}
                  placeholder={`Selecione uma opção...`}
                  required={true}
                  selectLabel={`Nenhuma opção encontrada`}
                  showSearch={true}
                  showIcon={false}
                  iconName={`CornerDownRight`}


                  gridSize={`full`}
                  className={cn('col-span-1',)}

                  options={selecttipoIdentificacaoOptions}
                >
                </IGRPCombobox>
                <IGRPInputText
                  name={`identificacao`}
                  label={`Identificação`}
                  showIcon={false}
                  required={true}


                  className={cn('col-span-1',)}


                >
                </IGRPInputText>
                <IGRPInputText
                  name={`nomeMae`}
                  label={`Nome da Mãe`}
                  showIcon={false}
                  required={false}


                  className={cn('col-span-1',)}


                >
                </IGRPInputText>
                <IGRPInputText
                  name={`nomePai`}
                  label={`Nome do Pai`}
                  showIcon={false}
                  required={false}


                  className={cn('col-span-1',)}


                >
                </IGRPInputText>
                <IGRPDatePicker
                  placeholder={`Please select a date...`}
                  name={`dataNascimento`}
                  id={`dataNascimento`}
                  label={`Data de Nascimento`}
                  startDate={new Date(`1900-01-01`)}
                  endDate={new Date(`2099-12-31`)}
                  gridSize={`full`}
                  dateFormat={`dd/MM/yyyy`}
                  today={new Date(`2025-01-01`)}
                  defaultMonth={new Date(`2025-01-01`)}
                  startMonth={new Date(`2025-01-01`)}
                  month={new Date(`2025-01-01`)}
                  endMonth={new Date(`2025-12-31`)}
                  numberOfMonths={1}
                  captionLayout={`label`}
                  className={cn('col-span-1',)}

                />
                <IGRPCombobox
                  name={`genero`}
                  label={`Gênero`}
                  variant={`single`}
                  placeholder={`Selecione uma opção...`}
                  required={false}
                  selectLabel={`Nenhuma opção encontrada`}
                  showSearch={true}
                  showIcon={false}
                  iconName={`CornerDownRight`}


                  gridSize={`full`}
                  className={cn('col-span-1',)}

                  options={selectgeneroOptions}
                >
                </IGRPCombobox>
                <IGRPInputText
                  name={`nacionalidade`}
                  label={`Nacionalidade`}
                  placeholder={undefined}
                  helperText={undefined}
                  showIcon={false}
                  disabled={false}
                  required={false}


                  className={cn('col-span-1',)}

                  value={undefined}
                >
                </IGRPInputText>
                <IGRPInputText
                  name={`endereco`}
                  label={`Endereço`}
                  showIcon={false}
                  required={true}


                  className={cn('col-span-1',)}


                >
                </IGRPInputText>
                <IGRPInputText
                  name={`telefone`}
                  label={`Telefone`}
                  showIcon={false}
                  required={true}


                  className={cn('col-span-1',)}


                >
                </IGRPInputText>
                <IGRPInputText
                  name={`email`}
                  label={`Email`}
                  showIcon={false}
                  required={true}


                  className={cn('col-span-1',)}


                >
                </IGRPInputText>
                <IGRPInputText
                  name={`caixaPostal`}
                  label={`Caixa Postal`}
                  showIcon={false}
                  required={false}


                  className={cn('col-span-1',)}


                >
                </IGRPInputText>
                <IGRPInputText
                  name={`departamentoResponsavel`}
                  label={`Departamento Responsável`}
                  showIcon={false}
                  required={false}


                  className={cn('col-span-1',)}


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