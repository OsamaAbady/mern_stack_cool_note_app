import app from './app'
import mongoose from 'mongoose';
import env from './util/validateEnv';

// ouZv1dnew63iSd5t
const port = env.PORT;
/*
main().catch(err => console.error(err))
async function main() {
    await mongoose.connect('mongodb://localhost:5000/test')
}*/

mongoose.connect('mongodb://127.0.0.1:27017/NoteDB')
    .then(() => {
        console.log("mongoose is connected");
        app.listen(port, () => {
            console.log('your first server is running on port: ' + port);
        });

    })
    .catch(console.error)

   

