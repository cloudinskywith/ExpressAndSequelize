var express = require('express');
var router = express.Router();
var models = require('../models');

/**
 * @api {get} /user 返回用户数据
 * @apiGroup User
 * @apiHeader {String} Authorization Token of authenticated user
 * @apiHeaderExample {json} Header
 *    {"Authorization": "JWT xyz.abc.123.hgf"}
 * @apiSuccess {Number} id User id
 * @apiSuccess {String} name User name
 * @apiSuccess {String} email User email
 * @apiSuccessExample {json} Success
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "name": "John Connor",
 *       "email": "john@connor.net"
 *     }
 * @apiErrorExample {json} Find error
 *     HTTP/1.1 412 Precondition Failed
 */

router.get('/', (req, res) => {
    models.User.findAll({}).then(result => res.json({users: result}));
});


/**
 * @api {post} /users 注册新用户
 * @apiGroup User
 * @apiParam {String} name User name
 * @apiParam {String} email User email
 * @apiParam {String} password User password
 * @apiParamExample {json} Input
 *    {
 *      "name": "John Connor",
 *      "email": "john@connor.net",
 *      "password": "123456"
 *    }
 * @apiSuccess {Number} id User id
 * @apiSuccess {String} name User name
 * @apiSuccess {String} email User email
 * @apiSuccess {String} password User encrypted password
 * @apiSuccess {Date} updated_at Update's date
 * @apiSuccess {Date} created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "id": 1,
 *      "name": "John Connor",
 *      "email": "john@connor.net",
 *      "password": "$2a$10$SK1B1",
 *      "updated_at": "2016-02-10T15:20:11.700Z",
 *      "created_at": "2016-02-10T15:29:11.700Z",
 *    }
 * @apiErrorExample {json} Register error
 *    HTTP/1.1 412 Precondition Failed
 */
router.post('/', (req, res) => {
    models.User.create(req.body).then(result => res.json(result)).catch(error => {
        res.status(412).json({
            msg: error.message
        })
    });
});


router.get('/:id', (req, res) => {
    models.User.findOne(req.param.id, {
        attributes: ['id', 'name', 'email']
    }).then(result => res.json(result)).catch(error => {
        res.status(412).json({msg: error.message});
    })
});

router.post('/del/:id', (req, res) => {
    models.User.destroy({where: {id: res.params.id}}).then(result => {
        res.json({
            result: result,
            data: {
                message: "删除成功"
            }
        })
    }).catch(error => {
        res.status(412).json({msg: error.message});
    })
});


module.exports = router;
