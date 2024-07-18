class AppError extends Error {
    constructor(message,statusCode) {
        super(mes)
        this.statusCode = statusCode;
    }
}