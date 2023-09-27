const services = require('../services/user');
const ValidatorJsonSchema = require('../utils/jsonschema');
const { success, tecnicalError, created, badRequest } = require('../utils/mapperResponse');

const createUser = async (req, res) => {

    try {

        const statusValidatorDataEvent = ValidatorJsonSchema.ValidateRequest(req);

        if (statusValidatorDataEvent.status === 1) {

            return badRequest(res, statusValidatorDataEvent.message)
        }

        const data = req.body;
        await services.createUser(data);
        return created(res, { msg: "Usuario creado con exito" })

    } catch (error) {

        return tecnicalError(res);
    }
}

const getUsers = async (req, res) => {

    try {
        const users = await services.getUsers();
        return success(res, users);
    } catch (error) {
        return tecnicalError(res);

    }


}

const getUsersById = async (req, res) => {

    try {
        const id = req.params.id;
        const users = await services.getUsersById(id);
        return success(res, users);

    } catch (error) {

        return tecnicalError(res);

    }


}


module.exports = {
    getUsers,
    getUsersById,
    createUser,
}