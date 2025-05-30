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


function gerarNIF(tipo: string): string {
    const prefixo = tipo === "Cidadão" ? "1" : "2";
    const randomRest = Math.floor(10000000 + Math.random() * 90000000); // 8 dígitos para completar os 9
    return prefixo + randomRest.toString();
}

const tiposUtente = ["Cidadão", "Camara", "Empresa"];

export async function GET(req: NextRequest) {

    function generateFakeUtente(id: number) {

        const tipoUtente = tiposUtente[Math.floor(Math.random() * tiposUtente.length)];

        return {
            id,
            numeroUtente: `C${Math.floor(10000 + Math.random() * 10)}`,
            estado: ['Ativo', 'Inativo'][Math.floor(Math.random() * 2)],
            tipoUtente: tipoUtente,
            nomeUtente: nomesUtente[Math.floor(Math.random() * nomesUtente.length)],
            nif: gerarNIF(tipoUtente)

        };
    }

    const fakeUtentes = Array.from({ length: 20 }, (_, i) =>
        generateFakeUtente(i + 1)
    );

    return NextResponse.json(fakeUtentes)
}
