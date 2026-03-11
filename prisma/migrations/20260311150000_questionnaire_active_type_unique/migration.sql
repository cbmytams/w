-- Enforce a single active questionnaire per type.
CREATE UNIQUE INDEX "Questionnaire_active_type_unique"
ON "Questionnaire"("type")
WHERE "isActive" = true;
