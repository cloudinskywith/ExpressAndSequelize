var express = require('express');
var router = express.Router();

/**
 * @apiGroup Status
 * @apiSuccess {String} status API Status' message
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {"Status":"NTask API"}
 */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
    res.json({status:"NTask API"});
});

module.exports = router;
