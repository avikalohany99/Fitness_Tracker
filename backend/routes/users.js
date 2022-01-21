const router = require('express').Router();
let User = require('../models/user.model'); //mongoose router

router.route('/').get((req, res) => { //first route handling incoming http request
    User.find() //gets all the list of users from mongodb in json format
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => { //handles post request
    const username = req.body.username;
    
    const newUser = new User({username});

    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;