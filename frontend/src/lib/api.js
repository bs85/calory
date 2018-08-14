import 'whatwg-fetch';
import 'formdata-polyfill';

export const ROUTE_AUTHENTICATE = '/authenticate';

export class NetworkError extends Error {}

export class RequestError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
    }
}

export class AuthenticationError extends RequestError {}

export async function queryAPI(url, payload) {
    const data = new FormData();

    Object.keys(payload).forEach(
        (value, key) => data.set(key, value),
    );

    try {
        return {
            body: JSON.stringify({
                firstname: 'Bono',
                lastname: 'Stebler',
                username: 'bs85',
                role_name: 'admin',
            }),
        };

        const result = await fetch(url, {
            method: 'POST',
            body: data,
        });

        if (result.status >= 200 && result.status < 300) {
            return result;
        }

        switch (result.status) {
            case 401:
                throw new AuthenticationError(result.statusText, result.status);
            default:
                throw new RequestError(result.statusText, result.status);
        }
    } catch (error) {
        throw new NetworkError(error.message);
    }
}
