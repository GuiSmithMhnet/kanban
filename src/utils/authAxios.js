import axios from 'axios';
import { getToken } from '@/utils/token';

const authAxios = async (method, url, body = {}, customHeaders = {}, contentType = 'application/json') => {
    try {
        return axios ({
            method,
            url,
            data: body,
            headers: {
                authorization: getToken(),
                'Content-Type': contentType,
                ...customHeaders
            }
        });
    } catch (error) {
        console.log('Erro ao realizar request', error);
        if(error.response.status === 401 || error.response.status === 403){
            window.location.href = `/login?redirectUrl=${window.location.pathname}`;
        } else {
            throw error;
        }
    }
};

export default authAxios;
