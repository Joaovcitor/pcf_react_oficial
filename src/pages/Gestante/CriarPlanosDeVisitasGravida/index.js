import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
  Divider,
  Chip,
} from "@mui/material";
import {
  Schedule as ScheduleIcon,
  Assignment as AssignmentIcon,
} from "@mui/icons-material";
import { get } from "lodash";
import axios from "../../../services/axios";
import history from "../../../services/history";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
export default function CriarPlanosDeVisitaGravida({ match }) {
  // eslint-disable-next-line react/prop-types
  const { id } = match.params;
  const [child, setChildrens] = useState([]);
  const [dia_a_ser_realizada_a_visita, setDia] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [grau_de_dificuldade_objetivo, setGrau] = useState("");
  const [etapa1, setEtapa1] = useState("");
  const [etapa2, setEtapa2] = useState("");
  const [etapa3, setEtapa3] = useState("");

  useEffect(() => {
    async function getData() {
      const response = await axios.get(`/cuidador/${id}`);
      setChildrens(response.data);
    }

    getData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    // Validação mais robusta dos campos obrigatórios
    if (!objetivo.trim()) {
      return toast.error("Por favor, preencha o objetivo da visita");
    }

    if (!etapa1.trim()) {
      return toast.error("Por favor, preencha o primeiro momento");
    }

    if (!etapa2.trim()) {
      return toast.error("Por favor, preencha o segundo momento");
    }

    if (!etapa3.trim()) {
      return toast.error("Por favor, preencha o terceiro momento");
    }

    if (!dia_a_ser_realizada_a_visita) {
      return toast.error("Por favor, selecione a data da visita");
    }

    try {
      // Dados conforme PlanoDeVisitaCreateDTO
      const planoData = {
        objective: objetivo.trim(),
        etapa1: etapa1.trim(),
        etapa2: etapa2.trim(),
        etapa3: etapa3.trim(),
        scheduledDay: new Date(dia_a_ser_realizada_a_visita),
        caregiverId: parseInt(id, 10),
      };

      // Primeira chamada: criação do plano
      await axios.post(`/planos/`, planoData);

      toast.success("Plano criado com sucesso e visita agendada");
      history.push(`/planos/criarplano-gravida/${id}`);
    } catch (e) {
      const errors = get(e, "response.data.errors", "");
      if (typeof errors === "string") {
        toast.error(errors);
      } else if (Array.isArray(errors)) {
        errors.forEach((error) => {
          toast.error(error);
        });
      } else if (typeof errors === "object") {
        Object.values(errors).forEach((error) => {
          if (typeof error === "string") {
            toast.error(error);
          }
        });
      }
    }
  }

  return (
    <Container maxWidth="md" component="form" onSubmit={handleSubmit}>
      <Box sx={{ py: 3 }}>
        <Box sx={{ mb: 3, textAlign: "center" }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Criar Plano de Visita (Gestante)
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {child?.name ? (
              <>
                <AssignmentIcon
                  sx={{ mr: 1, fontSize: 18, color: "text.secondary" }}
                />
                Cuidador: {child.name}
              </>
            ) : (
              "Carregando cuidador..."
            )}
          </Typography>
        </Box>

        <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                🎯 Objetivo da Visita
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Objetivo"
                value={objetivo}
                onChange={(e) => setObjetivo(e.target.value)}
                placeholder="Descreva o objetivo principal desta visita..."
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                1️⃣ Primeiro Momento
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                label="Atividades Iniciais"
                value={etapa1}
                onChange={(e) => setEtapa1(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                2️⃣ Segundo Momento
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                label="Atividades Principais"
                value={etapa2}
                onChange={(e) => setEtapa2(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                3️⃣ Terceiro Momento
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                label="Atividades Finais"
                value={etapa3}
                onChange={(e) => setEtapa3(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                📅 Data da Visita
              </Typography>
              <TextField
                type="datetime-local"
                fullWidth
                value={dia_a_ser_realizada_a_visita}
                onChange={(e) => setDia(e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                🔧 Dificuldade da atividade
              </Typography>
              <Select
                fullWidth
                value={grau_de_dificuldade_objetivo}
                onChange={(e) => setGrau(e.target.value)}
                displayEmpty
              >
                <MenuItem value="">
                  <em>Selecione</em>
                </MenuItem>
                <MenuItem value="Fácil">Fácil</MenuItem>
                <MenuItem value="Média">Média</MenuItem>
                <MenuItem value="Dificil">Difícil</MenuItem>
              </Select>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button
              variant="outlined"
              onClick={() => history.push(`/planos/criarplano/${id}`)}
            >
              Voltar
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                background: "linear-gradient(45deg, #4caf50, #45a049)",
                px: 4,
                py: 1.5,
              }}
            >
              Criar Plano
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
