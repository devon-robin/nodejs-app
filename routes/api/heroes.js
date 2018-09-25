const _ = require('lodash');
const router = require('express').Router();
const db = require('../../database/database');

router.get('/', (req, res) => {
    db.query('SELECT * FROM hero', (err, results, fields) => {
        if (err) throw err;
        res.json(results);
    });
});

router.post('/', (req, res) => {
    const newHero = _.pick(req.body, ['name']);
    if (newHero.name) {
        db.query(`INSERT INTO hero VALUES (NULL, '${newHero.name}')`, (err, results, fields) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    }
});

router.patch('/:id', (req, res) => {
    const hero_id = req.params.id;
    const updates = _.pick(req.body, ['name']);
    if (updates.name) {
        db.query(`UPDATE hero SET name = '${updates.name}' WHERE hero_id = ${hero_id}`, (err, results, fields) => {
            if (err) throw err;
            res.sendStatus(200);
        });
    }
});

router.delete('/:id', (req, res) => {
    const hero_id = req.params.id;
    db.query(`DELETE FROM hero WHERE hero_id = ${hero_id}`, (err, results, fields) => {
       if (err) throw err;
       res.sendStatus(200); 
    });
});

module.exports = router;