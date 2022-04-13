// IMPORT MODULE
const db = require("../config/db");
const bcrypt = require('bcrypt');
const generateToken = require("../midleware/authentication").generateToken

exports.getUser = async (req, res) => {
    var Users = `SELECT * FROM users`
    await db.query(Users)
    .then(users => {
        res.status(200).json({
            "data" : users.rows
        })
    })
    .catch(e => {
        console.log(e);
        res.status(500).json({
            message: 'FAILED TO GET USERS'
        })
    })
}

// FUNCTION FOR USER REGISTER
exports.register = async (req, res) => {
    //  create request from body
    const body = req.body;
    const email = body.email;
    const password = body.password;
    
    // check email is registered or not using sql query
    var checkEmail = `SELECT * FROM users WHERE email = '${email}'`
    await db.query(checkEmail)
    .then(user => {
        if (user.rows.length){
            console.log('aa');
            return res.status(400).json({
                message: "Email already Exist",
            })
        }

        // create passwords hashed before saving to database using bcrypt
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        // add user if email is not registered
        var addNewUser = `INSERT into users (email, password) VALUES ('${email}', '${hash}')`
        db.query(addNewUser) 
        .then((user) => {
            console.log('bb');
            // generate jwt token user register successfully.
            const token = generateToken({
                id: user.id,
                email: user.email
            })
            res.status(200).json({
                status: "SUKSES",
                message: `SUCCES ADD USER BY EMAIL ${email}`,
                token: token,
            })
        })
        // CATCH ERROR FUNCTION FOR ADD USER IF EMAIL NOT REGISTERED
        .catch((e) => {
            console.log(e);
            res.status(500).send({
                status: "FAIL",
                message: "FAILED TO ADD USER !!!"
            })
        });
    })
    // CATCH ERROR FUNCTION FOR CHECK EMAIL
    .catch((e) => {
        console.log(e);
        res.status(503).send({
            status: "FAIL",
            message: "INTERNAL SERVER ERROR"
        })
    })
}

// FUNCTION FOR USER LOGIN
exports.login = async (req, res) => {
    // create request from body
    const body = req.body;
    const email = body.email;
    const password = body.password;

    // check email 
    const checkEmail = `SELECT * FROM users WHERE email = '${email}'`
    await db.query(checkEmail, (err, user) => {
        if(!user.rows.length) {
            res.status(400).json({
                message: "Email Not Found please Sign UP",
            });
        }
        // check hash password
        let userPassword;
        user.rows.forEach((userr) => {
            userPassword = userr.password;
        });
        const isValid = bcrypt.compareSync(password, userPassword)
        if (!isValid) {
            return res.status(403).send({
                message: "email and password not match",
            });
        }
        // generate jwt token user login successfully.
        const token = generateToken({
            id: user.id,
            email: user.email
        })
        res.status(200).send({
            status: "SUKSES",
            token: token,
        });
    })
}