import express from "express";
const app = express();

const customers = [
    {id: 1, name: 'Marcos Vinicius'},
    {id: 2, name: 'Florinda', idade: 30}
];

app.use(express.json()); //antes de criar qualquer endpoint é preciso chamar essa função

app.get('/api/request', (request, response) => {
    response.send({
        message: "response"
    })
});

app.get('/api/customers', (request, response) => {
    response.send({customers})
});

app.post('/api/customers', (request, response) => {
    const { body } = request;
    customers.push(body);
    response.send({customers})
});

app.put('/api/customers/:id', (request, response) => {
    const { id } = request.params; //pega o id da url
    const { body } = request; // pega o corpo da requisição ou json

    const index = customers.findIndex(customer => customer.id == id); //a função retorna a posição do array
    customers[index] = {id, ...body};

    response.send(customers);
});

app.delete('/api/customers/:id', (request, response) => {
    const { id } = request.params; //pega o id da url
    const newArray = customers.filter(customer => customer.id != id); //filtra todos os ids e pega o que foi solicitado
    response.send(newArray);
});

app.listen(8000, () => {
    console.log("Servidor rodando na porta 8000...")
});