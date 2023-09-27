const Validator = require("jsonschema").Validator;

exports.ValidateRequest = data => {

    const validator = new Validator();

    validator.addSchema(getSchemaHeader(), "/headers");
    const resultValidate = validator.validate(
        {
            headers: data.headers,
        },
        userSchema()
    );
    if (resultValidate.errors.length > 0) {

        const arrayErrors = [];
        for (const i of resultValidate.errors) {
            arrayErrors.push(messageError(i));
        }
        return { status: 1, message: arrayErrors };

    } else {
        return { status: 0, desc: "" };
    }
};

const messageError = (i) => {
    typeError = '';
    switch (i.name) {
        case "required":
            typeError = `${i.argument} es un campo requerido`
            break;
        case "const":
            typeError = `Solo acepta ${i.argument} en el campo ${i.path[1]} que se encuentra en el ${i.path[0]} `
            break;
        default:
            break;
    }

    return typeError;


}

const getSchemaHeader = () => {
    return {
        id: "/headers",
        type: "object",
        properties: {
            "content-type": {
                type: "string",
                const: "application/json"
            },
            "accept": {
                type: "string",
                enum: ["*/*", "application/json"]
            },

        },
        required: [
            "content-type",
            "accept"
        ]
    };
};




const userSchema = () => {
    return {
        id: "/user",
        type: "object",
        properties: {
            headers: { $ref: "/headers" }
        },
        required: ["headers"]
    };
};










