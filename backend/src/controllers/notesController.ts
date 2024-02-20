import { RequestHandler } from 'express';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import NoteModel from '../models/noteSchema';
import { assertIsDefined } from '../util/assertIsDefined';

export const getNotes: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);
        const notes = await NoteModel.find({ userId: authenticatedUserId }).exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
}

export const getNoteById: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteID;
    try {

        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note ID");
        }

        const note = await NoteModel.findById(noteId).exec();

        if (!note) {
            throw createHttpError(404, "Note not found");
        }

        if (!note.userId.equals(req.session.userId)) {
            throw createHttpError(401, "You cannot access this note!");
        }

        res.status(201).json(note);
    } catch (error) {
        next(error);
    }
}

interface CreateNoteBody {
    title?: string,
    text?: string,
}

export const createNotes: RequestHandler<unknown, unknown, CreateNoteBody, unknown> = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;
    const title = req.body.title;
    const text = req.body.text;

    try {
        assertIsDefined(authenticatedUserId);

        if (!title) {
            throw createHttpError(400, "note must have a title")
        }

        const newNote = await NoteModel.create({
            userId: authenticatedUserId,
            title: title,
            text: text,
        });

        res.status(201).json(newNote);
    } catch (error) {
        next(error);
    }
}

interface UpdateNoteparams {
    noteID: string,
}

interface UpdateNoteBody {
    title?: string,
    text?: string,
}

export const updateNotes: RequestHandler<UpdateNoteparams, unknown, UpdateNoteBody, unknown> = async (req, res, next) => {
    const newTitle = req.body.title;
    const newtText = req.body.text;
    const noteId = req.params.noteID;
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note ID")
        }

        const note = await NoteModel.findById(noteId).exec();

        if (!note) {
            throw createHttpError(404, "Note not found")
        }

        if (!note.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this note!");
        }

        if (!newTitle) {
            throw createHttpError(400, "updated note must have a title")
        }

        note.title = newTitle;
        note.text = newtText;

        const updatedNote = await note.save();

        res.status(200).json(updatedNote);

    } catch (error) {
        next(error);
    }
}

export const deleteNotes: RequestHandler = async (req, res, next) => {
    const noteId = req.params.noteID;
    const authenticatedUserId = req.session.userId;
    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "Invalid note ID")
        }

        const note = await NoteModel.findById(noteId).exec();

        if (!note) {
            throw createHttpError(404, "Note not found")
        }

        if (!note.userId.equals(authenticatedUserId)) {
            throw createHttpError(401, "You cannot access this note!");
        }

        await note.deleteOne();

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}