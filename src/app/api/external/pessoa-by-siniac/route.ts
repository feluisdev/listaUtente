import { NextRequest, NextResponse } from 'next/server';
import { callApi } from '@/app/[locale]/(myapp)/lib/api-server';

const EXTERNAL_SINIAC_API_URL = process.env.EXTERNAL_SINIAC_API_URL ;
const EXTERNAL_SINIAC_API_TOKEN = process.env.EXTERNAL_SINIAC_API_TOKEN;


export async function GET(req: NextRequest) {
  try {
    if (!EXTERNAL_SINIAC_API_TOKEN) {
      return NextResponse.json({ error: 'EXTERNAL_SINIAC_API_TOKEN environment variable is not configured' }, { status: 500 });
    }


    const { searchParams } = new URL(req.url);
    const numeroSiniac = searchParams.get('numeroSiniac');

    if (!numeroSiniac) {
      return NextResponse.json({ error: 'Número de Siniac é obrigatório' }, { status: 400 });
    }

    const response = await callApi(`${EXTERNAL_SINIAC_API_URL}/getDadosCidadaoByNumDoc?P_NUM_DOCUMENTO=${numeroSiniac}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${EXTERNAL_SINIAC_API_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    console.log(response);

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Erro ao buscar pessoa por Número de Siniac:', error);
    return NextResponse.json({ error: 'Erro ao buscar pessoa por Número de Siniac' }, { status: 500 });
  }
} 

