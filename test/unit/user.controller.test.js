const db = require("../../config/db")
const userController = require("../../controller/user.controller")
const httpMocks = require("node-mocks-http")
const bcrypt = require("bcrypt")

jest.mock('../../config/db')

let req, res, next;

beforeEach(() => {
    req = httpMocks.createRequest()
    res = httpMocks.createResponse()
    bcrypt.hashSync = jest.fn()
})

// describe('UserController.register', () => {
//     it('should return 200', async () => {
//         db.query.mockResolvedValue(null);
//         db.query.mockResolvedValue({
//             name: "hello"
//         });
//         await userController.register(req, res)
//         expect(res.statusCode).toEqual(200)
//         // req.send('data sent in request')
//     })
// })

describe('UserController.login', () => {
    it('should return 200', async () => {
        bcrypt.compareSync = jest.fn().mockImplementation(() => true)
        db.query.mockResolvedValue({
            name: "hello"
        });
        await userController.login(req, res)
        expect(res.statusCode).toBe(200)
    })
    it('should return 400', async () => {
        db.query.mockResolvedValue(null)
        await userController.login(req, res)
        expect(res.statusCode).toBe(400)
    })
    it('should return 403', async () => {
        bcrypt.compareSync = jest.fn().mockImplementation(() => false)
        db.query.mockResolvedValue({
            name: "hello"
        })
        await userController.login(req, res)
        expect(res.statusCode).toBe(403)
    })
})
