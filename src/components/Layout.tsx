"use client"

import {
  IGRPSidebarInset,
  IGRPSidebarProvider,
  IGRPHeader,
  IGRPSidebar,
  IGRPSidebarContent,
  IGRPSidebarHeader,
  IGRPToaster,
} from '@igrp/igrp-framework-react-design-system'


const user = {
  name: 'IGRP',
  email: 'admin@igrp.cv',
  avatar: '',
}

export const AppConfig = {
  logo: {
    src: 'https://storage-api.nosi.cv/cms-portal-igrp/LOGO_default_01_7ac2b9de62.webp',
    alt: 'IGRP',
    width: 200,
    height: 80,
  },
  name: 'IGRP',
  description: 'IGRP',
};


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <section className="p-4">
          {children}
        </section>
      <IGRPToaster />
    </>
  )
}
