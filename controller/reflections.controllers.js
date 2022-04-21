const db = require("../config/db");

exports.postReflections = async (req, res) => {
    const owner_id = req.id
    const body = req.body
    const success = body.success;
    const low_point = body.low_point;
    const take_away = body.take_away;

    const create = `INSERT into reflections (success, low_point, take_away, owner_id) 
                    VALUES ('${success}', '${low_point}', '${take_away}', '${owner_id}') returning *`
    db.query(create)
    .then((reflections) => {
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
    const read = `SELECT * FROM reflections WHERE owner_id = ${owner_id}`

    console.log(owner_id);
    await db.query(read)
    .then(reflections => {
        if (!reflections.rows.length) {
            res.status(200).json({
                message: `User with id ${owner_id} have not reflections`,
            });
        }
        res.status(200).json({
            status: "SUCCESS",
            message: `All Reflections`,
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

exports.updateReflections = async (req, res) => {
    const id = req.params.id
    const body = req.body
    const success = body.success;
    const low_point = body.low_point;
    const take_away = body.take_away;

    const update ="UPDATE reflections SET success = $1, low_point = $2, take_away = $3 WHERE id = $4 returning *";
    db.query(update, [success, low_point, take_away, id])
    .then((reflections) => {
        res.status(200).json({
            status: "SUCCESS",
            message: "Reflection Successfully Updated",
            reflections: reflections.rows,
        });
    })
    .catch(e => {
        console.log(e);
        res.status(503).json({
            status: "FAIL",
            message: "gagal memuat user"
        })
    })
}

exports.deleteReflections = async (req, res) => {
    const id = req.params.id
    const Delete = `DELETE FROM reflections WHERE id = ${id}`

    db.query(Delete)
    .then(() => {
        res.status(200).json({
            status: "SUCCESS",
            message: "Reflection Successfully Deleted"
        })
    })
    .catch(e => {
        console.log(e);
        res.status(503).json({
            status: "FAIL",
            message: "gagal memuat user"
        })
    })
}
