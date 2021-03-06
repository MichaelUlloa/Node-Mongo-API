import { Request, Response, Router} from "express";

class IndexRoutes{

    router: Router;
    constructor(){
        this.router = Router();
        this.Routes();
    }

    Routes(){
        this.router.get('/', (req, res) => res.send('Api: /api/posts'));
    }
}

const indexRouter = new IndexRoutes();
indexRouter.Routes();

export default indexRouter.router;