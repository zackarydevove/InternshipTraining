import express from 'express';
import { register, login } from '../controllers/authController';
// import { jwtCheck } from '../middleware/jwtCheck';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

export default router;