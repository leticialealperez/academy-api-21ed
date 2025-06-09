/*
  Warnings:

  - You are about to drop the `funcionalidades` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permissoes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "permissoes" DROP CONSTRAINT "permissoes_alunoId_fkey";

-- DropForeignKey
ALTER TABLE "permissoes" DROP CONSTRAINT "permissoes_funcionalidadeId_fkey";

-- AlterTable
ALTER TABLE "alunos" ADD COLUMN     "tipo" "TipoAluno" NOT NULL DEFAULT 'M';

-- DropTable
DROP TABLE "funcionalidades";

-- DropTable
DROP TABLE "permissoes";
