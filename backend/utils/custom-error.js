
export const errorHandler = (errorCode, errorMsg) => {
    const error = new Error();
    error.statusCode = errorCode
    error.message  = errorMsg;
    return error;
}