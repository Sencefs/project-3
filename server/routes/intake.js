const router = require('express').Router();
let intake = require('../models/intake.model');

router.route('/').get((req, res) => {
    intake.find({})
        .then(intakes => res.json(intakes))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const description = req.body.description;
    const calories = Number(req.body.calories);
    const date = Date.parse(req.body.date);

    const newintake = new intake({
        description,
        calories,
        date
    });

    newintake.save()
        .then(() => res.json('intake added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})



router.route('/:id').get((req, res) => {
    intake.findById(req.params.id)
        .then(intake => res.json(intake))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
    intake.findByIdAndDelete(req.params.id)
        .then(() => res.json('intake deleted.'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
    intake.findById(req.params.id)
        .then(intake => {
            intake.description = req.body.description;
            intake.calories = Number(req.body.calories);
            intake.date = Date.parse(req.body.date);

            intake.save()
                .then(() => res.json('intake updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))

})

module.exports = router;