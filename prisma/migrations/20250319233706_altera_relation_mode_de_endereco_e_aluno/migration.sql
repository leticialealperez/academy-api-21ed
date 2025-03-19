-- DropForeignKey
ALTER TABLE "enderecos" DROP CONSTRAINT "enderecos_aluno_id_fkey";

-- AddForeignKey
ALTER TABLE "enderecos" ADD CONSTRAINT "enderecos_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "alunos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
