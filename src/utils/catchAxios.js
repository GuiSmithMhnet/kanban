import { removeToken } from '@/utils/token';

import { toast } from 'react-toastify';
import Router from 'next/router';

const catchAuthAxios = (error, genericMessage = 'Ocorreu um erro inesperado' ) => {
    const status = error?.response?.status;

    const errorMessage = error?.response?.data?.mensagem ?? genericMessage;

    if (status === 401) {
        toast.warning(errorMessage);
        removeToken();
        Router.replace('/usuarios/logout');
        return;
    }

    const toasty = error?.response?.data?.mensagem ? toast.warning : toast.error;

    toasty(errorMessage);

    console.log(errorMessage);
};

export default catchAuthAxios;