import { Note } from "../models/note";


async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMsg = errorBody.error;
        throw Error(errorMsg);
    }

}

export async function fecthNotes(): Promise<Note[]> {
    const response = await fetchData("/api/notes", { method: "GET" });
    return response.json();
}

export interface NoteInput {
    title: string,
    text?: string,
}

export async function createNote(note: NoteInput): Promise<Note> {
    const response = await fetchData("/api/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note)
    })
    return response.json();
}

export async function deleteNote(noteId: string) {
    await fetchData("/api/notes/" + noteId, { method: "DELETE" })
}

export async function updateNote(note: NoteInput, noteId: string): Promise<Note> {
    const response = await fetchData("/api/notes/" + noteId, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note)
    })
    return response.json();

}



/*fetchData("/api/users/signup", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        username: "osama",
        email: "gmail",
        password: "123456"
    })

})


const writingpass = async () => {
    const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: "opppppsma",
            email: "gmagkkkkkkil",
            password: "6hhhhhh65"



        })
    })
    if (response.ok) {



        console.log(response);
    } else {
        const d = await response.json();
        throw Error(d.error)


    }


}
writingpass();

*/