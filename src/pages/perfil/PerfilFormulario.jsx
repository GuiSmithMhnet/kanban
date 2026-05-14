import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Loading from '@/components/Loading';
import authAxios from '@/utils/authAxios';

const defaultValues = {
  nome: '',
  email: '',
  username: '',
  src: null,
};

const PerfilFormulario = ({ mode = 'edit', initialValues = defaultValues, onPerfilAtualizado }) => {
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: initialValues });

  useEffect(() => {
    reset(initialValues ? initialValues : defaultValues);
  }, [initialValues, reset]);

  const onSubmit = async (data) => {
    if (mode !== 'edit') {
      toast.error('Modo inválido de formulário!');
      return;
    }

    try {
      setIsLoading(true);

      const payload = {
        nome: data.nome,
        email: data.email,
        username: data.username,
      };

      const res = await authAxios('put', '/api/usuarios/editarPerfil', payload);
      const perfil = res?.data?.data;

      toast.success('Perfil editado');
      onPerfilAtualizado?.(perfil);
    } catch (error) {
      console.log(error?.response || error);
      toast.error(error?.response?.data?.mensagem || 'Erro ao salvar perfil');
    } finally {
      setIsLoading(false);
    }
  };

  const src = initialValues?.src;
  const nome = initialValues?.nome;
  const username = initialValues?.username;

  return (
    <Box sx={{ width: '100%', mx: 'auto' }}>
      <Stack component="form" spacing={2.5} onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', sm: 'center' }}>
          <Avatar src={src || undefined} sx={{ width: 72, height: 72 }}>
            {!src ? <AccountCircleIcon sx={{ fontSize: 56 }} /> : null}
          </Avatar>

          <Box>
            <Typography component="h2" variant="h5">
              {nome || 'Perfil'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {username ? `@${username}` : 'Dados do usuário autenticado'}
            </Typography>
          </Box>
        </Stack>

        <Divider />

        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="success" type="submit" disabled={isLoading}>
            Salvar
          </Button>
        </Stack>

        <TextField
          label="Nome"
          fullWidth
          required
          disabled={isLoading}
          error={!!errors.nome}
          helperText={errors.nome?.message}
          slotProps={{ inputLabel: { shrink: true } }}
          {...register('nome', {
            required: 'Nome é obrigatório.',
            maxLength: {
              value: 255,
              message: 'Nome deve ter no máximo 255 caracteres.',
            },
          })}
        />

        <TextField
          label="E-mail"
          type="email"
          fullWidth
          required
          disabled={isLoading}
          error={!!errors.email}
          helperText={errors.email?.message}
          slotProps={{ inputLabel: { shrink: true } }}
          {...register('email', {
            required: 'E-mail é obrigatório.',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Informe um e-mail válido.',
            },
            maxLength: {
              value: 100,
              message: 'E-mail deve ter no máximo 100 caracteres.',
            },
          })}
        />

        <TextField
          label="Username"
          fullWidth
          required
          disabled={isLoading}
          error={!!errors.username}
          helperText={errors.username?.message}
          slotProps={{ inputLabel: { shrink: true } }}
          {...register('username', {
            required: 'Username é obrigatório.',
            pattern: {
              value: /^[A-Za-z0-9_]+$/,
              message: 'Usuário deve ter apenas letras e números.',
            },
            maxLength: {
              value: 15,
              message: 'Username deve ter no máximo 15 caracteres.',
            },
          })}
        />
      </Stack>

      {isLoading ? <Loading /> : <></>}
    </Box>
  );
};

export default PerfilFormulario;

export const getServerSideProps = async () => ({
  notFound: true,
});
