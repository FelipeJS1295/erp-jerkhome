#!/usr/bin/env bash
# Actualiza el ERP en el VPS con lo último de GitHub.
# Se corre como el usuario erpjerk:   ~/erp-jerkhome/deploy/update.sh
set -euo pipefail
cd "$(dirname "$0")/.."

echo "==> Bajando cambios de GitHub"
git pull --ff-only

echo "==> Instalando dependencias"
pnpm install --frozen-lockfile

echo "==> Aplicando migraciones de la base de datos"
pnpm db:migrate

echo "==> Compilando (shared, API y web)"
pnpm build

echo "==> Reiniciando servicios"
sudo systemctl restart erp-jerkhome-api erp-jerkhome-web

echo "==> Listo. Estado:"
systemctl --no-pager --lines=0 status erp-jerkhome-api erp-jerkhome-web || true