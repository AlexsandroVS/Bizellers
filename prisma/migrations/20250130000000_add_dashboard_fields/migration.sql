-- Drop tabla existente y recrear desde cero
DROP TABLE IF EXISTS "leads" CASCADE;

-- Crear tabla leads con todos los campos necesarios
CREATE TABLE "leads" (
  "id" SERIAL PRIMARY KEY,
  "nombre" VARCHAR(255) NOT NULL,
  "cargo" VARCHAR(255) NOT NULL,
  "empresa" VARCHAR(255) NOT NULL,
  "telefono" VARCHAR(50) NOT NULL,
  "correo" VARCHAR(255) NOT NULL,
  "servicio" VARCHAR(255) NOT NULL,
  "mensaje" TEXT,
  "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "status" VARCHAR(50) NOT NULL DEFAULT 'nuevo',
  "notes" TEXT,
  "updated_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "status_history" JSONB
);

-- Crear índices para optimizar queries
CREATE INDEX "idx_leads_status" ON "leads"("status");
CREATE INDEX "idx_leads_created_at" ON "leads"("created_at");
CREATE INDEX "idx_leads_updated_at" ON "leads"("updated_at");
