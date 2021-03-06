import { Request, Response, Router }from 'express';
import { title } from 'node:process';
import Post from '../models/post.model';

class PostRoutes{

    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    public async getPosts(req : Request, res: Response){
        const posts = await Post.find();
        return res.json(posts);
        
    }

    public async getPost(req : Request, res: Response){
        const paramUrl = req.params.url;
        const post = await Post.findOne({url: paramUrl});

        return res.json(post);
    }

    public async createPost(req : Request, res: Response){
        console.log(req.body);
        const { title, url, content, image } = req.body
        const newPost = new Post({ title, url, content, image });
        await newPost.save();
        res.json({data: newPost});
    }

    public async updatePost(req : Request, res: Response){
        const { url } = req.params;
    
        const updatedPost = await Post.findOneAndUpdate({url}, req.body, {new: true});

        return res.json(updatedPost);
    }

    public async deletePost(req : Request, res: Response){
        const { url } = req.params;
    
        await Post.findOneAndDelete({url});

        return res.json({message: 'Post deleted.'});
    }

    routes(){
        this.router.get('/', this.getPosts);
        this.router.get('/:url', this.getPost);
        this.router.post('/', this.createPost);
        this.router.put('/:url', this.updatePost);
        this.router.delete('/:url', this.deletePost);
    }
}

const postRouter = new PostRoutes();
export default postRouter.router;