-- CreateEnum
CREATE TYPE "TipoAluno" AS ENUM ('M', 'F', 'T');

-- AlterTable
ALTER TABLE "alunos" ADD COLUMN     "tipo" "TipoAluno" NOT NULL DEFAULT 'M';
