import express from "express";
import { insertProducers, listProducers, removeProducers, updateProducers } from "./controllers/producersController.js";
import { deleteUsers, insertUsers, listUsers, updateUsers } from "./controllers/usersController.js";
import { openDatabase } from "./database.js";
const app = express();

app.use(express.json());


/* Endpoints users */

app.get('/api/users', listUsers);
app.post('/api/users', insertUsers);
app.delete('/api/users/:id', deleteUsers);
app.put('/api/users/:id', updateUsers);

/* EndPoints producers */

app.get('/api/producers', listProducers);
app.post('/api/producers', insertProducers)
app.delete('/api/producers/:id', removeProducers)
app.put('/api/producers/:id', updateProducers)


app.listen(8000, () => {
    console.log("Servidor rodando na porta 8000...")
});
