class APIResponse {
    /**
     * API success or failure status
     * @type {boolean}
     */
    success;

    /**
     * Message describing the result of the API.
     * @type {string}
     */
    message;

    /**
     * Data returned by the API
     * @type {object}
     */
    data;

    /**
     * HTTP status code for the response
     * @type {number}
     */
    statusCode;

    /**
     * @typedef HeaderInfo
     * @property {string=} errorMessageId
     * @property {string=} lastRetrievalTime
     * @property {string=} apiVersion
     */

    /**
     * Header info of response
     * @type {HeaderInfo}
     */
    header;

    /**
     *
     * @param {object} options
     * @param {boolean} options.success - API success or failure status
     * @param {string=} options.message - Message error ID of the API.
     * @param {object=} options.data  - Data returned by the API
     * @param {number} options.statusCode  - Data returned by the API
     * @param {HeaderInfo=} options.header - Header info
     */
    constructor({ success, message, data, statusCode, header }) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.statusCode = statusCode;
        this.header = header;
    }

    /**
     * Converts the API response object to a JSON representation.
     *
     * @returns {Object} JSON representation of the API response.
     */
    toJSON() {
        const properties = {
            success: this.success,
            status_code: this.statusCode,
            message: this.message,
            data: this.data,
        };

        if (this.header && Object.values(this.header).filter(Boolean).length) {
            properties.header = {
                error_msg_id: this.header.errorMessageId,
                last_retrieval_time: this.header.lastRetrievalTime,
                api_version: this.header.apiVersion,
            };
        }

        return Object.fromEntries(Object.entries(properties).filter(([, value]) => value !== null));
    }

    static success(data, lastRetrievalTime) {
        return new APIResponse({
            success: true,
            data,
            statusCode: 200,
            header: {
                lastRetrievalTime,
            },
        });
    }

    static businessError(errorMessageId) {
        return new APIResponse({ success: false, header: { errorMessageId }, statusCode: 200 });
    }

    static accessDenied() {
        return new APIResponse({
            success: false,
            statusCode: 403,
        });
    }

    static badRequest() {
        return new APIResponse({
            success: false,
            statusCode: 400,
        });
    }

    static unauthorized() {
        return new APIResponse({ success: false, statusCode: 401 });
    }

    static internalServer() {
        return new APIResponse({
            success: false,
            statusCode: 500,
        });
    }
}

module.exports = APIResponse;
