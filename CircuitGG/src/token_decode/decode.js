import { decode } from 'base-64'; 

export function decodeJWT(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(decode(base64));
};