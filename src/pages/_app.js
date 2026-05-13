// Estilos
import "@/styles/globals.css";

// MUI
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

// React / Next
import { ToastContainer } from 'react-toastify';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { useState, useEffect } from 'react';

// Utils
import hasRouteAccess from "@/utils/hasRouteAccess";

// Componentes
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
import Loading from '@/components/Loading';
import { AppThemeProvider } from '@/contexts/ThemeContext';

export default function App({ Component, pageProps }) {

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const auth = (url = window.location.pathname) => {
      const pathname = url.split('?')[0];

      if(!hasRouteAccess(pathname)){
        Router.replace('/');
      }
    };

    auth();
    Router.events.on('routeChangeComplete', auth);

    return () => {
      Router.events.off('routeChangeComplete', auth);
    };
  },[]);

  const renderPage = () => {
    if (isLoading) return <Loading />;

    return (<>
      <Navbar />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Component {...pageProps} />
        <ToastContainer position='bottom-right' />
      </Box>
    </>);
  }

  return (
    <AppThemeProvider>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        {renderPage()}
      </Box>
    </AppThemeProvider>
  );
}
