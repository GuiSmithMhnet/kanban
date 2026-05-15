import { useEffect } from 'react';
import Router from 'next/router';

import Loading from '@/components/Loading';
import { toast } from 'react-toastify';

import { removeToken } from '@/utils/token';

const errorMessage = 'Erro ao sair. Contate o suporte';

const Logout = () => {
  useEffect(() => {
    try {
      const tokenRemovido = removeToken();

      if(!tokenRemovido){
        throw new Error(errorMessage);
      }
      toast.success('Logout realizado');
      Router.replace('/usuarios/login');
    } catch (error) {
      console.error(error);
      toast.error(errorMessage);
    }
  }, []);

  return <Loading />;
};

export default Logout;

export const getServerSideProps = async () => ({
  props: {},
});
