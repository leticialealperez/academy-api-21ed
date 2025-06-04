// DTO -> Data Transfer Object -> objeto de transferencia de dados estruturados
export interface CadastrarAlunoDto {
  nome: string;
  idade?: number;
  email: string;
  senha: string;
  tipo: 'T' | 'M' | 'F';
}

export interface ListarAlunosDto {
  nome?: string;
}

export type AtualizarAlunoDto = Partial<CadastrarAlunoDto> & { id: string };

export interface Permissao {
  funcionalidade: string;
  criar: boolean;
  atualizar: boolean;
  deletar: boolean;
  ler: boolean;
}
