const express = require('express');
const router = express.Router();
const dashboardCtrl = require('../controllers/dashboard.controller');
const authCtrl = require('../controllers/auth.controller');

router.get('/stats', [authCtrl.verifyToken, authCtrl.isAdmin], dashboardCtrl.getDashboardStats);

module.exports = router;
