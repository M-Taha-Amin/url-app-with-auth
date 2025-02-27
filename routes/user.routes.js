import { Router } from 'express';
import {
  getMe,
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/user.controller.js';
import { verifyJwt } from '../middlewares/verifyJwt.js';

const router = Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.get('/me', verifyJwt, getMe);
router.post('/logout', logoutUser);

export default router;
