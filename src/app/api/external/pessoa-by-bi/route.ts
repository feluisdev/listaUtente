import { NextRequest, NextResponse } from 'next/server';
import { callApi } from '@/app/(myapp)/lib/api-server';

const EXTERNAL_BI_API_URL = process.env.EXTERNAL_BI_API_URL ;
const EXTERNAL_BI_API_TOKEN = process.env.EXTERNAL_BI_API_TOKEN;


export async function GET(req: NextRequest) {
  try {
    if (!EXTERNAL_BI_API_TOKEN) {
      return NextResponse.json({ error: 'EXTERNAL_BI_API_TOKEN environment variable is not configured' }, { status: 500 });
    }


    const { searchParams } = new URL(req.url);
    const bi = searchParams.get('bi');

    if (!bi) {
      return NextResponse.json({ error: 'BI é obrigatório' }, { status: 400 });
    }

    const response = await callApi(`${EXTERNAL_BI_API_URL}/bi_service_op?p_num_bi=${bi}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${EXTERNAL_BI_API_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    console.log(response);

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Erro ao buscar pessoa por BI:', error);
    return NextResponse.json({ error: 'Erro ao buscar pessoa por BI' }, { status: 500 });
  }
} 

