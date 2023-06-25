import express, { Request, Response } from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import { userRouter } from "./router/userRouter";
import { handleApplicationErrors } from '@/middleware/errorHandlingMiddleware';
import prisma from './config/database';

dotenv.config();

const app = express();
app.use(express.json())
app.use(cors());

app.get("/health", (req: Request, res: Response) => {
    res.status(200).send("OK");
});

app.use("/user", userRouter);
app.use(handleApplicationErrors);

export function init(): Promise<express.Express> {
    return prisma.$connect().then(() => {
        return app;
    });
}

export default app;
