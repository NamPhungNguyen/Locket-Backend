const express = require('express');
const userController = require('../controllers/user-controller');

const router = express.Router({ strict: true });

router.route('/user/:userId')
    .get(userController.getUserById);

router.route('/user')
    .post(userController.createUser);


module.exports = router;