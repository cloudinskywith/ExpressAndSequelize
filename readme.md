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

### 使用sequelize
sequelize init 

