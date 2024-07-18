class AppError extends Error {
    constructor(message,statusCode) {
        this.statusCode = statusCode;
    }
}