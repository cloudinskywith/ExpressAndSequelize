var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
    models.Task.findAll({attributes:['id','title','done']}).then(tasks=>{
        res.json({tasks:tasks});
    });
});

module.exports = router;
