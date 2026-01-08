
export class BaseResponse<T> {
    success: boolean;
    message: string;
    data: T | null;

    constructor(success: boolean, message: string, data: T | null) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    static success<T>(data: T, message: string = "Ok") {
        return new BaseResponse<T>(true, message, data);
    }

    static error(message: string) {
        return new BaseResponse<null>(false, message, null);
    }
}
