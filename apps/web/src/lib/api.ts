import { healthResponseSchema, type HealthResponse } from '@erp/shared';

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4100/api';

/** fetch tipado: lanza error con el mensaje de la API si la respuesta no es 2xx */
async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Error ${res.status}: ${body || res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  /** Valida la respuesta con el mismo schema Zod que usa el backend */
  health: async (): Promise<HealthResponse> =>
    healthResponseSchema.parse(await request<unknown>('/health')),
};
