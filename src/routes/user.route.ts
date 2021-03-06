import { Request, Response, Router }from 'express';
import { title } from 'node:process';
import User from '../models/user.model';

class UserRoutes{

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    public async getUsers(req : Request, res: Response){
        const users = await User.find();
        return res.json(users);
        
    }

    public async getUser(req : Request, res: Response){
        const paramUrl = req.params.url;
        const user = await User.findOne({username: req.params.username}).populate('posts');

        return res.json(user);
    }

    public async createUser(req : Request, res: Response){
        const newUser = new User(req.body);

        await newUser.save();
        res.json({data: newUser});
    }

    public async updateUser(req : Request, res: Response){
        const { username } = req.params;
    
        const updatedUser = User.findOneAndUpdate({username}, req.body, {new: true});

        return res.json(updatedUser);
    }

    public async deleteUser(req : Request, res: Response){
        const { username } = req.params;
    
        await User.findOneAndDelete({username});

        return res.json({message: 'User deleted.'});
    }

    routes(){
        this.router.get('/', this.getUsers);
        this.router.get('/:username', this.getUser);
        this.router.post('/', this.createUser);
        this.router.put('/:username', this.updateUser);
        this.router.delete('/:username', this.deleteUser);
    }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;