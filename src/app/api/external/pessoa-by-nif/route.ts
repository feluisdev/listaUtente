import { NextRequest, NextResponse } from 'next/server';
import { callApi } from '@/app/[locale]/(myapp)/lib/api-server';

const EXTERNAL_API_URL = process.env.EXTERNAL_API_URL ;
const API_TOKEN = process.env.EXTERNAL_API_TOKEN;

export async function GET(req: NextRequest) {
  try {
    if (!API_TOKEN) {
      return NextResponse.json({ error: 'EXTERNAL_API_TOKEN environment variable is not configured' }, { status: 500 });
    }

    const { searchParams } = new URL(req.url);
    const nif = searchParams.get('nif');

    if (!nif) {
      return NextResponse.json({ error: 'NIF parameter is required' }, { status: 400 });
    }

    const response = await callApi(`${EXTERNAL_API_URL}/getPessoaByNif?NIF=${nif}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer Token: ${API_TOKEN}`,
      },
    });
    console.log(response);

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Erro ao buscar pessoa por NIF:', error);
    return NextResponse.json({ error: 'Erro ao buscar pessoa por NIF' }, { status: 500 });
  }
} 