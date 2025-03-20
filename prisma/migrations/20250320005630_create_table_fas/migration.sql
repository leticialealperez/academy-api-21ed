-- CreateTable
CREATE TABLE "fas" (
    "aluno_original_id" UUID NOT NULL,
    "aluno_fa_id" UUID NOT NULL,

    CONSTRAINT "fas_pkey" PRIMARY KEY ("aluno_original_id","aluno_fa_id")
);

-- AddForeignKey
ALTER TABLE "fas" ADD CONSTRAINT "fas_aluno_original_id_fkey" FOREIGN KEY ("aluno_original_id") REFERENCES "alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fas" ADD CONSTRAINT "fas_aluno_fa_id_fkey" FOREIGN KEY ("aluno_fa_id") REFERENCES "alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
