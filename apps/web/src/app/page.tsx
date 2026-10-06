'use client';

import { useQuery } from '@tanstack/react-query';
import { CheckCircle2, Circle, Database, RefreshCw, Server, XCircle } from 'lucide-react';
import type { ReactNode } from 'react';
import { api, API_URL } from '@/lib/api';
import { cn } from '@/lib/cn';

// Hoja de ruta hasta llegar a la carga de archivos de ventas
const roadmap = [
  { step: 'Base del proyecto: monorepo, API, frontend y base de datos', done: true },
  { step: 'Maestra de retailers (Falabella, Ripley, Paris, Walmart…)', done: false },
  { step: 'Maestra de productos y mapeo de SKU por retailer', done: false },
  { step: 'Subida de archivos y lotes de carga (cola BullMQ)', done: false },
  { step: 'Adaptador de ventas del primer retailer', done: false },
  { step: 'Excepciones y corrección manual de filas', done: false },
];

export default function HomePage() {
  const health = useQuery({ queryKey: ['health'], queryFn: api.health });

  const apiOk = health.isSuccess;
  const dbOk = health.data?.database.connected ?? false;

  return (
    <div className="mx-auto max-w-5xl px-8 py-10">
      <header className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Inicio</h1>
          <p className="mt-1 text-sm text-slate-500">Estado del sistema y avance del proyecto.</p>
        </div>
        <button
          onClick={() => health.refetch()}
          className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm hover:bg-slate-50"
        >
          <RefreshCw className={cn('size-4', health.isFetching && 'animate-spin')} />
          Verificar
        </button>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        <StatusCard
          icon={<Server className="size-5" />}
          title="API (NestJS)"
          loading={health.isLoading}
          ok={apiOk}
          okText="Respondiendo"
          errorText="Sin respuesta"
        >
          {apiOk ? (
            <Detail label="Versión" value={health.data.api.version} />
          ) : (
            <p className="text-xs text-slate-500">
              No se pudo conectar a <code className="font-mono">{API_URL}</code>. ¿Está corriendo{' '}
              <code className="font-mono">pnpm dev</code>?
            </p>
          )}
          {apiOk && <Detail label="Activa hace" value={`${health.data.api.uptimeSeconds} s`} />}
        </StatusCard>

        <StatusCard
          icon={<Database className="size-5" />}
          title="Base de datos (PostgreSQL)"
          loading={health.isLoading}
          ok={dbOk}
          okText="Conectada"
          errorText={apiOk ? 'Sin conexión' : 'Desconocido'}
        >
          {dbOk ? (
            <>
              <Detail label="Servidor" value={health.data?.database.version ?? '—'} />
              <Detail
                label="Hora del servidor"
                value={new Date(health.data!.database.serverTime!).toLocaleString('es-CL')}
              />
            </>
          ) : (
            <p className="text-xs text-slate-500">
              {health.data?.database.error ??
                'Levanta la base con docker compose up -d y vuelve a verificar.'}
            </p>
          )}
        </StatusCard>
      </section>

      <section className="mt-8 rounded-lg border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-3">
          <h2 className="text-sm font-semibold">Hoja de ruta hacia la carga de ventas</h2>
        </div>
        <ol className="divide-y divide-slate-100">
          {roadmap.map(({ step, done }, i) => (
            <li key={step} className="flex items-center gap-3 px-5 py-3 text-sm">
              {done ? (
                <CheckCircle2 className="size-4 text-emerald-600" />
              ) : (
                <Circle className="size-4 text-slate-300" />
              )}
              <span className="w-5 text-xs text-slate-400 tabular-nums">{i + 1}.</span>
              <span className={cn(done ? 'text-slate-900' : 'text-slate-500')}>{step}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

function StatusCard(props: {
  icon: ReactNode;
  title: string;
  loading: boolean;
  ok: boolean;
  okText: string;
  errorText: string;
  children: ReactNode;
}) {
  const { icon, title, loading, ok, okText, errorText, children } = props;
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-slate-700">
          <span className="grid size-9 place-items-center rounded-md bg-brand-50 text-brand-600">
            {icon}
          </span>
          <h3 className="text-sm font-medium">{title}</h3>
        </div>
        {loading ? (
          <span className="text-xs text-slate-400">Verificando…</span>
        ) : ok ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
            <CheckCircle2 className="size-3.5" /> {okText}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700">
            <XCircle className="size-3.5" /> {errorText}
          </span>
        )}
      </div>
      <div className="mt-4 space-y-1.5">{loading ? null : children}</div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-xs">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-700">{value}</span>
    </div>
  );
}
