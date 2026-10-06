'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Boxes,
  FileSpreadsheet,
  LayoutDashboard,
  Scale,
  Store,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/cn';

type NavItem = { label: string; href: string; icon: LucideIcon; ready: boolean };
type NavSection = { title: string; items: NavItem[] };

// "ready: false" = módulo aún no construido; se va activando paso a paso
const sections: NavSection[] = [
  {
    title: 'General',
    items: [{ label: 'Inicio', href: '/', icon: LayoutDashboard, ready: true }],
  },
  {
    title: 'Maestras',
    items: [
      { label: 'Retailers', href: '/maestras/retailers', icon: Store, ready: false },
      { label: 'Productos', href: '/maestras/productos', icon: Boxes, ready: false },
    ],
  },
  {
    title: 'Ventas',
    items: [
      { label: 'Cargar archivos', href: '/ventas/cargas', icon: FileSpreadsheet, ready: false },
    ],
  },
  {
    title: 'Finanzas',
    items: [
      { label: 'Conciliación', href: '/conciliacion', icon: Scale, ready: false },
      { label: 'Reportes', href: '/reportes', icon: BarChart3, ready: false },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-60 shrink-0 flex-col bg-sidebar text-slate-200">
      <div className="flex h-16 items-center gap-2.5 border-b border-white/10 px-5">
        <div className="grid size-8 place-items-center rounded-md bg-brand-500 text-sm font-bold text-white">
          E
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold text-white">ERP Retail</p>
          <p className="text-[11px] text-sidebar-muted">Ventas y conciliación</p>
        </div>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="mb-1.5 px-2 text-[11px] font-medium tracking-wider text-sidebar-muted uppercase">
              {section.title}
            </p>
            <ul className="space-y-0.5">
              {section.items.map(({ label, href, icon: Icon, ready }) => {
                const active = pathname === href;
                if (!ready) {
                  return (
                    <li key={href}>
                      <span className="flex cursor-not-allowed items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-slate-500">
                        <Icon className="size-4" />
                        {label}
                        <span className="ml-auto rounded bg-white/5 px-1.5 py-0.5 text-[10px] text-slate-500">
                          pronto
                        </span>
                      </span>
                    </li>
                  );
                }
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        'flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm transition-colors',
                        active
                          ? 'bg-brand-500/20 font-medium text-white'
                          : 'text-slate-300 hover:bg-white/5 hover:text-white',
                      )}
                    >
                      <Icon className="size-4" />
                      {label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-white/10 px-5 py-3 text-[11px] text-sidebar-muted">
        v0.1.0 · desarrollo
      </div>
    </aside>
  );
}
