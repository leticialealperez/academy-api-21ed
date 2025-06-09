import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'API Academy',
    version: "1.0.0",
    description: 'API para controle acadêmico de alunos e seus projetos',
    contact: {
        name: "Leticia Leal",
        email: "leticia.leal@growdev.academy",
        url: "https://github.com/leticialealperez"
    }
  },
  servers: [
    {
        url: "http://minhaurl-api.render.com/v1",
        description: "V1 do sistema"
    },
    {
        url: "http://minhaurl-api.render.com/v2",
        description: "V2 do sistema"
    }
  ],
  tags: [
    {
        name: "Auth",
        description: "Recursos de autenticação e autorização"
    },
    {
        name: "Alunos",
        description: "Todos as funcionalidades para alunos"
    },
    {
        name: "Turmas",
        description: "Todos as funcionalidades para turmas"
    },
    {
        name: "Matriculas",
        description: "Todos as funcionalidades para matriculas"
    },
    {
        name: "Projetos",
        description: "Todos as funcionalidades para projetos"
    }
  ],
  components: {
    schemas: {
        respostaSucesso: {
            $sucesso: true,
            $mensagem: "Mensagem de sucesso",
            $dados: {}
        },
        respostaFalha: {
            $sucesso: false,
            $mensagem: "Mensagem de falha",
            detalhe: "Mensagem com o erro detalhado"
        },
        turma: {
            $id: '00b6b0b3-fd88-4423-8cda-4155a3317151',
            $programa: "Programa Starter",
            $edicao: 21,
            $maxAlunos: 30,
            criadoEm: "2025-06-05T00:43:41.842Z",
            atualizado_em: "2025-06-05T00:43:41.842Z"
        },
        createTurma: {
            $programa: "Programa Starter",
            $edicao: 21,
            $maxAlunos: 30,
        }
    },
  }
};

const outputFile = './src/swagger-output.json';
const routes = [
    './src/routes/alunos.routes.ts', 
    './src/routes/auth.routes.ts', 
    './src/routes/matriculas.routes.ts', 
    './src/routes/projetos.routes.ts', 
    './src/routes/turmas.routes.ts', 
];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({ openapi: "3.0.4" })(outputFile, routes, doc);