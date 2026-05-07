"use client";
//Next
import Head from "next/head";
import Link from 'next/link';

// MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function TarefasPage() {
  return (
    <>
      <Head>
        <title>Tarefas</title>
        <meta name="description" content="Tela de tarefas" />
      </Head>

      <Box component="main">
        <Typography component="h1" variant="h2" align="center">
          Tarefas
        </Typography>
      </Box>
    </>
  );
}
