import Head from "next/head";
import { Box, Typography } from "@mui/material";

export default function SobrePage() {
  return (
    <>
      <Head>
        <title>Sobre</title>
        <meta name="description" content="Tela sobre" />
      </Head>

      <Box
        component="main"
        sx={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h2" textAlign="center">
          Sobre
        </Typography>
      </Box>
    </>
  );
}
