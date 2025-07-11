import { callClientApi } from "../lib/api-client";
import { Utente } from "../types/global";

export async function getUtenteByID(utenteId: string) {
    return await callClientApi<Utente>(`/api/utente?utenteId=${utenteId}`, {
        method: 'GET',
    });
}