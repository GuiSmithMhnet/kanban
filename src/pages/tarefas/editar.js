"use client";

import { Box } from "@mui/material";
import TaskForm from "@/components/form/TaskForm";

const initialValues = {
  titulo: "Ajustar layout da sidebar",
  descricao: "Refinar espacamentos e comportamento no mobile.",
};

export default function EditarTarefaScreen() {
  return (
    <Box sx={{ p: 3 }}>
      <TaskForm
        formTitle="Editar tarefa"
        submitText="Salvar alteracoes"
        initialValues={initialValues}
      />
    </Box>
  );
}
