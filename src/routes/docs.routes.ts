import { Router } from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../swagger-output.json';


export class DocsRoutes {
  public static bind(): Router {
    const router = Router();

    router.use("/docs", swaggerUi.serve);
    router.get("/docs", swaggerUi.setup(swaggerDoc));
    

    return router;
  }
}