const db = require("../config/db");

exports.getAllReflections = async (req, res) => {
    var select = `SELECT * FROM reflections`

    db.query(select)
    .then(reflections => {
        res.status(200).json({
            status: "SUCCESS",
            message: "All Reflections",
            data: reflections.rows
        })
    })
    .catch((e) => {
        console.log(e);
        res.status(503).json({
            status: "FAIL",
            message: "INTERNAL SERVER ERROR"
        })
    })
}

exports.postReflections = async (req, res) => {
    const owner_id = req.id
    const body = req.body
    const success = body.success;
    const low_point = body.low_point;
    const take_away = body.take_away;
    // const owner_id = body.owner_id

    const create = `INSERT into reflections (success, low_point, take_away, owner_id) 
                    VALUES ('${success}', '${low_point}', '${take_away}', '${owner_id}')`
    db.query(create)
    .then( reflections => {
        console.log(owner_id)
        res.status(200).json({
            status: "SUCCESS",
            message: "Reflection Successfully Created",
            data: reflections.rows
        })
    })
    .catch(e => {
        console.log(e);
        res.status(503).json({
            status: "FAIL",
            message: "INTERNAL SERVER ERROR"
        })
    })
}

exports.getReflections = async (req, res) => {
    const owner_id = req.id
    // SELECT * FROM Customers
    // ORDER BY Country;
    var read = `SELECT * FROM reflections WHERE owner_id = ${owner_id}`
//     select *,
//     (select Baz 
//      from table2 
//      where Foo = t1.Foo and 
//            Qux = 'A' 
//      order by Baz -- Use DESC if necessary 
//      LIMIT 1) as value1
// from table1 t1;

    db.query(read)
    .then(users => {
        console.log(owner_id);
        res.status(200).json({
            status: "SUCCESS",
            data: users.rows
        })
    })
    .catch(e => {
        console.log(e);
        res.status(503).json({
            status: "FAILED",
            message: "gagal memuat user"
        })
    })
}

exports.updateReflections = async (req, res) => {
    const owner_id = req.id
    const id = req.params.id
    const body = req.body
    const success = body.success;
    const low_point = body.low_point;
    const take_away = body.take_away;

    const update =
        "UPDATE reflections SET success = $1, low_point = $2, take_away = $3 WHERE id = $4";
    db.query(update, [success, low_point, take_away, id])
        .then((reflections) => {
            res.status(200).json({
                message: "UPDATE SUCCES",
                reflections: reflections,
            });
        
        // if (results) {
        //     const queryUpdate = `UPDATE reflections SET success = ${success}, low_point = ${low_point}, take_away = ${take_away} WHERE id = ${id};`
        //     db.query(queryUpdate)
        //     .then(update => {
        //         res.status(200).json({
        //             status: "SUCCESS",
        //             data: update
        //         })
        //     })
        //     .catch(e => {
        //         console.log(e);
        //         res.status(400).json({
        //             status: "FAIL"
        //         })
        //     })
        // }
        // else{
        //     res.status(503).json({
        //         status: "tidak menemukan id"
        //     })
        // }
    })
    .catch(e => {
        console.log(e);
        res.status(503).json({
            status: "FAILED",
            message: "gagal memuat user"
        })
    })
}

exports.deleteReflections = async (req, res) => {
    const owner_id = req.id

    

}
