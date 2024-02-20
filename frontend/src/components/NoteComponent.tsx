import styles from '../styles/Note.module.css';
import stylesUtils from '../styles/Utils.module.css';
import { Button, Card, Modal } from 'react-bootstrap';
import { Note as NoteModel } from '../models/note';
import { formateDate } from '../utils/formateDate';
import { MdDelete } from 'react-icons/md';
import { useState } from 'react';
//import { FaEdit } from "react-icons/fa";


interface NoteProps {
    note: NoteModel,
    onDeleteNoteClicked: (note: NoteModel) => void,
    onNoteClicked: (note: NoteModel) => void,
    className?: string,
}

const Note = ({ note, onDeleteNoteClicked, onNoteClicked, className }: NoteProps) => {
    const {
        title,
        text,
        createdAt,
        updatedAt,

    } = note;

    let createdUpdatedText: string;
    if (updatedAt > createdAt) {
        createdUpdatedText = "Updated: " + formateDate(updatedAt);
    } else {
        createdUpdatedText = "Created: " + formateDate(createdAt);
    }

    const [show, setShow] = useState(false);
    return <>
        {show &&
            <Modal show onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this note?</Modal.Body>
                <Modal.Footer >
                    <Button variant="danger" onClick={() => {
                        onDeleteNoteClicked(note);
                        setShow(false)
                    }}>Delete</Button>
                    <Button variant="secondary" onClick={() => setShow(false)}>Cancel</Button>
                </Modal.Footer>
            </Modal>}
        <Card className={`${styles.noteCard} ${className}`}
            onClick={() => onNoteClicked(note)}
        >
            <Card.Body className={styles.cardBody}>

                <Card.Title className={stylesUtils.flexCenter}>
                    {title}
                    <MdDelete
                        className='text-muted ms-auto'
                        onClick={(e) => {
                            setShow(true)
                            e.stopPropagation();
                        }}
                    />


                </Card.Title>

                <Card.Text className={styles.cardText}>
                    {text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className='text-muted'>
                {createdUpdatedText}
            </Card.Footer>
        </Card>
    </>
}

export default Note;