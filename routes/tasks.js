var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.json({
        tasks:[
            {title:'by some shoes'},
            {title:'fix notebook'}
        ]
    });
});

module.exports = router;
