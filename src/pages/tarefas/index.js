import Head from "next/head";
import { Box, Typography } from "@mui/material";

import Link from 'next/navigation';

export default function TarefasPage() {
  return (
    <>
      <Head>
        <title>Tarefas</title>
        <meta name="description" content="Tela de tarefas" />
      </Head>

      <Box
        component="main"
        sx={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography component="h1" variant="h2">
          Tarefas
        </Typography>
      </Box>
    </>
  );
}
