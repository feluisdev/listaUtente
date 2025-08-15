'use client';

/* THIS FILE WAS GENERATED AUTOMATICALLY BY iGRP STUDIO. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { use, useState, useEffect, useRef } from 'react';
import { cn, useIGRPMenuNavigation, useIGRPToast } from '@igrp/igrp-framework-react-design-system';
import {
  IGRPDataTableFacetedFilterFn,
  IGRPDataTableDateRangeFilterFn,
} from '@igrp/igrp-framework-react-design-system';
import {
  IGRPDataTableHeaderSortToggle,
  IGRPDataTableHeaderSortDropdown,
  IGRPDataTableHeaderRowsSelect,
} from '@igrp/igrp-framework-react-design-system';
import {
  IGRPPageHeader,
  IGRPDataTable,
  IGRPDataTableCellBadge,
} from '@igrp/igrp-framework-react-design-system';
import { useFetchDivida } from '@/app/(myapp)/functions/services/utente-service';

export default function PageDividaComponent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  type Table1 = {
    duc: string;
    valor: number;
    juros: number;
    dtLimite: string;
    sujeito: number;
    servicos: string;
    estado: string;
  };

  const [contentTabletable1, setContentTabletable1] = useState<Table1[]>([]);

  const { igrpToast } = useIGRPToast();

  const { data, isLoading } = useFetchDivida(id);

  useEffect(() => {
    if (isLoading || !data) return;
    setContentTabletable1(data.content || []);
  }, []);

  return (
    <div className={cn('page', 'space-y-6')}>
      <div className={cn('section', ' space-x-6 space-y-6')}>
        <IGRPPageHeader
          name={`pageHeader1`}
          title={`Divida do Utente`}
          iconBackButton={`ArrowLeft`}
          showBackButton={true}
          urlBackButton={`/utentes`}
          variant={`h3`}
        >
          <div className="flex items-center gap-2"></div>
        </IGRPPageHeader>

        <IGRPDataTable<Table1, Table1>
          columns={[
            {
              header: 'DUC',
              accessorKey: 'duc',
              cell: ({ row }) => {
                return row.getValue('duc');
              },
              filterFn: IGRPDataTableFacetedFilterFn,
            },
            {
              header: 'Valor',
              accessorKey: 'valor',
              cell: ({ row }) => {
                return row.getValue('valor');
              },
              filterFn: IGRPDataTableFacetedFilterFn,
            },
            {
              header: 'Juros',
              accessorKey: 'juros',
              cell: ({ row }) => {
                return row.getValue('juros');
              },
              filterFn: IGRPDataTableFacetedFilterFn,
            },
            {
              header: 'Data Limite',
              accessorKey: 'dtLimite',
              cell: ({ row }) => {
                return row.getValue('dtLimite');
              },
              filterFn: IGRPDataTableFacetedFilterFn,
            },
            {
              header: 'Sujeito',
              accessorKey: 'sujeito',
              cell: ({ row }) => {
                return row.getValue('sujeito');
              },
              filterFn: IGRPDataTableFacetedFilterFn,
            },
            {
              header: 'Serviços',
              accessorKey: 'servicos',
              cell: ({ row }) => {
                const rowData = row.original;

                return (
                  <IGRPDataTableCellBadge
                    label={row.original.servicos}
                    variant={`soft`}
                    badgeClassName={``}
                  ></IGRPDataTableCellBadge>
                );
              },
              filterFn: IGRPDataTableFacetedFilterFn,
            },
            {
              header: 'Estado',
              accessorKey: 'estado',
              cell: ({ row }) => {
                const rowData = row.original;

                return (
                  <IGRPDataTableCellBadge
                    label={row.original.estado}
                    variant={`soft`}
                    badgeClassName={``}
                  ></IGRPDataTableCellBadge>
                );
              },
              filterFn: IGRPDataTableFacetedFilterFn,
            },
          ]}
          clientFilters={[]}
          data={contentTabletable1}
        />
      </div>
    </div>
  );
}
