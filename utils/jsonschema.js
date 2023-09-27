const Validator = require("jsonschema").Validator;

exports.ValidateRequest = data => {

    const validator = new Validator();

    validator.addSchema(getSchemaHeader(), "/headers");
    validator.addSchema(getSchemaBody(), "/body");

    const resultValidate = validator.validate(
        {
            headers: data.headers,
            body: data.body
        },
        userSchema()
    );
    console.log(resultValidate);
    if (resultValidate.errors.length > 0) {

        const arrayErrors = [];
        for (const i of resultValidate.errors) {
            arrayErrors.push(i.message);
        }
        return { status: 1, message: arrayErrors };

    } else {
        return { status: 0, desc: "" };
    }
};



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
            headers: { $ref: "/headers" },
            body: { $ref: "/body" }
        },
        required: ["headers", "body"]
    };
};

const getSchemaBody = () => {
    return {
        id: "/body",
        type: "object",
        properties: {
            name: { type: 'string', maxLengh: 255 },
            email: { type: 'string', format: 'email', maxLengh: 255 },
            lastname: { type: 'string', maxLengh: 255 }
        },
        required: ['name', 'email', 'lastname'],
    };
};







