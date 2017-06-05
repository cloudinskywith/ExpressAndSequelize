var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/',(req,res)=>{
  models.User.findAll({}).then(result=>res.json({users:result}));
});

router.post('/',(req,res)=>{
    models.User.create(req.body).then(result=>res.json(result)).catch(error=>{
        res.status(412).json({
            msg:error.message
        })
    });
});


router.get('/:id',(req,res)=>{
  models.User.findOne(req.param.id,{
    attributes:['id','name','email']
  }).then(result=>res.json(result)).catch(error=>{
    res.status(412).json({msg:error.message});
  })
});

router.post('/del/:id',(req,res)=>{
  models.User.destroy({where:{id:res.params.id}}).then(result=>{
    res.json({
        result:result,
        data:{
          message:"删除成功"
        }
    })
  }).catch(error=>{
    res.status(412).json({msg:error.message});
  })
});





module.exports = router;
