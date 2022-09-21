var jwt = require('jsonwebtoken');
var jwtsecret = process.env.JWTSECRETTEACHER
var teacherModel  = require('../../models/index').teacherModel
/**
 * function used for validate token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

let token = ""
function isValidToken(req, res, next) {


    if (req.headers['authorization']) {
        token = req.headers['authorization'];

        // Remove Bearer from string
        token = token.replace(/^Bearer\s+/, "");


        if (token) {
            jwt.verify(token, jwtsecret, { ignoreExpiration: false }, function (err, payload) {

                //console.log(payload, "here")
                if (err) {
                    console.log(err)
                    res.status(403).send({ msg: "forbidden" });
                } else {
                    if (payload.id) {
                        var condition = {
                            _id: payload.id
                        };
                        teacherModel.findOne(condition, function (err, document) {
                            if (err) {
                                res.status(500).send({ msg: "internel server error" });
                            } else {
                                if (document) {
                                    req.teacher = document;
                                    next();
                                } else {
                                    res.status(403).send({ msg: "forbidden" });
                                }
                            }
                        })
                    } else {
                        res.status(403).send({ msg: "forbidden" });
                    }
                }
            });
        } else {
            res.status(403).send({ msg: "forbidden" });
        }
    }
}

module.exports = isValidToken;