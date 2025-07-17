const express = require('express');
const userController = require('../controllers/user-controller');

const router = express.Router({ strict: true });

router.route('/users/:userId')
    .get(userController.getUserById);


module.exports = router;