import express from "express";
const app = express();

app.get('/api/request', (request, response) => {
    response.send({
        message: "response"
    })
});

app.listen(8000, () => {
    console.log("Servidor rodando na porta 8000...")
});