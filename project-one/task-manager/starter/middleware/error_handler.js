const {CustomError} = require('../errors/custom_error')

const error_handler = (err, req, res, next) => {
    if(err instanceof CustomError){
        return res.status(err.statusCode).json({msg:err.message})
    }
    return res.status(500).json({msg: "Something went wrong, please try again later"})
}

module.exports = error_handler