const router = require('express').Router();
let Exercise = require('../models/Exercise.model');

router.route('/').get((req, res) => {
    Exercise.find()
        .then(Exercises => res.json(Exercises))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        description,
        duration,
        date
    });

    newExercise.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(Exercise => res.json(Exercise))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(Exercise => {
            Exercise.description = req.body.description;
            Exercise.duration = Number(req.body.duration);
            Exercise.date = Date.parse(req.body.date);

            Exercise.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))

})

module.exports = router;