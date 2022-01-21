const router = require('express').Router();
let Exercise = require('../models/exercise.model'); //mongoose router

router.route('/').get((req, res) => { //first route handling incoming http request
    Exercise.find() //gets all the list of users from mongodb in json format
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => { //handles post request
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration); //Number converts duration to a number
    const date = Date.parse(req.body.date); // Date.parse converts date to a date datatype

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });

    newExercise.save()
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res) => { // Get request for a particualr exercise
    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => { //Delete request for a particular exercise
    Exercise.findByIdAndDelete(req.params.id)
    .then(exercise => res.json('Exercise Deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => { //Update request for a particular exercise
    Exercise.findById(req.params.id)
    .then(exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);

        exercise.save()
        .then(() => res.json('Exercise Updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;