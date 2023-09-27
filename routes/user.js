const { Router } = require('express');


const {
    createUser,
    getUsers,
    getUsersById
} = require('../controller/user')

const router = Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUsersById);


module.exports = router;