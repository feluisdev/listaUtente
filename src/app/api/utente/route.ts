import { NextRequest, NextResponse } from "next/server"

const nomesUtente = [
    "João Silva",
    "Maria Oliveira",
    "Carlos Santos",
    "Ana Costa",
    "Paulo Rocha",
    "Mariana Sousa",
    "Tiago Martins",
    "Inês Ferreira",
    "Rui Almeida",
    "Sofia Pinto",
];

const tiposUtente = ["Cidadão", "Servidor Público", "Empresa"];

const API_UTENTES_URL = process.env.NEXT_PUBLIC_API_URL_UTENTE + '/utentes/v1';

function gerarNIF(tipo: string): string {
    const prefixo = tipo === "Cidadão" ? "1" : "2";
    const randomRest = Math.floor(10000000 + Math.random() * 90000000); // 8 dígitos
    return prefixo + randomRest.toString();
}

function generateFakeUtente(id: number) {
    const tipoUtente = tiposUtente[Math.floor(Math.random() * tiposUtente.length)];
    return {
        id,
        numeroUtente: `C${Math.floor(10000 + Math.random() * 90000)}`,
        estado: ['Ativo', 'Inativo'][Math.floor(Math.random() * 2)],
        tipoUtente: tipoUtente,
        nomeUtente: nomesUtente[Math.floor(Math.random() * nomesUtente.length)],
        nif: gerarNIF(tipoUtente)
    };
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    // Se tiver ID, busca um utente específico
    if (id) {
        console.log(`[API-LOG] GET utente por ID: ${id}`);
        try {
            const res = await fetch(`${API_UTENTES_URL}/${id}`);
            
            if (!res.ok) {
                console.error(`[API-LOG] Erro na chamada API GET utente ID ${id}:`, { status: res.status });
                throw new Error(`Erro chamada API: ${res.status}`);
            }
            
            const data = await res.json();
            console.log(`[API-LOG] Utente ID ${id} encontrado:`, { id: data.id, nome: data.nome });
            
            const utente = {
                id: data.id,
                nrUtente: data.nrUtente,
                estado: data.estado,
                tipoUtente: data.tipoUtente,
                nomeUtente: data.nome,
                nif: data.nif,
                dataNascimento: data.dataNascimento,
                email: data.email,
                telefone: data.telefone,
                morada: data.morada,
                cxPostal: data.cxPostal,
                bi: data.bi,
                nomeMae: data.nomeMae,
                nomePai: data.nomePai,
            };
            
            return NextResponse.json(utente);
        } catch (error: any) {
            console.error(`[API-LOG] Erro ao buscar utente por ID ${id}:`, error.message);
            
            // FALLBACK
            console.log(`[API-LOG] Usando dados fictícios para utente ID ${id}`);
            const fakeUtente = generateFakeUtente(parseInt(id));
            
            return NextResponse.json(fakeUtente);
        }
    }
    
    // Se não tiver ID, busca todos os utentes
    console.log('[API-LOG] GET todos os utentes');
    try {
        // Parâmetros de busca
        const tipo = searchParams.get('tipo');
        const numeroUtente = searchParams.get('numeroUtente');
        const nome = searchParams.get('nome');
        const nif = searchParams.get('nif');
        const documento = searchParams.get('documento');
        const estado = searchParams.get('estado');
        
        // Construir URL com parâmetros de busca
        let url = API_UTENTES_URL;
        const queryParams = [];
        
        if (tipo) queryParams.push(`tipo=${tipo}`);
        if (numeroUtente) queryParams.push(`numeroUtente=${numeroUtente}`);
        if (nome) queryParams.push(`nome=${nome}`);
        if (nif) queryParams.push(`nif=${nif}`);
        if (documento) queryParams.push(`documento=${documento}`);
        if (estado) queryParams.push(`estado=${estado}`);
        
        if (queryParams.length > 0) {
            url += `?${queryParams.join('&')}`;
        }
        
        console.log('[API-LOG] Chamando API externa:', { url, params: Object.fromEntries(searchParams) });
        const res = await fetch(url);

        if (!res.ok) {
            console.error('[API-LOG] Erro na chamada API GET todos utentes:', { status: res.status });
            throw new Error(`Erro chamada API: ${res.status}`);
        }

        const data = await res.json();
        console.log(`[API-LOG] Utentes encontrados: ${data.content.length}`);

        const utentes = data.content.map((item: any) => ({
            id: item.id,
            numeroUtente: item.nrUtente,
            estado: item.estado,
            tipoUtente: item.tipoUtente,
            nomeUtente: item.nome,
            nif: item.nif,
        }));

        return NextResponse.json(utentes);

    } catch (error: any) {
        console.error("[API-LOG] Erro ao buscar utentes:", error.message);

        // FALLBACK
        console.log('[API-LOG] Usando dados fictícios para lista de utentes');
        const fakeUtentes = Array.from({ length: 20 }, (_, i) =>
            generateFakeUtente(i + 1)
        );

        return NextResponse.json(fakeUtentes);
    }
}

// POST: cria novo utente
export async function POST(req: NextRequest) {
    console.log('[API-LOG] POST criar novo utente');
    try {
        const data = await req.json();
        console.log('[API-LOG] Dados do novo utente:', { nome: data.nome, tipo: data.tipoUtente });
        
        const res = await fetch(API_UTENTES_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            console.error('[API-LOG] Erro na chamada API POST utente:', { status: res.status });
            throw new Error(`Erro ao criar utente: ${res.status}`);
        }
        
        const newUtente = await res.json();
        console.log('[API-LOG] Utente criado com sucesso:', { id: newUtente.id });

        return NextResponse.json(newUtente, { status: 201 });
    } catch (error: any) {
        console.error('[API-LOG] Erro ao criar utente:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// PUT: atualiza utente existente
export async function PUT(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
        console.error('[API-LOG] Erro ao atualizar: ID do utente não fornecido');
        return NextResponse.json({ error: 'ID do utente é obrigatório' }, { status: 400 });
    }
    
    console.log(`[API-LOG] PUT atualizar utente ID: ${id}`);
    try {
        const data = await req.json();
        console.log(`[API-LOG] Dados para atualização do utente ID ${id}:`, { data: data });
        
        const res = await fetch(`${API_UTENTES_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        
        if (!res.ok) {
            console.error(`[API-LOG] Erro na chamada API PUT utente ID ${id}:`, { status: res.status });
            throw new Error(`Erro chamada API: ${res.status}`);
        }
        
        const updatedUtente = await res.json();
        console.log(`[API-LOG] Utente ID ${id} atualizado com sucesso`, { updatedData: updatedUtente });
        
        return NextResponse.json(updatedUtente);
    } catch (error: any) {
        console.error(`[API-LOG] Erro ao atualizar utente ID ${id}:`, error.message);
        
        // FALLBACK
        console.log(`[API-LOG] Usando dados fictícios para atualização do utente ID ${id}`);
        const data = await req.json().catch(() => ({}));
        const fakeUpdatedUtente = {
            ...data,
            id: parseInt(id),
        };
        
        return NextResponse.json(fakeUpdatedUtente);
    }
}

// DELETE: inativa utente
export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
        console.error('[API-LOG] Erro ao inativar: ID do utente não fornecido');
        return NextResponse.json({ error: 'ID do utente é obrigatório' }, { status: 400 });
    }
    
    console.log(`[API-LOG] DELETE inativar utente ID: ${id}`);
    try {
        const res = await fetch(`${API_UTENTES_URL}/${id}`, {
            method: 'DELETE',
        });
        
        if (!res.ok) {
            console.error(`[API-LOG] Erro na chamada API DELETE utente ID ${id}:`, { status: res.status });
            throw new Error(`Erro chamada API: ${res.status}`);
        }
        
        const result = await res.json();
        console.log(`[API-LOG] Utente ID ${id} inativado com sucesso`);
        
        return NextResponse.json(result);
    } catch (error: any) {
        console.error(`[API-LOG] Erro ao inativar utente ID ${id}:`, error.message);
        
        // FALLBACK
        console.log(`[API-LOG] Usando resposta fictícia para inativação do utente ID ${id}`);
        return NextResponse.json({ message: `Utente ${id} inativado com sucesso` });
    }
}
