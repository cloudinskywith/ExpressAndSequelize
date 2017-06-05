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
sequelize model:create --name Task --attributes id:integer,title:string,done:boolean

### tasks的一个案例
```
// models/tasks.js 
module.exports = function (sequelize, DataTypes) {
    var Task = sequelize.define('Task', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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


// routes/tasks.js 
var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
    models.Task.findAll({}).then(tasks=>{
        res.json({tasks:tasks});
    });
});

module.exports = router;
```