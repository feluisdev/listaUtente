//get servicos associados

import { NextRequest, NextResponse } from 'next/server';
import { callApi } from '@/app/[locale]/(myapp)/lib/api-server';
import { PaginatedResponse, Servico } from '@/app/[locale]/(myapp)/types/global';

const API_UTENTES_URL = process.env.NEXT_PUBLIC_API_URL_UTENTE + '/utentes/v1';

//get promise id
export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const response = await callApi<PaginatedResponse<Servico>>(`${API_UTENTES_URL}/${id}/divida`, {
      method: 'GET',
    });

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Erro ao buscar divida do utente:', error);
    return NextResponse.json([]);
  }
}
