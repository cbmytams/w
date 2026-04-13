ALTER TABLE "Questionnaire" ADD COLUMN "tenantId" TEXT;

WITH default_tenant AS (
  SELECT "id"
  FROM "Tenant"
  WHERE "slug" = 'wafia'
  LIMIT 1
)
UPDATE "Questionnaire"
SET "tenantId" = default_tenant."id"
FROM default_tenant
WHERE "Questionnaire"."tenantId" IS NULL;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM "Questionnaire" WHERE "tenantId" IS NULL) THEN
    RAISE EXCEPTION 'Questionnaire backfill failed: tenant with slug "wafia" was not found';
  END IF;
END $$;

DROP INDEX IF EXISTS "Questionnaire_active_type_unique";

ALTER TABLE "Questionnaire" ALTER COLUMN "tenantId" SET NOT NULL;

ALTER TABLE "Questionnaire"
ADD CONSTRAINT "Questionnaire_tenantId_fkey"
FOREIGN KEY ("tenantId") REFERENCES "Tenant"("id")
ON DELETE RESTRICT
ON UPDATE CASCADE;

CREATE INDEX "Questionnaire_tenantId_idx" ON "Questionnaire"("tenantId");

CREATE UNIQUE INDEX "Questionnaire_active_tenant_type_unique"
ON "Questionnaire"("tenantId", "type")
WHERE "isActive" = true;
