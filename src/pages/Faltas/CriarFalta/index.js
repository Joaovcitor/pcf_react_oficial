/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { get } from "lodash";
import axios from "../../../services/axios";
import { toast } from "react-toastify";
import {
  Box,
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Breadcrumbs,
  Link,
  Avatar,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Chip,
  Stack,
  Divider,
} from "@mui/material";
import {
  ArrowBack as ArrowBackIcon,
  Warning as WarningIcon,
  Person as PersonIcon,
  Save as SaveIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";

export default function CriarFalta({ match }) {
  const { id } = match.params;
  const [motivo_da_falta, setMotivo] = useState("");
  const [quando_ocorreu_a_falta, setData] = useState("");
  const [user, setUser] = useState([]);
  const [targetUser, setTargetUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const [userResponse, targetUserResponse] = await Promise.all([
          axios.get("/"),
          axios.get(`/users/${id}`)
        ]);
        
        setUser(userResponse.data.user);
        setTargetUser(targetUserResponse.data);
      } catch (error) {
        toast.error("Erro ao carregar dados do usuário");
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!motivo_da_falta || motivo_da_falta.length < 4) {
      return toast.error("Motivo da falta deve ter pelo menos 4 caracteres");
    }

    setSubmitting(true);
    const registradorId = user.id;
    const userId = id;

    try {
      await axios.post("/faltas/", {
        motivo_da_falta: motivo_da_falta,
        userId: userId,
        registradorId: registradorId,
        quando_ocorreu_a_falta: quando_ocorreu_a_falta,
      });
      
      toast.success("Falta gerada com sucesso!");
      setMotivo("");
      setData("");
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
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header com Breadcrumbs */}
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link
            component="button"
            variant="body1"
            onClick={() => window.history.back()}
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "primary.main",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            <ArrowBackIcon sx={{ mr: 0.5 }} fontSize="small" />
            Voltar
          </Link>
          <Typography color="text.primary">Gerar Falta</Typography>
        </Breadcrumbs>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(45deg, #d32f2f, #f57c00)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
          }}
        >
          Registrar Falta
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Registre uma falta para o funcionário selecionado
        </Typography>
      </Box>

      {/* Informações do Funcionário */}
      {targetUser && (
        <Paper
          elevation={3}
          sx={{
            p: 3,
            mb: 4,
            background: "linear-gradient(135deg, #ffebee 0%, #fce4ec 100%)",
            border: "1px solid #ffcdd2",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Avatar
              sx={{
                bgcolor: "#d32f2f",
                mr: 2,
                width: 56,
                height: 56,
              }}
            >
              <PersonIcon />
            </Avatar>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, color: "#d32f2f" }}>
                {targetUser.name}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                <Chip
                  label={targetUser.role || "Função não informada"}
                  color="error"
                  variant="outlined"
                  size="small"
                />
                <Chip
                  label={targetUser.email}
                  color="default"
                  variant="outlined"
                  size="small"
                />
              </Stack>
            </Box>
          </Box>
          
          <Alert severity="warning" sx={{ mt: 2 }}>
            <Typography variant="body2">
              <strong>Atenção:</strong> Você está prestes a registrar uma falta para este funcionário. 
              Certifique-se de que todas as informações estão corretas antes de prosseguir.
            </Typography>
          </Alert>
        </Paper>
      )}

      {/* Formulário */}
      <Card elevation={3}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Avatar sx={{ bgcolor: "#f57c00", mr: 2 }}>
              <WarningIcon />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Detalhes da Falta
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              multiline
              rows={6}
              label="Motivo da Falta"
              placeholder="Descreva detalhadamente o motivo da falta..."
              value={motivo_da_falta}
              onChange={(e) => setMotivo(e.target.value)}
              required
              error={motivo_da_falta.length > 0 && motivo_da_falta.length < 4}
              helperText={
                motivo_da_falta.length > 0 && motivo_da_falta.length < 4
                  ? "O motivo deve ter pelo menos 4 caracteres"
                  : "Seja específico e detalhado sobre o motivo da falta"
              }
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <Box sx={{ mr: 1, mt: -3 }}>
                    <WarningIcon color="action" />
                  </Box>
                ),
              }}
            />

            <TextField
              fullWidth
              type="date"
              label="Data da Ocorrência"
              value={quando_ocorreu_a_falta}
              onChange={(e) => setData(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              helperText="Informe quando a falta ocorreu (opcional)"
              sx={{ mb: 4 }}
              InputProps={{
                startAdornment: (
                  <Box sx={{ mr: 1 }}>
                    <CalendarIcon color="action" />
                  </Box>
                ),
              }}
            />

            <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                onClick={() => window.history.back()}
                disabled={submitting}
                size="large"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="error"
                disabled={submitting || !motivo_da_falta || motivo_da_falta.length < 4}
                startIcon={submitting ? <CircularProgress size={20} /> : <SaveIcon />}
                size="large"
                sx={{
                  minWidth: 140,
                  background: "linear-gradient(45deg, #d32f2f, #f57c00)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #b71c1c, #e65100)",
                  },
                }}
              >
                {submitting ? "Gerando..." : "Gerar Falta"}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
