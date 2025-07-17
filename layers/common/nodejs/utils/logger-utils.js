const util = require('util');

/**
 * Replace params in message
 * @param {string} message
 * @param {Record<string, any>} params
 */
const replaceParams = (message, params) => {
    const regex = new RegExp('(' + Object.keys(params).join('|') + ')', 'g');
    return message.replace(regex, (key) => params[key].toString());
};

class Logger {
    static info(message, ...optionalParams) {
        console.log(message, ...optionalParams);
    }

    static error(message, ...optionalParams) {
        console.error(message, ...optionalParams);
    }

    static warn(message, ...optionalParams) {
        console.warn(message, ...optionalParams);
    }

    static debug(message, ...optionalParams) {
        console.debug(message, ...optionalParams);
    }

    static inspect(data, depth = null) {
        return util.inspect(data, { showHidden: false, depth: depth });
    }

    static logInfoMessage(name, error, data) {
        let messages = '{name} error: {error}.';
        const params = {
            '{name}': name,
            '{error}': this.inspect(error),
        };

        if (data) {
            messages += '\nData: {data}';
            params['{data}'] = this.inspect(data);
        }

        const infoMessage = replaceParams(messages, params);
        this.info(infoMessage);
    }

    static logErrorMessage(name, error, dataError) {
        let messages = 'Error occurred while executing: {name}.\nError: {error}.';
        const params = {
            '{name}': name,
            '{error}': this.inspect(error),
        };

        if (dataError) {
            messages += '\nData: {data_error}';
            params['{data_error}'] = this.inspect(dataError);
        }

        const errMessage = replaceParams(messages, params);
        this.error(errMessage);
    }

    static logWarningMessage(warnType, dataError) {
        let messages = `${warnType}{data_error}`;
        const params = {
            '{data_error}': this.inspect(dataError),
        };

        const errMessage = replaceParams(messages, params);
        this.warn(errMessage);
    }
}

module.exports = Logger;
