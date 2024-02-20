import { Button, Form, Modal, ModalTitle } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import { useForm } from "react-hook-form";
import { NoteInput, createNote, updateNote } from "../network/note_api";
import TextInputField from "./form/TextInputField";

interface AddEditNoteDialogProps {
    noteToEdit?: NoteModel,
    onDismiss: () => void,
    onNoteSaved: (note: NoteModel) => void,
}

const AddEditNoteDialog = ({ noteToEdit, onDismiss, onNoteSaved }: AddEditNoteDialogProps) => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NoteInput>({
        defaultValues: {
            title: noteToEdit?.title || "",
            text: noteToEdit?.text || ""
        }
    });

    async function onSubmit(input: NoteInput) {
        try {
            let noteResponse: NoteModel;
            if (noteToEdit) {
                noteResponse = await updateNote(input, noteToEdit._id);
            } else {
                noteResponse = await createNote(input);
            }
            onNoteSaved(noteResponse);
        } catch (error) {
            console.error(error);
            alert(error);
        }

    }
    return (
        <Modal show onHide={onDismiss}>

            <Modal.Header closeButton>
                <ModalTitle>
                    {noteToEdit ? "Edit Note" : "Add New Note"}
                </ModalTitle>
            </Modal.Header>

            <Modal.Body>
                <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>

                    <TextInputField
                        name="title"
                        label="Title"
                        register={register}
                        type="text"
                        placeholder="Title"
                        error={errors.title}
                        registerOptions={{ required: "Required", maxLength: 30 }}
                    />

                    <TextInputField
                        name="text"
                        label="Text"
                        register={register}
                        placeholder="Text"
                        as="textarea"
                        rows={5}
                    />

                </Form>
            </Modal.Body>

            <Modal.Footer>
                <Button
                    type="submit"
                    form="addEditNoteForm"
                    disabled={isSubmitting}
                >Save</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddEditNoteDialog;
