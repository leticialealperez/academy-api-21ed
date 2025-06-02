declare namespace Express {
  interface Request {
    alunoLogado: {
      id: string;
      nome: string;
      email: string;
      tipo: 'M' | 'F' | 'T'
    };
  }
}
