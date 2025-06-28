'use client'

/* THIS FILE WAS GENERATED AUTOMATICALLY BY iGRP STUDIO. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, useRef } from 'react';
import { cn, useIGRPMenuNavigation, useIGRPToast } from '@igrp/igrp-framework-react-design-system';
import { 
  IGRPModalDialog,
	IGRPModalDialogContent,
	IGRPModalDialogHeader,
	IGRPModalDialogTitle,
	IGRPModalDialogDescription,
	IGRPModalDialogFooter,
	IGRPModalDialogClose,
	IGRPModalDialogTrigger,
	IGRPButton 
} from "@igrp/igrp-framework-react-design-system";

export default function Novoutentemodal({ open,setOpen } : { open: boolean, setOpen: (prompt: boolean) => void }) {

  
  
  
const { igrpToast } = useIGRPToast()


  return (
<div className={ cn('component',)}    >
	<IGRPModalDialog
  onOpenChange={ setOpen }
  open={ open }
>
  <IGRPModalDialogContent
  size={ `md` }
  className={ cn() }
  
  
>
  <IGRPModalDialogHeader
  
  
>
  <IGRPModalDialogTitle
  name={ `modalDialogTitle1` }
  

  
  
>
  Modal Dialog
</IGRPModalDialogTitle>
  <IGRPModalDialogDescription
  name={ `modalDialogDescription1` }
  

  
  
>
  Lorem ipsum dolor sit amet
</IGRPModalDialogDescription>
</IGRPModalDialogHeader>
  <IGRPModalDialogFooter
  
  
>
  <IGRPModalDialogClose
  name={ `modalDialogClose1` }
  
variant={ `default` }
size={ `default` }


  onClick={ () => {} }
  
>
  Close
</IGRPModalDialogClose>
</IGRPModalDialogFooter>
  <     ></>
</IGRPModalDialogContent>
  <IGRPModalDialogTrigger
  name={ `modalDialogTrigger1` }
  variant={ `default` }
size={ `default` }


  className={ cn() }
  onClick={ () => {} }
  
>
  <IGRPButton
  name={ `button1` }
  
variant={ `default` }
size={ `default` }


  onClick={ () => {} }
  
>
  Button
</IGRPButton>
</IGRPModalDialogTrigger>
</IGRPModalDialog></div>
  );
}