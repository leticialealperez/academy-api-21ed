/*
  Warnings:

  - You are about to drop the column `auth_token` on the `alunos` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `alunos` table. All the data in the column will be lost.
  - You are about to drop the `fas` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "fas" DROP CONSTRAINT "fas_aluno_fa_id_fkey";

-- DropForeignKey
ALTER TABLE "fas" DROP CONSTRAINT "fas_aluno_original_id_fkey";

-- AlterTable
ALTER TABLE "alunos" DROP COLUMN "auth_token",
DROP COLUMN "tipo";

-- DropTable
DROP TABLE "fas";

-- CreateTable
CREATE TABLE "funcionalidades" (
    "id" UUID NOT NULL,
    "nome" TEXT NOT NULL,
    "estaAtiva" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "funcionalidades_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissoes" (
    "alunoId" UUID NOT NULL,
    "funcionalidadeId" UUID NOT NULL,
    "criar" BOOLEAN NOT NULL,
    "atualizar" BOOLEAN NOT NULL,
    "deletar" BOOLEAN NOT NULL,
    "ler" BOOLEAN NOT NULL,

    CONSTRAINT "permissoes_pkey" PRIMARY KEY ("alunoId","funcionalidadeId")
);

-- AddForeignKey
ALTER TABLE "permissoes" ADD CONSTRAINT "permissoes_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permissoes" ADD CONSTRAINT "permissoes_funcionalidadeId_fkey" FOREIGN KEY ("funcionalidadeId") REFERENCES "funcionalidades"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
