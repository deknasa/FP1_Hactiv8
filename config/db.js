const Pool = require("pg").Pool;
const config = require("./config")[process.env.NODE_ENV];


// const pool = new Pool({
//     user: "postgres",
//     host: "localhost",
//     database: "ReflectionAPI",
//     password: "bolaliloq",
//     port: 5432,
// });


const pool = new Pool(config);
console.log(config);
module.exports = pool;