"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseResponse = void 0;
class BaseResponse {
    constructor(success, message, data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
    static success(data, message = 'Ok') {
        return new BaseResponse(true, message, data);
    }
    static error(message) {
        return new BaseResponse(false, message, null);
    }
}
exports.BaseResponse = BaseResponse;
//# sourceMappingURL=base-response.js.map