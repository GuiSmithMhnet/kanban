import { useEffect } from 'react';
import Router from 'next/router';

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem('kanban-token');
    Router.replace('/usuarios/login');
  }, []);

  return null;
};

export default Logout;

export const getServerSideProps = async () => ({
  props: {},
});
