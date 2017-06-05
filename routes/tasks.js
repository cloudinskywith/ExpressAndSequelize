var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
    models.Task.findAll({attributes:['id','title','done']}).then(tasks=>{
        res.json({tasks:tasks});
    }).catch(error=>{
        res.status(412).json({msg:error.message});
    });
});

router.post('/',function (req,res,next) {
    models.Task.create(req.body).then(result=>res.json(result)).catch(error=>{
        res.status(412).json({msg:error.message});
    });
});

router.get('/:id',function (req, res, next) {
    models.Task.findOne({where:req.params,attributes:['id']}).then(result=>{
        if(result){
            res.json(result);
        }else{
            res.sendStatus(404);
        }
    }).catch(error=>{
        res.status(412).json({msg:error.message});
    })
});


module.exports = router;
