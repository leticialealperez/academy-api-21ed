export class Calculadora {
    public somar(n1: number, n2: number) {
        return n1 + n2
    }


    public subtrair(n1: number, n2: number) {
        return n1 - n2
    }


    public multiplicar(n1: number, n2: number) {
        return n1 * n2
    }


    public dividir(n1: number, n2: number) {
        if (n2 === 0) {
            throw new Error('Não é possível dividir por zero')
        }


        return n1 / n2
    }
}