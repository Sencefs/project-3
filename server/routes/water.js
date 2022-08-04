const router = require('express').Router();
let water = require('../models/water.model');

router.route('/').get((req, res) => {
    water.find()
        .then(waters => res.json(waters))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const amount = req.body.amount;
    const hour = Date.parse(req.body.hour);
    const date = Date.parse(req.body.date);

    const newwater = new water({
        amount,
        hour,
        date
    });

    newwater.save()
        .then(() => res.json('water added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})



router.route('/:id').get((req, res) => {
    water.findById(req.params.id)
        .then(water => res.json(water))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
    water.findByIdAndDelete(req.params.id)
        .then(() => res.json('water deleted.'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
    water.findById(req.params.id)
        .then(water => {
            water.amount = req.body.description;
            water.hour = Date.parse(req.body.calories);
            water.date = Date.parse(req.body.date);

            water.save()
                .then(() => res.json('water updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))

})

module.exports = router;