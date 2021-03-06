import express from "express";
import morgan from "morgan";
import helmet from "helmet"
import mongoose from 'mongoose';
import compression from 'compression';
import cors from 'cors';
 
import indexRouter from './routes/index.route';
import postRoutes from './routes/post.route';
import userRoutes from './routes/user.route';

class Server{

    public app: express.Application;
    
    constructor(){
        this.app = express();
        this.Config();
        this.Routes();
    }

    Config(){
        const MONGO_URI  = 'mongodb://localhost/rest-api';
        mongoose.set('useFindAndModify', true);
        mongoose.connect(MONGO_URI || process.env.MONGODB_URL,{
            useNewUrlParser: true,
            useCreateIndex: true
        }).then(db => console.log('db is connected'));

        //Settings
        this.app.set('port', process.env.PORT || 3000);

        //Middlewares
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cors());
    }

    Routes(){
        this.app.use('/api', indexRouter);
        this.app.use('/api/posts', postRoutes);
        this.app.use('/api/users', userRoutes);
    }

    Start(){
        this.app.listen(this.app.get('port'), () => {
            console.log('Server listening on port', this.app.get('port'))
        });
    }
}

const server = new Server();
server.Start();