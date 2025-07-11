'use client'

/* THIS FILE WAS GENERATED AUTOMATICALLY BY iGRP STUDIO. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, useRef } from 'react';
import { cn, useIGRPMenuNavigation, useIGRPToast } from '@igrp/igrp-framework-react-design-system';
import { 
  IGRPPageHeader,
	IGRPStatusBanner,
	IGRPInfoCard,
	IGRPInfoSection,
	IGRPInfoItem 
} from "@igrp/igrp-framework-react-design-system";
import {useFetchUtente} from '@/app/[locale]/(myapp)/functions/services/utente-service'


export default function PageDetalhesutenteComponent() {

  
  
  
const [statusBanner1Text, setStatusBanner1Text] = useState<string>(`Status Banner`);

const [statusBanner1BadgeText, setStatusBanner1BadgeText] = useState<string>(`Status Banner`);

const [nome, setNome] = useState<string>(``);

const [identificacao, setIdentificacao] = useState<string>(`Lorem ipsum dolor sit amet`);

const [estado, setEstado] = useState<string>(`Lorem ipsum dolor sit amet`);

const [nomePai, setNomePai] = useState<string>(`Lorem ipsum dolor sit amet`);

const [genero, setGenero] = useState<string>(`Lorem ipsum dolor sit amet`);

const [nif, setNif] = useState<string>(`Lorem ipsum dolor sit amet`);

const [tipoIdentificacao, setTipoIdentificacao] = useState<string>(`Lorem ipsum dolor sit amet`);

const [nomeMae, setNomeMae] = useState<string>(`Lorem ipsum dolor sit amet`);

const [dataNascimento, setDataNascimento] = useState<string>(`Lorem ipsum dolor sit amet`);

const [nacionalidade, setNacionalidade] = useState<string>(`Lorem ipsum dolor sit amet`);

const [email, setEmail] = useState<string>(`Lorem ipsum dolor sit amet`);

const [telefone, setTelefone] = useState<string>(`Lorem ipsum dolor sit amet`);

const [endereco, setEndereco] = useState<string>(``);

const [caixaPostal, setCaixaPostal] = useState<string>(`Lorem ipsum dolor sit amet`);

const [departamentoResponsavel, setDepartamentoResponsavel] = useState<string>(`Lorem ipsum dolor sit amet`);


const { data, isLoading } = useFetchUtente();
// Lógica para carregar os dados do utente pelo ID e preencher o formulário
useEffect(() => {
  if (isLoading || !data) return;

  setStatusBanner1Text(data?.tipoUtente || '')
  setStatusBanner1BadgeText(data?.estado || '')
  setNome(data?.nome || '')
  setIdentificacao(data?.identificacao || '')
  setEstado(data?.estado || '')
  setNomePai(data?.nomePai || '')
  setGenero(data?.genero || '')
  setTipoIdentificacao(data?.tipoIdentificacao || '')
  setNif(data?.nif || '')
  setNomeMae(data?.nomeMae || '')
  setDataNascimento(data?.dataNascimento || '')
  setNacionalidade(data?.nacionalidade || '')
  setDepartamentoResponsavel(data?.departamentoResponsavel || '')
  setCaixaPostal(data?.caixaPostal || '')
  setEndereco(data?.endereco || '')
  setTelefone(data?.telefone || '')
  setEmail(data?.email || '')
  console.log(data)

}, [isLoading, data]);


  return (
<div className={ cn('page','space-y-6',)}    >
	<div className={ cn('section',' space-x-3 space-y-3',)}    >
	<IGRPPageHeader
  title={ `Detalhes do Utente` }
  iconBackButton={ `ArrowLeft` }
  showBackButton={ true }
  urlBackButton={ `/utentes` }
  variant={ `h3` }
  
>
  <div className="flex items-center gap-2">
</div>
</IGRPPageHeader>

<IGRPStatusBanner
  name={ `statusBanner1` }
  color={ `secondary` }
variant={ `soft` }

badgeColor={ `secondary` }
badgeVariant={ `soft` }


  
  badgeText={ statusBanner1BadgeText }
text={ statusBanner1Text }
>
</IGRPStatusBanner>
<div className={ cn('grid','grid-cols-1 ','md:grid-cols-3 ','lg:grid-cols-3 ',' gap-4',)}    >
	<IGRPInfoCard
  variantSection={ `solid` }
  colorSection={ `primary` }
  title={ `Informações Pessoais` }
  className={ cn('md:col-span-2','',) }
  
  sections={
    [
      {
        items: [
          {
            text: nome,
              label: `Nome`,
              icon: `Info`,
              variantItem: `solid`,
              colorItem: `primary`,
},
          {
            text: identificacao,
              label: `Identificação`,
              icon: `Info`,
              variantItem: `solid`,
              colorItem: `primary`,
},
          {
            text: estado,
              label: `Estado`,
              icon: `Info`,
              variantItem: `solid`,
              colorItem: `primary`,
},
          {
            text: nomePai,
              label: `Nome do Pai`,
              icon: `Info`,
              variantItem: `solid`,
              colorItem: `primary`,
},
          {
            text: genero,
              label: `Gênero`,
              icon: `Info`,
              variantItem: `solid`,
              colorItem: `primary`,
},
        ]
      },
      {
        items: [
          {
            text: nif,
              label: `NIF`,
              icon: `Info`,
              variantItem: `solid`,
              colorItem: `primary`,
},
          {
            text: tipoIdentificacao,
              label: `Tipo de Identificação`,
              icon: `Info`,
              variantItem: `solid`,
              colorItem: `primary`,
},
          {
            text: nomeMae,
              label: `Nome da Mãe`,
              icon: `Info`,
              variantItem: `solid`,
              colorItem: `primary`,
},
          {
            text: dataNascimento,
              label: `Data de Nascimento`,
              icon: `Info`,
              variantItem: `solid`,
              colorItem: `primary`,
},
          {
            text: nacionalidade,
              label: `Nacionalidade`,
              icon: `Info`,
              variantItem: `solid`,
              colorItem: `primary`,
},
        ]
      },
]
  }
/>
<IGRPInfoCard
  variantSection={ `solid` }
  colorSection={ `primary` }
  title={ `Contatos` }
  className={ cn('',) }
  
  sections={
    [
      {
        items: [
          {
            text: email,
              label: `Email`,
              icon: `Info`,
              variantItem: `solid`,
              colorItem: `primary`,
},
          {
            text: telefone,
              label: `Telefone`,
              icon: `Info`,
              variantItem: `solid`,
              colorItem: `primary`,
},
          {
            text: endereco,
              label: `Endereço`,
              icon: `Info`,
              variantItem: `solid`,
              colorItem: `primary`,
},
          {
            text: caixaPostal,
              label: `Caixa Postal`,
              icon: `Info`,
              variantItem: `solid`,
              colorItem: `primary`,
},
          {
            text: departamentoResponsavel,
              label: `Departamento Responsável`,
              icon: `Info`,
              variantItem: `solid`,
              colorItem: `primary`,
},
        ]
      },
]
  }
/></div></div></div>
  );
}
