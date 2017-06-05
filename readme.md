npm install sequelize-cli -g 
npm install express-generator -g

express -f 
npm install 

npm install mysql sequelize --save 
npm install ejs --save
npm install babel-cli babel-preset-es2015 --save
npm install consign


### 一个tasks
```
// app.js 
var tasks = require('routes/tasks.js');
app.use('/tasks',tasks);

// routes/tasks.js 

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.json({
        tasks:[
            {title:'by some shoes'},
            {title:'fix notebook'}
        ]
    });
});

module.exports = router;
```

### 使用sequelize和sequelize-cli

sequelize init 
sequelize model:create --name Task --attributes title:string,done:boolean
sequelize model:create --name User --attributes name:string,password:string,email:string

sequelize db:migrate
sequelize db:migrate:undo:all


### tasks的一个案例
```
// models/tasks.js 
'use strict';
module.exports = function (sequelize, DataTypes) {
    var Task = sequelize.define('Task', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            autoIncrement: true
        },
        UserId:{
            type:DataTypes.INTEGER,
            defaultValue:1
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        done: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        classMethods: {
            associate: function (models) {
                Task.belongsTo(models.User);
            }
        }
    });
    return Task;
};

// migrations/create-user.js
'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('Tasks', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            UserId:{
                type:Sequelize.STRING,
                defaultValue:1
            },
            title: {
                type: Sequelize.STRING
            },
            done: {
                type: Sequelize.BOOLEAN
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('Tasks');
    }
};


// routes/tasks.js 
var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
    models.Task.findAll({}).then(tasks=>{
        res.json({tasks:tasks});
    }).catch(error=>{
        res.status(412).json({msg:error.message});
    });
});

router.get('/:id',function (req, res, next) {
    models.Task.findOne({where:req.params}).then(result=>{
        if(result){
            res.json(result);
        }else{
            res.sendStatus(404);
        }
    }).catch(error=>{
        res.status(412).json({msg:error.message});
    })
});


router.post('/',function (req,res,next) {
    models.Task.create(req.body).then(result=>res.json(result)).catch(error=>{
        res.status(412).json({msg:error.message});
    });
});

router.post('/:id',function (req,res,next) {
    models.Task.update(req.body,{where:req.params}).then(result=>res.json(result)).catch(error=>{
        res.status(412).json({msg:error.message});
    });
});

router.post('/del/:id',function (req, res, next) {
    models.Task.destroy({where:req.params}).then(result=>res.json({
        status:204,
        result:result,
        data:{
            result:1,
            message:"删除成功"
        }
    })).catch(error=>{
        res.status(412).json({msg:error.message})
    });
});

module.exports = router;
```

//一次curd完成，good to go.

### User
```
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
```

### 权限验证
npm install --save bcrypt-nodejs passport passport-local cookie-parser body-parser express-session

not that easy,ignore it now.


### document api
npm install apidoc --save-dev
```
  "scripts": {
    "start": "nodemon ./bin/www",
    "apidoc":"apidoc -i routes/ -o public/apidoc"
  },
  "apidoc":{
    "name":"task api - documentation",
    "template":{
      "forceLanguage":"en"
    }
  },

```


### logs






