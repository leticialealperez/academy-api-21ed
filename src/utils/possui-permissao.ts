import { Permissao } from "../dtos/alunos.dto";

/**
 * Formato do objeto aceito para verificar se o usuario possui ou não autorização para um recurso.
 */
interface PossuiPermissaoDto {
    /**
     * Verbo HTTP do recurso em questão GET, POST, PUT ou DELETE
     */
    verboHttp: string;

    /**
     * Qual o path/rota que está sendo acessada
     */
    rota: string;

    /**
     * Lista de permissões do usuário/aluno logado
     */
    permissoesAluno: Permissao[];
}

export function possuiPermissao(params: PossuiPermissaoDto): boolean {

    const permissao = params.permissoesAluno.find((p) => params.rota.includes(p.funcionalidade))

    if(!permissao) return false;

    switch(params.verboHttp) {
        case 'GET':
            return permissao.ler
        case 'POST':
            return permissao.criar
        case 'PUT':
            return permissao.atualizar
        case 'DELETE':
            return permissao.deletar
        default:
            return false;
    }

}