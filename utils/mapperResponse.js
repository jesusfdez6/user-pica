exports.success = (data = {}) => {

    return {
        code: 200,
        msg: "SUCCESS",
        data: data || {}
    }


}

exports.created = (data = {}) => {

    return {
        code: 201,
        msg: "CREATED",
        data: data || {}
    }


}

exports.badRequest = (errors = {}) => {

    return {
        code: 400,
        msg: "BAD REQUEST",
        errors: errors || {}
    }
}

exports.tecnicalError = (data = {}) => {

    return {
        code: 500,
        msg: "TECNICAL ERROR",
        data: data || {}
    }



}

