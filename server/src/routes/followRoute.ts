import express from 'express';
import { followUser, checkFollow } from '../controllers/followController';
import { jwtCheck } from '../middleware/jwtCheck';

const router = express.Router();

router.post('/', jwtCheck, followUser);
router.get('/check', jwtCheck, checkFollow);

export default router;