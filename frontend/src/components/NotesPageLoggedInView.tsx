import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Note as NoteModel } from '../models/note';
import * as NotesApi from '../network/note_api';
import AddEditNoteDialog from "./AddEditNoteDialog";
import NoteComponent from "./NoteComponent";
import styles from '../styles/NotesPage.module.css';
import stylesUtils from '../styles/Utils.module.css';

const NotesPageLoggedInView = () => {

    const [notes, setNotes] = useState<NoteModel[]>([]);
    const [notesLoading, setNotesLoading] = useState(true);
    const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

    const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState<NoteModel | null>(null);



    useEffect(() => {
        async function loadNotes() {
            try {
                setNotesLoading(true);
                setShowNotesLoadingError(false);
                const notes = await NotesApi.fecthNotes();
                setNotes(notes)
                console.log(notes);

            } catch (error) {
                console.error(error);
                setShowNotesLoadingError(true);
            } finally {
                setNotesLoading(false);
            }
        }
        loadNotes();
    }, []);

    async function deleteNote(note: NoteModel) {
        try {
            await NotesApi.deleteNote(note._id);
            setNotes(notes.filter(existingNote => existingNote._id !== note._id))
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    const notesGrid =
        <Row xs={1} md={2} xl={3} className={`g-4 ${styles.notesGrid}`}>
            {notes.map(noteElement => (
                <Col key={noteElement._id}>
                    <NoteComponent
                        note={noteElement}
                        onDeleteNoteClicked={deleteNote}
                        onNoteClicked={setNoteToEdit}
                        className={styles.note} />
                </Col>
            ))}
        </Row>

    return (
        <>
            <Button onClick={() => setShowAddNoteDialog(true)}
                className={`rounded-3 mb-4 ${stylesUtils.BlockCenter} ${stylesUtils.flexCenter}`}>
                <FaPlus />
                New Note
            </Button>

            {notesLoading && <Spinner animation='border' variant='primary' />}
            {showNotesLoadingError && <p>Something went wrong. Please refresh the page</p>}
            {!notesLoading && !showNotesLoadingError &&
                <>
                    {notes.length > 0
                        ? notesGrid
                        : <p>You don't have any notes yet.</p>
                    }
                </>
            }

            {showAddNoteDialog &&
                <AddEditNoteDialog
                    onDismiss={() => setShowAddNoteDialog(false)}
                    onNoteSaved={(newNote) => {
                        setNotes([...notes, newNote]);
                        setShowAddNoteDialog(false);
                    }}
                />
            }
            {noteToEdit &&
                <AddEditNoteDialog
                    noteToEdit={noteToEdit}
                    onDismiss={() => setNoteToEdit(null)}
                    onNoteSaved={(noteToEdit) => {
                        setNotes(notes.map((existingNote) => existingNote._id === noteToEdit._id ? noteToEdit : existingNote));
                        setNoteToEdit(null);
                    }}
                />
            }
        </>
    );
}

export default NotesPageLoggedInView;