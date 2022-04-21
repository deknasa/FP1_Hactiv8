const db = require("../config/db");
const bcrypt = require('bcrypt');
const generateToken = require("../midleware/authentication").generateToken

exports.register = async (req, res) => {
    const body = req.body;
    const email = body.email;
    const password = body.password;
    
    if (email.length == 0 || password.length == 0) {
        res.status(402).json({
            message: "email or password is required",
        });
    } else if (!email.trim().length || !password.trim().length) {
        res.status(402).json({
            message: "email or password incorrect",
        });
    } else {
        const readEmail = `SELECT * FROM users WHERE email = '${email}'`
        await db.query(readEmail)
        .then(user => {
            if (user.rows.length){
                console.log('aa');
                return res.status(400).json({
                    message: "Email already Exist",
                })
            }
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);

            var createUser = `INSERT into users (email, password) VALUES ('${email}', '${hash}')`
            db.query(createUser, (err, result) => {
                if (err) {
                    res.status(401).json(err);
                }
                const token = generateToken({
                    email: email,
                });
                res.status(200).json({
                    message: "registration succes",
                    email: email,
                    token: token,
                });
            }) 
        })
        .catch((e) => {
            console.log(e);
            res.status(503).send({
                status: "FAIL",
                message: "INTERNAL SERVER ERROR"
            })
        })
    }
}

exports.login = async (req, res) => {
    const body = req.body;
    const email = body.email;
    const password = body.password;

    if (email.length == 0 || password.length == 0) {
        res.status(402).json({
            message: "email or password is required",
        });
    } else if (!email.trim().length || !password.trim().length) {
        res.status(402).json({
            message: "email or password incorrect",
        });
    } else {
        const checkEmail = `SELECT * FROM users WHERE email = '${email}'`
        await db.query(checkEmail, (err, users) => {
            if(!users.rows.length) {
                res.status(400).json({
                    message: "Email Not Found please Sign UP",
                });
            }
            console.log(users.id);
            let userPassword, user_id, user_email;
            users.rows.forEach((userr) => {
                userPassword = userr.password;
                user_id = userr.id;
                user_email = userr.email;
            });
            console.log(user_id);
            const isValid = bcrypt.compareSync(password, userPassword)
            if (!isValid) {
                return res.status(403).send({
                    message: "email and password not match",
                });
            }
            const token = generateToken({
                id: user_id,
                email: user_email
            })
            res.status(200).send({
                status: "SUKSES",
                token: token,
            });
        })
    }
}
