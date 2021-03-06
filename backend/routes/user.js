const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.get('/api/users', userCtrl.getUsers);

router.post('/api/signup', userCtrl.createUser);

router.post('/api/login', userCtrl.login);

module.exports = router;
