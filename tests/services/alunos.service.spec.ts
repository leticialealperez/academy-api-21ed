import { randomUUID } from 'crypto'
import { CadastrarAlunoDto } from '../../src/dtos/alunos.dto'
import { prismaMock } from '../config/prisma.mock'
import { AlunosService } from '../../src/services/alunos.service'
import { HTTPError } from '../../src/utils/http.error'
import { Bcrypt } from '../../src/utils/bcrypt'


describe('Testes na classe AlunoService', () => {
    const sut = new AlunosService();

    it('Cadastrar - Deve retornar um erro quando já possuir um aluno com o email enviado', () => {
        // 1 - Organização / Arrange
        const input: CadastrarAlunoDto = {
            nome: "João da Silva",
            email: "joao@gmail.com",
            senha: "senha123",
            tipo: "M",
            idade: 20
        }

        const mockUser = {
            ...input,
            idade: input.idade ?? null,
            id: randomUUID(),
            criadoEm: new Date(),
            atualizadoEm: new Date()
        }

        prismaMock.aluno.findUnique.mockResolvedValue(mockUser)

        // 2 - Ação que deve executar/ser chamada - Act
        // const result = await sut.cadastrar(input);


        // 3 - Validações do resultado - Assert
        expect(() => sut.cadastrar(input)).rejects.toThrow(new HTTPError(409, "E-mail já cadastrado por outro aluno"))
    })

    it('Cadastrar - Deve retornar o aluno cadastrado quando enviado o payload correto', async () => {
        // 1 - Organização / Arrange
        const input: CadastrarAlunoDto = {
            nome: "João da Silva",
            email: "joao@gmail.com",
            senha: "senha123",
            tipo: "F",
            idade: 20
        }

        const mockFindUnique = null

        const mockHash = new Date().getTime().toString();

        const mockCreate = {
            ...input,
            senha: mockHash,
            idade: input.idade ?? null,
            id: randomUUID(),
            criadoEm: new Date(),
            atualizadoEm: new Date()
        }

        prismaMock.aluno.findUnique.mockResolvedValue(mockFindUnique)
        jest.spyOn(Bcrypt.prototype, "gerarHash").mockResolvedValue(mockHash)
        prismaMock.aluno.create.mockResolvedValue(mockCreate)
        

        // 2 - Ação que deve executar/ser chamada - Act
        const result = await sut.cadastrar(input);


        // 3 - Validações do resultado - Assert
        expect(result).toBeDefined()
        expect(result).toEqual(mockCreate)
        expect(result).toHaveProperty('id')
        expect(result.id).toBe(mockCreate.id)
    });

    it('Cadastrar - Deve retornar um erro quando enviado o payload incorreto ou com dados faltantes', async () => {
        // 1 - Organização / Arrange
        const inputIncorreto: any = {
            email: "joao@gmail.com",
            senha: "senha123",
            tipo: false,
            idade: "20"
        }

        const mockFindUnique = null

        const mockHash = new Date().getTime().toString();

        prismaMock.aluno.findUnique.mockResolvedValue(mockFindUnique)
        jest.spyOn(Bcrypt.prototype, "gerarHash").mockResolvedValue(mockHash)
        prismaMock.aluno.create.mockRejectedValueOnce(new Error('Não foi possivel cadastrar'))
        

        // 2 - Ação que deve executar/ser chamada - Act
        // 3 - Validações do resultado - Assert
        expect(() => sut.cadastrar(inputIncorreto)).rejects.toBeInstanceOf(Error)
        // expect(() => sut.cadastrar(inputIncorreto)).rejects.toThrow('Não foi possivel cadastrar')
    });

})