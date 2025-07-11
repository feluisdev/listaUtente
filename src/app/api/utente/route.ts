import { callApi } from '@/app/[locale]/(myapp)/lib/api-server';
import { PaginatedResponse, Utente } from '@/app/[locale]/(myapp)/types/global';
import { NextRequest, NextResponse } from 'next/server';

const nomesUtente = [
  'João Silva',
  'Maria Oliveira',
  'Carlos Santos',
  'Ana Costa',
  'Paulo Rocha',
  'Mariana Sousa',
  'Tiago Martins',
  'Inês Ferreira',
  'Rui Almeida',
  'Sofia Pinto',
];

const tiposUtente = ['Cidadão', 'Camara', 'Empresa'];

const API_UTENTES_URL = process.env.NEXT_PUBLIC_API_URL_UTENTE + '/utentes/v1';

export async function GET(req: NextRequest) {
  try {

    const utenteId = req.nextUrl.searchParams.get('utenteId') ?? '';
    if (utenteId) {
      const res = await callApi<any>(`${API_UTENTES_URL}/${utenteId}`, {
        method: 'GET',
      });

      return NextResponse.json(res);
    }

    const response = await callApi<PaginatedResponse<Utente>>(
      `${API_UTENTES_URL}`,
      {
        method: 'GET',
      },
    );

    return NextResponse.json(response.content || []);
  } catch (error: any) {
    console.error('Erro ao buscar utentes:', error);
    return NextResponse.json([]);
  }
}

// POST: cria novo utente
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await callApi<any>(API_UTENTES_URL, {
      method: 'POST',
      body: JSON.stringify(body),
    });

    return NextResponse.json(res, { status: 201 });
  } catch (error: any) {
    console.error('Erro ao criar utente:', error);
    return NextResponse.json(
      {
        message: error.details || error.message,
        title: error.title || 'Erro',
      },
      { status: 500 },
    );
  }
}

// PUT: atualiza utente existente
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const utenteId = req.nextUrl.searchParams.get('id');

    if (!utenteId) {
      return NextResponse.json(
        { message: 'ID do utente é obrigatório' },
        { status: 400 },
      );
    }

    const res = await callApi<any>(`${API_UTENTES_URL}/${utenteId}`, {
      method: 'PUT',
      body: JSON.stringify(body),
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error: any) {
    console.error('Erro ao atualizar utente:', error);
    return NextResponse.json(
      {
        message: error.details || error.message,
        title: error.title || 'Erro',
      },
      { status: 500 },
    );
  }
}

// DELETE: inativa utente
export async function DELETE(req: NextRequest) {      
  try {
    const utenteId = req.nextUrl.searchParams.get('id');

    if (!utenteId) {
      return NextResponse.json(
        { message: 'ID do utente é obrigatório' },
        { status: 400 },
      );
    }

    const res = await callApi<any>(`${API_UTENTES_URL}/${utenteId}`, {
      method: 'DELETE',
    });

    return NextResponse.json(res, { status: 200 });
  } catch (error: any) {
    console.error('Erro ao inativar utente:', error);
    return NextResponse.json(
      {
        message: error.details || error.message,
        title: error.title || 'Erro',
      },
      { status: 500 },
    );
  }
}