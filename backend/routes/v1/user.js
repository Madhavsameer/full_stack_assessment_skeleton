const express = require('express');
const { UserController } = require('../../controllers');

const router =  express.Router();

router.get('/', UserController.findAllUsers);

module.exports = router;