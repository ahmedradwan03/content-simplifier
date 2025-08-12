class ApiError extends Error {
    public status: string;
    public statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'Fail' : 'Error';
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ApiError;
