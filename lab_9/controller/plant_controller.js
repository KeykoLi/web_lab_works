const db = require('../db');

class PlantController {

    async getAll(req, res) {
        try {
            const complexes = await db.query('SELECT * FROM plants');
            res.json(complexes[0]);
        } catch (error) {
            console.error('Error fetching plants:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getOne(req, res) {
        const id = req.params.id;

        try {
            const results = await db.query('SELECT * FROM plants WHERE id = ?', [id]);

            // Перевірка наявності результатів запиту
            if (results[0].length > 0) {
                const complex = results[0][0];
                res.json(complex);
            } else {
                res.status(404).json({ error: 'Plant not found' });
            }
        } catch (error) {
            console.error('Error fetching complex:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}

module.exports = new PlantController();
