import { Router } from 'express';

import getPosts from '#Controllers/feed/get-posts.controller.js';
import createPost from '#Controllers/feed/create-post.controller.js';

const feedRouter = Router();

feedRouter.route('/posts').get(getPosts);
feedRouter.route('/post').post(createPost);

export default feedRouter;
