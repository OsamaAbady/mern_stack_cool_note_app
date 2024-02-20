import "dotenv/config";
import express, { NextFunction, Request, Response } from 'express';
import notesRoutes from './routes/notesRoutes'
import usersRoutes from './routes/usersRoutes'
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import env from './util/validateEnv';
import MongoStore from "connect-mongo";
import { requiresAuth } from "./middleware/auth";

const app = express();

app.use(express.json());

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: "mongodb://127.0.0.1:27017/NoteDB"
    }),
}));

app.use('/api/users', usersRoutes);

app.use('/api/notes', requiresAuth, notesRoutes);

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred!";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

export default app;