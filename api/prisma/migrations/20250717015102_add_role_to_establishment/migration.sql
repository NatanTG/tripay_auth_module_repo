-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'ESTABLISHMENT');

-- AlterTable
ALTER TABLE "establishment" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ESTABLISHMENT';
