import express from "express";
import { openDatabase } from "./database.js";
const app = express();

app.use(express.json());

app.listen(8000, () => {
    console.log("Servidor rodando na porta 8000...")
});

/* Endpoints users */

app.get('/api/users', async (request, response) => {
    
    const db = await openDatabase();
    const users = await db.all(
        `SELECT * FROM users`

    );
    response.send(users)
});

app.post('api/users', (request, response) => {

});

app.put('api/users/:id', (request, response) => {

});

app.delete('api/users/:id', (request, response) => {

});

