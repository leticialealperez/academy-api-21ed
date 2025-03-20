-- CreateTable
CREATE TABLE "matriculas" (
    "aluno_id" UUID NOT NULL,
    "turma_id" UUID NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "data_matricula" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "matriculas_pkey" PRIMARY KEY ("aluno_id","turma_id")
);

-- AddForeignKey
ALTER TABLE "matriculas" ADD CONSTRAINT "matriculas_aluno_id_fkey" FOREIGN KEY ("aluno_id") REFERENCES "alunos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matriculas" ADD CONSTRAINT "matriculas_turma_id_fkey" FOREIGN KEY ("turma_id") REFERENCES "turmas"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
