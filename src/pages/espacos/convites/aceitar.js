import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Loading from '@/components/Loading';
import { ESPACO_ICONES } from '@/pages/espacos/EspacosIcones';
import authAxios from '@/utils/authAxios';
import { formatDateTime } from '@/utils/formatDate';

const STATUS_LABEL = {
  PENDENTE: 'Pendente',
  ACEITO: 'Aceito',
  RECUSADO: 'Recusado',
  CANCELADO: 'Cancelado',
};

const EspacoIconPreview = ({ icon }) => {
  const iconOption = ESPACO_ICONES.find((item) => item.value === icon) || ESPACO_ICONES[0];
  const IconComponent = iconOption.Icon;

  return <IconComponent fontSize="large" />;
};

const AceitarConvitePage = () => {
  const router = useRouter();

  const [convite, setConvite] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const idConvite = useMemo(() => {
    const rawValue = router.query?.id_convite ?? router.query?.id;
    const parsedValue = Number(rawValue);

    return Number.isInteger(parsedValue) && parsedValue > 0 ? parsedValue : null;
  }, [router.query]);

  useEffect(() => {
    const fetchConvite = async () => {
      if (!idConvite) {
        return;
      }

      try {
        setIsLoading(true);

        const params = new URLSearchParams({ id_convite: idConvite });
        const res = await authAxios('get', `/api/espacos/convites/dadosConvite?${params.toString()}`);
        setConvite(res?.data?.data ?? null);
      } catch (error) {
        console.log(error?.response || error);
        toast.error(error?.response?.data?.mensagem || 'Erro ao buscar convite');
        setConvite(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (router.isReady) {
      fetchConvite();
    }
  }, [router.isReady, idConvite]);

  const handleAceitarConvite = async () => {
    if (!idConvite) {
      toast.error('ID inválido');
      return;
    }

    try {
      setIsSubmitting(true);

      const params = new URLSearchParams({ id_convite: idConvite });
      const res = await authAxios('put', `/api/espacos/convites/aceitarConvite?${params.toString()}`);
      setConvite(res?.data?.data ?? null);
      toast.success('Convite aceito');
    } catch (error) {
      console.log(error?.response || error);
      toast.error(error?.response?.data?.mensagem || 'Erro ao aceitar convite');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canAccept = convite?.status === 'PENDENTE' && convite?.expirado !== true;

  return (
    <>
      <Head>
        <title>Aceitar convite</title>
        <meta name="description" content="Aceite de convite de espaço" />
      </Head>

      {(isLoading || isSubmitting) ? <Loading /> : <></>}

      <Stack spacing={3}>
        <Box>
          <Typography component="h1" variant="h3" sx={{ mb: 1 }}>
            Aceitar convite
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Confira os dados do convite antes de aceitar.
          </Typography>
        </Box>

        {!idConvite ? (
          <Alert severity="error">Informe um convite válido.</Alert>
        ) : null}

        {convite ? (
          <Stack spacing={2.5}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <EspacoIconPreview icon={convite.espaco?.icon} />

              <Box>
                <Typography variant="h5">{convite.espaco?.nome}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {convite.espaco?.sigla}
                </Typography>
              </Box>
            </Stack>

            <Typography variant="body1">
              {convite.espaco?.descricao}
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
              <Chip label={`Status: ${STATUS_LABEL[convite.status] || convite.status}`} />
              <Chip label={`Proprietário: ${convite.proprietario?.nome || 'Não informado'}`} />
              <Chip label={`Expira em: ${formatDateTime(convite.data_expiracao)}`} />
            </Stack>

            {convite.expirado ? (
              <Alert severity="warning">Este convite expirou.</Alert>
            ) : null}

            {convite.status === 'ACEITO' ? (
              <Alert severity="success">Este convite já foi aceito.</Alert>
            ) : null}

            {convite.status === 'RECUSADO' ? (
              <Alert severity="warning">Este convite já foi recusado.</Alert>
            ) : null}

            {convite.status === 'CANCELADO' ? (
              <Alert severity="warning">Este convite foi cancelado.</Alert>
            ) : null}

            <Button
              type="button"
              variant="contained"
              onClick={handleAceitarConvite}
              disabled={!canAccept || isSubmitting}
            >
              Aceitar convite
            </Button>
          </Stack>
        ) : null}
      </Stack>
    </>
  );
};

export default AceitarConvitePage;

export const getServerSideProps = async () => ({
  props: {},
});
