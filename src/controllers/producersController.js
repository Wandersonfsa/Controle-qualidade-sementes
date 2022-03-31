import { openDatabase } from "../database.js";

export const listProducers = async (request, response) => {
    
    const db = await openDatabase();
    const producers = await db.all(
        `SELECT * FROM producers` 

    );
    db.close();
    response.send(producers)
};

export const insertProducers = async (request, response) => {
    const { name, cpf, IE} = request.body;
    const db = await openDatabase();
    const producers = await db.run(
        `INSERT INTO producers (name, cpf, IE)
        VALUES (?, ? ,?)`, [name, cpf, IE]
    );
    db.close();
    response.send({
        id: producers.lastID,
        name,
        cpf,
        IE
    });
};

export const removeProducers = async (request, response) => {
    const { name, cpf, IE} = request.body;
    const { id } = request.params;
    const db = await openDatabase();
    const data = await db.run(`
        DELETE FROM producers
        WHERE id = ?
    `, [id]);
    db.close();
    response.send({
        id,
        name,
        message: `Usuario [${id}] removido com sucesso`, 
        cpf,
        IE
    })
};

export const updateProducers = async (request, response) => {
    const { name, cpf, IE} = request.body;
    const { id } = request.params;
    
    const db = await openDatabase();

    const producers = await db.get(`
        SELECT * FROM producers WHERE id = ?
        `,[id]);

    if (producers) {
        const data = await db.run(`
            UPDATE producers 
            SET model = ?, 
            name = ?, 
            cpf = ?, 
            IE = ?,
        WHERE id = ?

        `, [name, cpf, IE, id]);

        db.close();
        response.send({
            id,
            name, 
            cpf,
            IE
        });
        return;
    }
    db.close();
    response.send(producers || {});
};