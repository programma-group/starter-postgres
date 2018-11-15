const express = require('express');
const userController = require('../controllers/user');
const { wrapperAsync } = require('../handlers/error');

const router = express.Router();

router.get('/', wrapperAsync(userController.getUsers));
router.post('/', wrapperAsync(userController.postUser));

module.exports = router;
