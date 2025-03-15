class ErrorHandler extends Error {
    constructor(
        statusCode = 404,
        message = "Something went wrong!",
        stack = "",
        errors = []
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.errors = errors
        this.success = false

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export default ErrorHandler