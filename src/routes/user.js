const express = require('express');
const userController = require('../controllers/user');
const { catchErrors } = require('../handlers/error');

const router = express.Router();

router.get('/', catchErrors(userController.getUsers));
router.post('/', catchErrors(userController.postUser));

module.exports = router;
