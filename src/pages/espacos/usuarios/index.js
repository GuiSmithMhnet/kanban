import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';

import Loading from '@/components/Loading';
import authAxios from '@/utils/authAxios';
import catchAuthAxios from '@/utils/catchAxios';
import getNameInitials from '@/utils/getNameInitials';

const UsuariosPage = ({ espaco }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        setIsLoading(true);

        const params = new URLSearchParams({ id_espaco: espaco.id });
        const res = await authAxios('get', `/api/espacos/usuarios/listarUsuarios?${params.toString()}`);
        setUsuarios(res?.data?.data ?? []);
      } catch (error) {
        catchAuthAxios(error, 'Erro ao listar usuários');
      } finally {
        setIsLoading(false);
      }
    };

    if (espaco?.id) {
      fetchUsuarios();
    }
  }, [espaco]);

  const columns = [
    {
      field: 'nome',
      headerName: 'Nome',
      flex: 1.2,
      minWidth: 220,
      renderCell: (params) => (
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar
            src={params.row?.src || undefined}
            alt={params.value || 'Usuário'}
            sx={{ width: 32, height: 32 }}
          >
            {params.value ? getNameInitials(params.value) : '?'}
          </Avatar>
          <Typography variant="body2">{params.value}</Typography>
        </Stack>
      ),
    },
    {
      field: 'username',
      headerName: 'Usuário',
      flex: 0.9,
      minWidth: 160,
      valueGetter: (_, row) => (row?.username ? `@${row.username}` : ''),
    },
    {
      field: 'email',
      headerName: 'E-mail',
      flex: 1.2,
      minWidth: 220,
    },
    {
      field: 'vinculo',
      headerName: 'Vínculo',
      flex: 0.8,
      minWidth: 140,
    },
  ];

  const rows = usuarios.map((usuario, index) => ({
    id: usuario?.id ?? usuario?.id_usuario ?? usuario?.email ?? usuario?.username ?? index,
    ...usuario,
  }));

  return (
    <Stack spacing={2.5}>
      {isLoading ? <Loading /> : null}

      <Typography variant="body1" color="text.secondary">
        Usuários vinculados ao espaço.
      </Typography>

      <Box sx={{ width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          disableRowSelectionOnClick
          hideFooter
          pageSizeOptions={[rows.length || 5]}
          onRowClick={() => {}}
          localeText={{
            noRowsLabel: 'Nenhum registro.',
          }}
          sx={{
            border: 0,
            '& .MuiDataGrid-row': {
              cursor: 'pointer',
            },
          }}
        />
      </Box>
    </Stack>
  );
};

export default UsuariosPage;

export const getServerSideProps = async () => ({
  notFound: true,
});
