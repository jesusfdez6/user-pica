exports.success = (res, data = {}) => {

    const config = {
        code: 200,
        msg: "SUCCESS",
        data: data || {}
    }

    return response(res, config)

}

exports.created = (res, data = {}) => {

    const config = {
        code: 201,
        msg: "CREATED",
        data: data || {}
    }

    return response(res, config)

}

exports.badRequest = (res, errors = {}) => {

    const config = {
        code: 400,
        msg: "BAD REQUEST",
        errors: errors || {}
    }

    return response(res, config)

}

exports.tecnicalError = (res, data = {}) => {

    const config = {
        code: 500,
        msg: "TECNICAL ERROR",
        data: data || {}
    }

    return response(res, config)


}

const response = (res, config) => {

    return res.status(config.code).json(config);
}