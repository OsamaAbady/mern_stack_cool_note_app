import express from 'express';
import * as notesController from '../controllers/notesController'

const router = express.Router();

router.get("/", notesController.getNotes);

router.get("/:noteID", notesController.getNoteById)

router.post("/", notesController.createNotes);

router.patch("/:noteID", notesController.updateNotes);

router.delete("/:noteID", notesController.deleteNotes);

export default router;  