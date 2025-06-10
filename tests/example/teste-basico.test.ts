import { Calculadora } from "./calculadora";

// Define uma switch/conjunto/escopo de teste
describe("Testes da classe Calculadora", () => {
  test("deve retornar o valor 5 quando invocado o método somar enviando n1=2 e n2=3", () => {
    // 1 - Cria o SUT
    const sut = new Calculadora();

    // Executa o código
    const result = sut.somar(2, 3);

    // Realiza as validações
    expect(result).toBe(5);
  });

  test("deve retornar o valor 3 quando invocado o método subtrair enviando n1=5 e n2=2", () => {
    // 1 - Cria o SUT
    const sut = new Calculadora();

    // Executa o código
    const result = sut.subtrair(5, 2);

    // Realiza as validações
    expect(result).toBe(3);
  });

  test("deve retornar o valor 6 quando invocado o método multiplicar enviando n1=3 e n2=2", () => {
    // 1 - Cria o SUT
    const sut = new Calculadora();

    // Executa o código
    const result = sut.multiplicar(3, 2);

    // Realiza as validações
    expect(result).toBe(6);
  });

  test("Deve retornar um erro quando invocado o método dividir qualquer número por zero", () => {
    // 1 - Cria o SUT
    const sut = new Calculadora();

    // Executa o código


    // Realiza as validações
    expect(() => sut.dividir(5, 0)).toThrow('Não é possível dividir por zero');
  });

  test("deve retornar o valor 2 quando invocado o método dividir enviando n1=10 e n2=5", () => {
    // 1 - Cria o SUT
    const sut = new Calculadora();

    // Executa o código
    const result = sut.dividir(10, 5);

    // Realiza as validações
    expect(result).toBe(2);
  });


});
