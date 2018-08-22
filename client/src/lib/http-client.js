import axios from 'axios';

import { getTimestampFromDateInstance } from 'lib/date-utils';

import { METHODS } from 'routes';

export const ROUTE_SIGN_IN = '/auth';
export const ROUTE_SIGN_UP = '/subscribe';
export const ROUTE_LOGOUT = '/logout';

export class NetworkError extends Error {}

export class RequestError extends Error {
    constructor(message, statusCode, data) {
        super(message);

        this.statusCode = statusCode;
        this.data = data;
    }
}

export class AuthenticationError extends RequestError {}
export class PermissionError extends RequestError {}
export class ValidationError extends RequestError {}

const GET = 'get';
const POST = 'post';
const PUT = 'put';
const PATCH = 'patch';
const DELETE = 'delete';

export const ROUTE_WHOAMI = 'whoami';

export class HttpClient {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;

        this.client = axios.create({
            baseURL: this.apiUrl,
            withCredentials: true,
        });
    }

    async attempt(verb, onError, ...args) {
        try {
            const { data } = await this.client[verb](...args);
            return data;
        } catch (error) {
            const { response } = error;

            // not an http error
            if (!response.status) {
                throw error;
            }

            let requestError;
            switch (response.status) {
                case 422:
                    requestError = new ValidationError(response.statusText, response.status, error.response.data);
                    break;
                case 401:
                    requestError = new AuthenticationError(response.statusText, response.status, error.response.data);
                    break;
                case 403:
                    requestError = new PermissionError(response.statusText, response.status, error.response.data);
                    break;
                default:
                    requestError = new RequestError(response.statusText, response.status, error.response.data);
                    break;
            }

            if (onError) {
                return onError(requestError);
            }

            throw requestError;
        }
    }

    dispatch(method, ...args) {
        if (!METHODS[method]) {
            throw new Error(`invalid method: ${method}`);
        }

        const {
            verb,
            url,
            data = null,
            onError,
        } = METHODS[method](...args);

        if (data) {
            Object.keys(data).forEach(
                (key) => {
                    if (data[key] instanceof Date) {
                        data[key] = getTimestampFromDateInstance(data[key]);
                    }
                },
            );
        }

        switch (verb) {
            case GET:
            case DELETE:
                return this.attempt(verb, onError, url);
            case POST:
            case PUT:
            case PATCH:
                return this.attempt(verb, onError, url, data);

            default:
                throw new Error(`Invalid verb: ${verb}`);
        }
    }
}
