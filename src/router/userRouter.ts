import { Router } from 'express';
import { authenticateToken } from '../middleware/authMiddleware';
import { signUp, signIn } from '../controller/userController';
import { validateBody } from '@/middleware/validationMiddleware';
import { signUpSchema, signInSchema } from '@/schema/userSchema';


const userRouter = Router();

userRouter
.post('/sign-up', validateBody(signUpSchema), signUp)
.post('/sign-in', validateBody(signInSchema), signIn);

export { userRouter };