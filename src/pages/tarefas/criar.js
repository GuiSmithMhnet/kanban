"use client";

import { Box } from "@mui/material";
import TaskForm from "@/components/form/TaskForm";

export default function CriarTarefaScreen() {
  return (
    <Box sx={{ p: 3 }}>
      <TaskForm formTitle="Criar tarefa" submitText="Criar" />
    </Box>
  );
}
