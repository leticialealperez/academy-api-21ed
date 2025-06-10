import { CadastrarTurmaDto } from '../../src/dtos/turmas.dto';
import { TurmasService } from '../../src/services/turmas.service';
import { HTTPError } from '../../src/utils/http.error';

import { prismaMock } from '../config/prisma.mock';
import { randomUUID } from 'crypto'

describe('Testes para a classe TurmasService', () => {
    const sut = new TurmasService();

    test("Cadastrar turma", () => {
        it('Deve retornar um erro quando existir uma turma cadastrada com o mesmo valor de programa e edição', async () => {
            // 1 - Configurar os inputs e cenário
            const input: CadastrarTurmaDto = {
                edicao: 21,
                programa: 'Starter Dev Full Stack',
                maxAlunos: 20
            }
    
            const retornoMock = {
                ...input,
                id: randomUUID(),
                atualizado_em: new Date(),
                criadoEm: new Date()
            }
    
            prismaMock.turma.findUnique.mockResolvedValue(retornoMock);
     
    
    
            // 2 e 3 - Chamada ao método e o  que se espera que aconteça
            expect(() => sut.cadastrar(input)).rejects.toThrow(new HTTPError(409, "Já existe uma turma cadastrada com esse programa de formação e esta edição"))
        });

        it('Deve ser cadastrado a nova turma quando informado algo diferente de uma edição e programa previamente cadastrado', async () => {
            // 1 - Configurar os inputs e cenário
            const input: CadastrarTurmaDto = {
                edicao: 21,
                programa: 'Starter Dev Full Stack',
                maxAlunos: 20
            }
    
            const retornoMockFind = null;
            const retornoMockCreate = {
                ...input,
                id: randomUUID(),
                atualizado_em: new Date(),
                criadoEm: new Date()
            }
    
            prismaMock.turma.findUnique.mockResolvedValue(retornoMockFind);
            prismaMock.turma.create.mockResolvedValue(retornoMockCreate);
    
    
            // 2 - Chamada ao método]
            const result = await sut.cadastrar(input);
    
            // 3 - Validação
            expect(result).toBeDefined()
            expect(result).toEqual(retornoMockCreate);
            expect(result).toHaveProperty('id');
            expect(result.id).toBe(retornoMockCreate.id);
            expect(result).toHaveProperty('atualizado_em');
            expect(result.atualizado_em).toBe(retornoMockCreate.atualizado_em);
            expect(result).toHaveProperty('criadoEm');
            expect(result.criadoEm).toBe(retornoMockCreate.criadoEm);
        });
    });

    
    test('Listar turmas', () => {
        it('Deve retornar a lista de turmas totais quando não enviado nenhum filtro', async () => {
            // 1 - Construir o cenário
            const turmasMock = [
                {
                    id: randomUUID(),
                    atualizado_em: new Date(),
                    criadoEm: new Date(),
                    edicao: 21,
                    programa: "Dev Full Stack",
                    maxAlunos: 15
                },
                {
                    id: randomUUID(),
                    atualizado_em: new Date(),
                    criadoEm: new Date(),
                    edicao: 20,
                    programa: "Dev Full Stack",
                    maxAlunos: 20
                }
            ]
    
            prismaMock.turma.findMany.mockResolvedValue(turmasMock);
    
    
            // 2 - Invocar a função
            const result = await sut.listar({});
    
            expect(result).toBeDefined();
            expect(result).toHaveLength(2);
            expect(result).toEqual(turmasMock);
        });

        it('Deve retornar a lista de turmas correspondentes ao filtro de edição', async () => {
            // 1 - Construir o cenário
            const turmasMock = [
                {
                    id: randomUUID(),
                    atualizado_em: new Date(),
                    criadoEm: new Date(),
                    edicao: 21,
                    programa: "Dev Full Stack - Terça/Quinta",
                    maxAlunos: 15
                },
                {
                    id: randomUUID(),
                    atualizado_em: new Date(),
                    criadoEm: new Date(),
                    edicao: 21,
                    programa: "Dev Full Stack - Segunda/Quarta",
                    maxAlunos: 15
                },
                {
                    id: randomUUID(),
                    atualizado_em: new Date(),
                    criadoEm: new Date(),
                    edicao: 20,
                    programa: "Dev Full Stack",
                    maxAlunos: 20
                }
            ]
    
            prismaMock.turma.findMany.mockResolvedValue(turmasMock);
    
    
            // 2 - Invocar a função
            const result = await sut.listar({});
    
            expect(result).toBeDefined();
            expect(result).toHaveLength(2);
            expect(result).toEqual(turmasMock);
        });
    })


})