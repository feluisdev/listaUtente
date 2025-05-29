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
import { IGRPInputText } from "@igrp/igrp-framework-react-design-system";
import { IGRPCombobox } from "@igrp/igrp-framework-react-design-system";
import { IGRPOptionsProps } from "@igrp/igrp-framework-react-design-system";
import { IGRPSelect } from "@igrp/igrp-framework-react-design-system";
import { IGRPCardFooter } from "@igrp/igrp-framework-react-design-system";
import { useRouter } from "next/navigation";


export default function PageNovoutenteComponent() {

  const [contentFormform1, setContentFormform1] = useState<z.infer<any>>(null);
  const [selectcombobox1Options, setSelectcombobox1Options] = useState<IGRPOptionsProps[]>([]);
  const [selectselect1Options, setSelectselect1Options] = useState<IGRPOptionsProps[]>([]);
  const formform1Ref = useRef<IGRPFormHandle<z.infer<anyZodType>> | null>(null);
  
const router = useRouter()

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
  
>
  Gravar
</IGRPButton>

</div>
</IGRPPageHeader>

<IGRPForm
  validationMode="onBlur"
  gridClassName="flex flex-col"
formRef={ formform1Ref }
  className={ cn() }
  
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
	<IGRPInputText
  name="inputText1"
placeholder=""
  label="Input Text"
  className={ cn('col-span-1',) }
  
/>
<IGRPCombobox
  name="combobox1"
  placeholder="Select an option..."
  label="Combobox Input"
  selectLabel="No option found"
  gridSize="full"
  showSearch = { true }
  className={ cn('col-span-1',) }
  
  value={ undefined }
options={ selectcombobox1Options }
/>
<IGRPSelect
  name="select1"
  placeholder="Select an option..."
  label="Select Input"
  className={ cn('col-span-1',) }
  
  value={ undefined }
options={ selectselect1Options }
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
