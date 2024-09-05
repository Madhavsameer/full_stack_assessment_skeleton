const express = require('express');
const { UserController } = require('../../controllers');

const router = express.Router();

router.get('/find-all', UserController.findAllUsers);
router.get('/find-by-home/:id', UserController.findUsersByHome);

module.exports = router;