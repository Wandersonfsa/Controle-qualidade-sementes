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
    db.close();
    response.send(users)
});

app.post('api/users', async (request, response) => {
    const { name, last_name, key, mail} = request.body;
    const db = await openDatabase();
    const data = await db.run(
        `INSERT INTO users (name, last_name, key, mail)
        VALUES (?, ? ,?, ?)`, [name, last_name, key, mail]

    );
    db.close();
    response.send({
        id: data.lastID,
        name,
        last_name,
        key,
        mail
    });

});

app.put('api/users/:id', async (request, response) => {
    const { name, last_name, key, mail} = request.body;
    const { id } = request.params;
    
    const db = await openDatabase();

    const users = await db.get(
        `SELECT * FROM users WHERE id = ?`,
        [id]);
    db.close();
    response.send(users);


});

app.delete('api/users/:id', (request, response) => {

});

