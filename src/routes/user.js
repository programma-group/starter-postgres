const express = require('express');
const userController = require('../controllers/user');
const { catchErrors } = require('../handlers/error');

const router = express.Router();

router.get('/profile', catchErrors(userController.getProfile));

module.exports = router;
