import Head from 'next/head';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Loading from '@/components/Loading';
import authAxios from '@/utils/authAxios';
import PerfilFormulario from './PerfilFormulario';

const TabPanel = ({ children, index, value }) => (
  <Box
    role="tabpanel"
    hidden={value !== index}
    id={`perfil-tabpanel-${index}`}
    aria-labelledby={`perfil-tab-${index}`}
    sx={{ pt: 3 }}
  >
    {value === index ? children : null}
  </Box>
);

const getTabProps = (index) => ({
  id: `perfil-tab-${index}`,
  'aria-controls': `perfil-tabpanel-${index}`,
});

export default function PerfilPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [perfil, setPerfil] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        setIsLoading(true);

        const res = await authAxios('get', '/api/usuarios/perfil');
        setPerfil(res?.data?.data ?? null);
      } catch (error) {
        console.log(error?.response || error);
        toast.error(error?.response?.data?.mensagem || 'Erro ao buscar perfil');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPerfil();
  }, []);

  const handleTabChange = (_, value) => {
    setActiveTab(value);
  };

  return (
    <>
      <Head>
        <title>Perfil</title>
        <meta name="description" content="Perfil do usuário" />
      </Head>

      {isLoading ? <Loading /> : <></>}

      <Stack spacing={3}>
        <Box>
          <Typography component="h1" variant="h3" sx={{ mb: 1 }}>
            Perfil
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Visualize e edite seus dados básicos.
          </Typography>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="Abas da tela de perfil">
            <Tab icon={<AccountCircleIcon />} iconPosition="start" label="Perfil" {...getTabProps(0)} />
          </Tabs>
        </Box>

        <TabPanel value={activeTab} index={0}>
          <PerfilFormulario mode="edit" initialValues={perfil} onPerfilAtualizado={setPerfil} />
        </TabPanel>
      </Stack>
    </>
  );
}

export const getServerSideProps = async () => ({
  props: {},
});
