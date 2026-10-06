/**
 * Esquema de la base de datos (Drizzle ORM).
 *
 * Cada módulo del ERP tendrá su archivo y se re-exporta desde aquí:
 *   export * from './retailers.js';
 *   export * from './products.js';
 *   export * from './sales.js';
 *
 * Después de agregar o cambiar tablas:
 *   pnpm db:generate   -> crea el archivo de migración SQL en apps/api/drizzle
 *   pnpm db:migrate    -> lo aplica en Postgres
 */
export {};
