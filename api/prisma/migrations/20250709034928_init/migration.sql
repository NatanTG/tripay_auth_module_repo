-- CreateTable
CREATE TABLE "establishment" (
    "id" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "social_reason" TEXT NOT NULL,
    "trading_name" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "civil_status" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "rg_uf" TEXT NOT NULL,
    "rg_date" TIMESTAMP(3) NOT NULL,
    "gender" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "website" TEXT,
    "instagram" TEXT,
    "cnae" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "company_street" TEXT,
    "company_number" TEXT,
    "company_complement" TEXT,
    "company_neighborhood" TEXT,
    "company_city" TEXT,
    "company_state" TEXT,
    "company_zipcode" TEXT,
    "state_registration" TEXT,
    "founded_at" TIMESTAMP(3),
    "cadastur_expires_at" TIMESTAMP(3),
    "bank_account_type" TEXT,
    "bank_code" TEXT,
    "bank_agency" TEXT,
    "bank_agency_digit" TEXT,
    "bank_account_holder" TEXT,
    "bank_account_number" TEXT,
    "bank_account_digit" TEXT,
    "card_brand" TEXT,
    "monthly_invoice" DOUBLE PRECISION,
    "registration_status" TEXT DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "establishment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "establishment_cnpj_key" ON "establishment"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "establishment_cpf_key" ON "establishment"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "establishment_rg_key" ON "establishment"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "establishment_email_key" ON "establishment"("email");

-- CreateIndex
CREATE UNIQUE INDEX "establishment_cnae_key" ON "establishment"("cnae");

-- CreateIndex
CREATE UNIQUE INDEX "establishment_state_registration_key" ON "establishment"("state_registration");

-- CreateIndex
CREATE UNIQUE INDEX "establishment_bank_account_number_key" ON "establishment"("bank_account_number");
