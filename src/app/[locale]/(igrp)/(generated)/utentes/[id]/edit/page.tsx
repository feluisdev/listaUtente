'use client'

/* THIS FILE WAS GENERATED AUTOMATICALLY BY iGRP STUDIO. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, useRef } from 'react';
import { cn, useIGRPMenuNavigation, useIGRPToast } from '@igrp/igrp-framework-react-design-system';
import UtenteForm from '@/app/[locale]/(igrp)/(generated)/utentes/components/utenteform'
import {Utente} from '@/app/[locale]/(myapp)/types/global'
import {useFetchUtente} from '@/app/[locale]/(myapp)/functions/services/utente-service'


export default function PageEditutenteComponent() {

  
  
  
  
const [currentUtente, setCurrentUtente] = useState<Utente>({});

const { data, isLoading } = useFetchUtente();
useEffect(() => {
  if (isLoading || !data) return
  setCurrentUtente(data)

}, [isLoading])


  return (
<div className={ cn('page','space-y-6',)}    >
	<div className={ cn('section',' space-x-3 space-y-3',)}    >
	<UtenteForm  isEdit={ true } utente={ currentUtente }   ></UtenteForm></div></div>
  );
}
