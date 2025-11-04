/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from "react";
import { Container } from "../../../styles/GlobalStyle";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  MenuItem,
} from "@mui/material";
import { Description as FormIcon } from "@mui/icons-material";
import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  subYears,
  subMonths,
} from "date-fns";
// Mantemos as etapas antigas para referência, mas a UI passa a listar modelos pelo endpoint
// import Etapa1 from "../../../components/Formularios5/Etapa1";
// import Etapa2 from "../../../components/Formularios5/Etapa2";
// import Etapa3 from "../../../components/Formularios5/Etapa3";
// import Etapa4 from "../../../components/Formularios5/Etapa4";
// import Etapa5 from "../../../components/Formularios5/Etapa5";
// import Etapa6 from "../../../components/Formularios5/Etapa6";
// import Etapa7 from "../../../components/Formularios5/Etapa7";

import axios from "../../../services/axios";
import { toast } from "react-toastify";

export default function Login({ match }) {
  const { id } = match.params;
  const [child, setChild] = useState([]);
  const [formularios, setFormularios] = useState([]);
  const [loadingForms, setLoadingForms] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    async function getData() {
      const response = await axios.get(`/crianca/${id}`);
      setChild(response.data);
    }

    getData();
  }, [id]);

  useEffect(() => {
    async function fetchForms() {
      try {
        setLoadingForms(true);
        const response = await axios.get(`/forms`);
        setFormularios(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Erro ao buscar formulários:", error);
        toast.error("Não foi possível carregar os modelos de formulários.");
      } finally {
        setLoadingForms(false);
      }
    }
    fetchForms();
  }, []);

  function calcularIdadeCompleta(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);

    const anos = differenceInYears(hoje, nascimento);

    const dataAjustada = subYears(hoje, anos);
    const meses = differenceInMonths(dataAjustada, nascimento);

    const dataAjustadaMeses = subMonths(dataAjustada, meses);
    const dias = differenceInDays(dataAjustadaMeses, nascimento);

    return { anos, meses, dias };
  }

  // Mapeia a etapa conforme a idade da criança (mesma lógica usada antes)
  const etapaPorIdade = useMemo(() => {
    if (!child || !child.born) return null;
    const idade = calcularIdadeCompleta(child.born);
    if (idade.anos === 1 && idade.meses <= 6) {
      return 5;
    } else if (idade.anos === 1 && idade.meses <= 11 && idade.anos <= 2) {
      return 6;
    } else if (idade.anos === 2 || idade.anos === 3) {
      return 7;
    }

    if (idade.meses <= 3) {
      return 1;
    } else if (idade.meses >= 3 && idade.meses <= 6 && idade.dias < 1) {
      return 2;
    } else if (idade.meses >= 6 && idade.meses <= 9 && idade.dias < 30) {
      return 3;
    } else if (idade.dias > 1 && idade.meses >= 9 && idade.meses <= 12) {
      return 4;
    }
    return null;
  }, [child]);

  const formulariosFiltrados = useMemo(() => {
    return (formularios || [])
      .filter((f) => (f.tipo === "tipo5"))
      .filter((f) => (etapaPorIdade ? f.etapa === etapaPorIdade : true));
  }, [formularios, etapaPorIdade]);

  const idadeTexto = useMemo(() => {
    if (!child || !child.born) return "";
    const idade = calcularIdadeCompleta(child.born);
    return `${idade.anos} ano(s), ${idade.meses} mês(es), ${idade.dias} dia(s)`;
  }, [child]);

  function handleOpenForm(form) {
    setSelectedForm(form);
    // Inicializa valores com vazio
    const campos = form.campos || form.estrutura?.campos || [];
    const inicial = {};
    campos.forEach((c) => {
      inicial[c.id] = c.type === "checkbox" ? false : "";
    });
    setFormValues(inicial);
    setDialogOpen(true);
  }

  function handleCloseDialog() {
    setDialogOpen(false);
    setSelectedForm(null);
    setFormValues({});
  }

  function handleChangeField(idCampo, value) {
    setFormValues((prev) => ({ ...prev, [idCampo]: value }));
  }

  async function handleSubmitForm(e) {
    e.preventDefault();
    // Sem endpoint de submissão definido, apenas feedback de sucesso para UX
    toast.success("Respostas registradas localmente. Integração de envio em breve.");
    handleCloseDialog();
  }

  return (
    <Container>
      <Box sx={{ maxWidth: 1200, mx: "auto", p: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
            <FormIcon />
          </Avatar>
          <Box>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
              Formulários 5
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Selecione um modelo para preencher com o beneficiário
            </Typography>
          </Box>
        </Box>

        <Card elevation={1} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Beneficiário
            </Typography>
            <Typography variant="body1">
              {child?.name || "Carregando..."}
            </Typography>
            {child?.born && (
              <Typography variant="body2" color="text.secondary">
                Idade: {idadeTexto}
              </Typography>
            )}
            {etapaPorIdade && (
              <Box sx={{ mt: 1 }}>
                <Chip label={`Etapa recomendada: ${etapaPorIdade}`} size="small" />
              </Box>
            )}
          </CardContent>
        </Card>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Modelos disponíveis
          </Typography>
          {loadingForms ? (
            <Typography variant="body2">Carregando modelos...</Typography>
          ) : formulariosFiltrados.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Nenhum modelo disponível para a etapa atual.
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {formulariosFiltrados.map((f) => {
                const camposCount = (f.campos?.length ?? f.estrutura?.campos?.length ?? 0);
                const titulo = f.titulo || f.estrutura?.titulo || "Formulário";
                return (
                  <Grid item xs={12} sm={6} md={4} key={f.id}>
                    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <Avatar sx={{ bgcolor: "secondary.main", mr: 1 }}>
                            <FormIcon />
                          </Avatar>
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }} noWrap>
                              {titulo}
                            </Typography>
                            <Box sx={{ mt: 0.5 }}>
                              <Chip label={`Etapa ${f.etapa ?? "-"}`} size="small" sx={{ mr: 0.5 }} />
                              <Chip label={`${camposCount} campo(s)`} size="small" variant="outlined" />
                            </Box>
                          </Box>
                        </Box>
                        {f.createdAt && (
                          <Typography variant="caption" color="text.secondary">
                            Criado em: {new Date(f.createdAt).toLocaleDateString("pt-BR")}
                          </Typography>
                        )}
                      </CardContent>
                      <CardActions sx={{ p: 2, pt: 0 }}>
                        <Button variant="contained" size="small" onClick={() => handleOpenForm(f)}>
                          Preencher
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Box>

        {/* Dialog de preenchimento dinâmico */}
        <Dialog open={dialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
          <DialogTitle>
            {selectedForm?.titulo || selectedForm?.estrutura?.titulo || "Preencher Formulário"}
          </DialogTitle>
          <DialogContent dividers>
            <Box component="form" onSubmit={handleSubmitForm} sx={{ mt: 1 }}>
              {(selectedForm?.campos || selectedForm?.estrutura?.campos || []).map((campo) => {
                const value = formValues[campo.id] ?? "";
                switch (campo.type) {
                  case "textarea":
                    return (
                      <TextField
                        key={campo.id}
                        label={campo.label}
                        value={value}
                        onChange={(e) => handleChangeField(campo.id, e.target.value)}
                        fullWidth
                        multiline
                        minRows={3}
                        required={!!campo.required}
                        placeholder={campo.placeholder || ""}
                        sx={{ mb: 2 }}
                      />
                    );
                  case "select":
                    return (
                      <TextField
                        key={campo.id}
                        select
                        label={campo.label}
                        value={value}
                        onChange={(e) => handleChangeField(campo.id, e.target.value)}
                        fullWidth
                        required={!!campo.required}
                        sx={{ mb: 2 }}
                      >
                        {(campo.options || []).map((opt, idx) => (
                          <MenuItem key={`${campo.id}-${idx}`} value={opt}>
                            {opt}
                          </MenuItem>
                        ))}
                      </TextField>
                    );
                  case "radio":
                    return (
                      <Box key={campo.id} sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          {campo.label}
                        </Typography>
                        <RadioGroup
                          value={value}
                          onChange={(e) => handleChangeField(campo.id, e.target.value)}
                        >
                          {(campo.options || []).map((opt, idx) => (
                            <FormControlLabel key={`${campo.id}-${idx}`} value={opt} control={<Radio />} label={opt} />
                          ))}
                        </RadioGroup>
                      </Box>
                    );
                  case "checkbox":
                    return (
                      <FormControlLabel
                        key={campo.id}
                        control={
                          <Checkbox
                            checked={!!formValues[campo.id]}
                            onChange={(e) => handleChangeField(campo.id, e.target.checked)}
                          />
                        }
                        label={campo.label}
                        sx={{ mb: 2 }}
                      />
                    );
                  default:
                    return (
                      <TextField
                        key={campo.id}
                        label={campo.label}
                        type={campo.type || "text"}
                        value={value}
                        onChange={(e) => handleChangeField(campo.id, e.target.value)}
                        fullWidth
                        required={!!campo.required}
                        placeholder={campo.placeholder || ""}
                        sx={{ mb: 2 }}
                      />
                    );
                }
              })}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button variant="contained" onClick={handleSubmitForm}>Enviar</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}
