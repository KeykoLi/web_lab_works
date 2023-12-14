const db = require('../db');

class ComplexController {
    async create(req, res) {
        const { name, capacity, attendance, cost } = req.body;

        try {
            const result = await db.query('INSERT INTO complexes (name, capacity, attendance, cost) VALUES (?, ?, ?, ?)', [name, capacity, attendance, cost]);

            const insertedId = result[0].insertId;
            const newComplex = await db.query('SELECT * FROM complexes WHERE id = ?', [insertedId]);
            res.json(newComplex[0]);
        } catch (error) {
            console.error('Error creating complex:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getAll(req, res) {
        try {
            const complexes = await db.query('SELECT * FROM complexes');
            res.json(complexes[0]);
        } catch (error) {
            console.error('Error fetching complexes:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getOne(req, res) {
        const id = req.params.id;

        try {
            const results = await db.query('SELECT * FROM complexes WHERE id = ?', [id]);

            // Перевірка наявності результатів запиту
            if (results[0].length > 0) {
                const complex = results[0][0];
                res.json(complex);
            } else {
                res.status(404).json({ error: 'Complex not found' });
            }
        } catch (error) {
            console.error('Error fetching complex:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }


    async update(req, res) {
        const { id } = req.params; // Отримання id з URL
        const { name, capacity, cost, attendance } = req.body;
    
        try {
            const updateResult = await db.query('UPDATE complexes SET name = ?, capacity = ?, cost = ?, attendance = ? WHERE id = ?', [name, capacity, attendance, cost, id]);
    
            const selectResult = await db.query('SELECT * FROM complexes WHERE id = ?', [id]);
    
            if (selectResult[0].length > 0) {
                const updatedComplex = selectResult[0][0];
                res.json(updatedComplex);
            } else {
                res.status(404).json({ error: 'Complex not found' });
            }
        } catch (error) {
            console.error('Error updating complex:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
    
    async delete(req, res) {
        const id = req.params.id;

        try {
            const complex = await db.query('DELETE FROM complexes WHERE id = ?', [id]);
            res.json(complex[0][0]);
        } catch (error) {
            console.error('Error deleting complex:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}

module.exports = new ComplexController();
