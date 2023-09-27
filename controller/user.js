const { sendRegisterLogs } = require('../loggers/cloudwath');
const services = require('../services/user');
const ValidatorJsonSchemaCreateUser = require('../utils/jsonschema-create-user');
const ValidatorJsonSchemaHeaders = require('../utils/jsonschema-headers');

const { success, tecnicalError, created, badRequest } = require('../utils/mapperResponse');

const createUser = async (req, res) => {

    try {

        sendRegisterLogs("CreateUser call Body:");
        sendRegisterLogs(JSON.stringify(req.body));



        const statusValidatorDataEvent = ValidatorJsonSchemaCreateUser.ValidateRequest(req);

        if (statusValidatorDataEvent.status === 1) {

            const response = badRequest(statusValidatorDataEvent.message);
            sendRegisterLogs("CreateUser Errors: ", "ERROR");
            sendRegisterLogs(JSON.stringify(response), "ERROR");
            return res.status(response.code).json(response);
        }

        const data = req.body;
        await services.createUser(data);
        const response = created({ msg: "Usuario creado con exito" })
        sendRegisterLogs("CreateUser response: ");
        sendRegisterLogs(JSON.stringify(response));
        return res.status(response.code).json(response);

    } catch (error) {

        console.log(error);
        sendRegisterLogs("CreateUser Errors: ", "ERROR");
        sendRegisterLogs(JSON.stringify(error), "ERROR");
        const response = tecnicalError();
        sendRegisterLogs("CreateUser response: ", "ERROR");
        sendRegisterLogs(JSON.stringify(response), "ERROR");
        return res.status(response.code).json(response);
    }
}

const getUsers = async (req, res) => {

    try {

        sendRegisterLogs("getUsers call");

        const statusValidatorDataEvent = ValidatorJsonSchemaHeaders.ValidateRequest(req);

        if (statusValidatorDataEvent.status === 1) {

            const response = badRequest(statusValidatorDataEvent.message);
            sendRegisterLogs("CreateUser Errors: ", "ERROR");
            sendRegisterLogs(JSON.stringify(response), "ERROR");
            return res.status(response.code).json(response);
        }

        const users = await services.getUsers();
        const response = success(users);
        return res.status(response.code).json(response);

    } catch (error) {

        console.log(error);
        sendRegisterLogs("CreateUser Errors: ", "ERROR");
        sendRegisterLogs(JSON.stringify(error), "ERROR");
        const response = tecnicalError();
        sendRegisterLogs("CreateUser response: ", "ERROR");
        sendRegisterLogs(JSON.stringify(response), "ERROR");
        return res.status(response.code).json(response);

    }


}

const getUsersById = async (req, res) => {

    try {
        const id = req.params.id;

        sendRegisterLogs("getUsersById call id: ");

        const statusValidatorDataEvent = ValidatorJsonSchemaHeaders.ValidateRequest(req);

        if (statusValidatorDataEvent.status === 1) {

            const response = badRequest(statusValidatorDataEvent.message);
            sendRegisterLogs("CreateUser Errors: ", "ERROR");
            sendRegisterLogs(JSON.stringify(response), "ERROR");
            return res.status(response.code).json(response);
        }

        const users = await services.getUsersById(id);
        const response = success(users);
        sendRegisterLogs("CreateUser response: ");
        sendRegisterLogs(JSON.stringify(response));
        return res.status(response.code).json(response);


    } catch (error) {

        console.log(error);
        sendRegisterLogs("CreateUser Errors: ", "ERROR");
        sendRegisterLogs(JSON.stringify(error), "ERROR");
        const response = tecnicalError();
        sendRegisterLogs("CreateUser response: ", "ERROR");
        sendRegisterLogs(JSON.stringify(response), "ERROR");
        return res.status(response.code).json(response);

    }


}


module.exports = {
    getUsers,
    getUsersById,
    createUser,
}