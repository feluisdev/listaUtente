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
import { getTipoUtente, getEstado } from '@/app/(myapp)/functions/services/config-service'
import { useRouter, useSearchParams } from "next/navigation";
import { createUtente, fetchUtenteById, updateUtente } from '@/app/(myapp)/functions/services/utente-service'


export default function PageNovoutenteComponent() {


  const form1 = z.object({
    id: z.number().optional(),
    tipoUtente: z.string().optional(),
    nome: z.string().optional(),
    nrUtente: z.string().optional(),
    nif: z.string().optional(),
    bi: z.string().optional(),
    nomeMae: z.string().optional(),
    nomePai: z.string().optional(),
    dataNascimento: z.date().optional(),
    estado: z.string().optional(),
    morada: z.string().optional(),
    telefone: z.string().optional(),
    email: z.string().optional(),
    cxPostal: z.string().optional()
  })

  type Form1ZodType = typeof form1;

  const initForm1: z.infer<Form1ZodType> = {
    id: undefined,
    tipoUtente: "",
    nome: "",
    nrUtente: "",
    nif: "",
    bi: "",
    nomeMae: "",
    nomePai: "",
    dataNascimento: undefined,
    estado: "ATIVO",
    morada: "",
    telefone: "",
    email: "",
    cxPostal: ""
  }


  const [contentFormform1, setContentFormform1] = useState<z.infer<any>>(initForm1);
  const [selectcombobox1Options, setSelectcombobox1Options] = useState<IGRPOptionsProps[]>([]);
  const formform1Ref = useRef<IGRPFormHandle<z.infer<Form1ZodType>> | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

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
            // Carregar dados do utente pelo ID
            const utenteData = await fetchUtenteById(Number(id));
            console.log('[LOG-PAGE] Dados do utente recebidos:', utenteData);

            if (utenteData) {
              // Converter a data de nascimento para objeto Date se existir
              const formattedData = { ...utenteData };
              if (formattedData.dataNascimento) {
                formattedData.dataNascimento = new Date(formattedData.dataNascimento);
              }

              // Mapear campos do backend para o formulário
              if (formattedData.nomeUtente && !formattedData.nome) {
                formattedData.nome = formattedData.nomeUtente;
              }

              // Garantir que todos os campos estejam mapeados corretamente
              if (formattedData.nome_mae && !formattedData.nomeMae) {
                formattedData.nomeMae = formattedData.nome_mae;
              }

              if (!formattedData.estado) {
                formattedData.estado = 'ATIVO';
              }

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


  function onClicklistaUtente(): void {
    router.push("listautente");
  }

  const handleSubmit = async (data: any) => {
    console.log('[LOG-PAGE] Dados do formulário para envio:', data);

    // Preparar dados para envio à API
    const id = searchParams.get('id');

    if (id) {
      // Modo edição - atualizar utente existente
      // Enviar todos os campos esperados pelo UpdateUtenteDTO
      const updateData = {
        nome: data.nome,
        morada: data.morada,
        telefone: data.telefone,
        email: data.email,
        cxPostal: data.cxPostal,
        nomeMae: data.nomeMae,
        nomePai: data.nomePai,
        nif: data.nif,
        bi: data.bi,
        tipoUtente: data.tipoUtente
      };

      console.log('[LOG-PAGE] Dados formatados para API (update):', updateData);
      return updateUtente(Number(id), updateData);
    } else {
      // Modo criação - criar novo utente
      // Enviar todos os campos necessários
      const createData = {
        nome: data.nome,
        tipoUtente: data.tipoUtente,
        nrUtente: data.nrUtente,
        nif: data.nif,
        bi: data.bi,
        nomeMae: data.nomeMae,
        nomePai: data.nomePai,
        dataNascimento: data.dataNascimento ? data.dataNascimento.toISOString().split('T')[0] : null,
        estado: data.estado,
        morada: data.morada,
        telefone: data.telefone,
        email: data.email,
        cxPostal: data.cxPostal
      };

      console.log('[LOG-PAGE] Dados formatados para API (create):', createData);
      return createUtente(createData);
    }
  };


  return (
    <div className={cn('page', 'mx-auto px-4 space-y-6',)}   >
      <div className={cn('section', ' space-x-3 space-y-3',)}   >
        <IGRPPageHeader
          title={isEditMode ? `Editar Utente Nr: ${contentFormform1.nrUtente || ''}` : "Novo Utente"}
          variant="h3"
          className={cn()}
        >
          <div className="flex items-center gap-2">
            <IGRPButton
              variant="secondary"
              size="default"
              showIcon={true}
              className={cn()}
              onClick={() => onClicklistaUtente()}
            >
              Voltar
            </IGRPButton>

            <IGRPButton
              variant="default"
              size="default"
              showIcon={true}
              iconName="Save"
              className={cn()}
              onClick={() => formform1Ref.current?.submit()}
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
            schema={form1}
            validationMode="onBlur"
            gridClassName="flex flex-col"
            formRef={formform1Ref}
            className={cn()}
            onSubmit={handleSubmit}
            defaultValues={contentFormform1}
          >
            <>
              <IGRPCard
                className={cn()}

              >
                <IGRPCardHeader
                  className={cn()}

                >
                  <IGRPHeadline
                    title="Informações do Utente"
                    variant="h6"
                    className={cn()}
                  >
                  </IGRPHeadline>

                </IGRPCardHeader>
                <IGRPCardContent
                  className={cn('space-x-3', 'space-y-3',)}

                >
                  <div className={cn('grid', 'grid-cols-4', ' gap-4',)}   >
                    <IGRPCombobox
                      name="tipoUtente"
                      placeholder="Select an option..."
                      label="Tipo De Utente"
                      required={true}
                      selectLabel="No option found"
                      gridSize="full"
                      showSearch={true}
                      className={cn('col-span-1',)}

                      value={undefined}
                      options={selectcombobox1Options}
                    />
                    <IGRPInputText
                      name="nome"
                      placeholder=""
                      label="Nome Completo"
                      required={true}
                      className={cn('col-span-1',)}

                    />
                    <IGRPInputText
                      name="nif"
                      placeholder=""
                      label="NIF"
                      required={true}
                      className={cn('col-span-1',)}

                    />
                    <IGRPInputText
                      name="bi"
                      placeholder=""
                      label="CNI"
                      required={true}
                      className={cn('col-span-1',)}

                    />
                    <IGRPInputText
                      name="nomeMae"
                      placeholder=""
                      label="Nome da Mãe"
                      className={cn('col-span-1',)}

                    />
                    <IGRPInputText
                      name="nomePai"
                      placeholder=""
                      label="Nome do Pai"
                      className={cn('col-span-1',)}

                    />
                    <IGRPCombobox
                      name="estado"
                      placeholder="Select an option..."
                      label="Estado"
                      required={true}
                      selectLabel="No option found"
                      gridSize="full"
                      showSearch={true}
                      className={cn('col-span-1',)}

                      value={undefined}
                      options={getEstado()}
                    />
                    <IGRPDatePicker
                      placeholder="Please select a date..."
                      name="dataNascimento"
                      label="Data de Nascimento"
                      startDate={new Date("1900-01-01")}
                      endDate={new Date("2099-12-31")}
                      gridSize="full"
                      dateFormat="dd/MM/yyyy"
                      today={new Date("2025-01-01")}
                      defaultMonth={new Date("2025-01-01")}
                      startMonth={new Date("2025-01-01")}
                      month={new Date("2025-01-01")}
                      endMonth={new Date("2025-12-31")}
                      numberOfMonths={1}
                      captionLayout="label"
                      className={cn('col-span-1',)}

                    />
                    <IGRPInputText
                      name="morada"
                      placeholder=""
                      label="Morada"
                      className={cn('col-span-1',)}

                    />
                    <IGRPInputText
                      name="telefone"
                      placeholder=""
                      label="Telefone"
                      required={true}
                      className={cn('col-span-1',)}

                    />
                    <IGRPInputText
                      name="email"
                      placeholder=""
                      label="Email"
                      required={true}
                      className={cn('col-span-1',)}

                    />
                    <IGRPInputText
                      name="cxPostal"
                      placeholder=""
                      label="Caixa Postal"
                      className={cn('col-span-1',)}

                    /></div>
                </IGRPCardContent>
                <IGRPCardFooter
                  className={cn()}

                >
                </IGRPCardFooter>
              </IGRPCard>
            </>
          </IGRPForm>
        )}
      </div></div>
  );
}
