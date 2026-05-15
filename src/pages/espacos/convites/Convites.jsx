import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import ToolTip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ReplayOutlinedIcon from '@mui/icons-material/ReplayOutlined';

import Table from '@/components/Table';
import { formatDateTime } from '@/utils/formatDate';

import getNameInitials from '@/utils/getNameInitials';

import { toast } from 'react-toastify';

const Convites = ({ convites = [] }) => {

  const handleCancelInvite = (id) => {
    toast.info('Ainda não implementado');
  };
  
  const handleSendAgain = (id) => {
    toast.info('Ainda não implementado');
  }

  const tableColumns = {
    nome: {
      display: 'Usuário',
      format: (value, row) => (
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar src={row?.src || undefined} alt={value || 'Usuário'} sx={{ width: 32, height: 32 }}>
            {value ? getNameInitials(value) : '?'}
          </Avatar>
          <span>{value}</span>
        </Stack>
      ),
    },
    username: {
      display: 'Username',
      format: (value) => value ? `@${value}` : '',
    },
    email: {
      display: 'E-mail',
    },
    status: {
      display: 'Status',
    },
    data_cadastro: {
      display: 'Cadastro',
      format: formatDateTime,
    },
  };

  const tableRowActions = {
    display: 'Ações',
    actions: {
      cancel: {
        key: 'id',
        action: (id) => (
          <ToolTip title='Cancelar convite'>
            <IconButton color='error' onClick={() => handleCancelInvite(id)}>
              <CancelOutlinedIcon />
            </IconButton>
          </ToolTip>
        )
      },
      sendAgain: {
        key: 'id',
        action: (id) => (
          <ToolTip title='Reenviar e-mail'>
            <IconButton color='primary' onClick={() => handleSendAgain(id)}>
              <ReplayOutlinedIcon />
            </IconButton>
          </ToolTip>
        )
      }
    }
  };

  return <Table tableColumns={tableColumns} tableRowActions={tableRowActions} rows={convites} />;
};

export default Convites;

export const getServerSideProps = async () => ({
  notFound: true,
});
