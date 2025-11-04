import React, { useEffect, useMemo, useState } from "react";
import axios from "../../../services/axios";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
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

export default function FormsCuidadores() {
  const { id } = useParams();
  const [cuidador, setCuidador] = useState({});
  const [formularios, setFormularios] = useState([]);
  const [loadingForms, setLoadingForms] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showModels, setShowModels] = useState(false);
  const [selectedEtapa, setSelectedEtapa] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`/cuidador/${id}`);
        setCuidador(response.data);
      } catch (error) {
        console.error("Erro ao carregar cuidador:", error);
      }
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

  const formulariosFiltrados = useMemo(() => {
    return (formularios || [])
      .filter((f) => (f.tipo === "tipo5" || f.tipo === "tipo7"))
      .filter((f) => (selectedEtapa ? f.etapa === selectedEtapa : true));
  }, [formularios, selectedEtapa]);

  const etapasDisponiveis = useMemo(() => {
    const set = new Set();
    (formularios || [])
      .filter((f) => (f.tipo === "tipo5" || f.tipo === "tipo7"))
      .forEach((f) => {
        if (typeof f.etapa !== "undefined" && f.etapa !== null) set.add(f.etapa);
      });
    return Array.from(set).sort((a, b) => a - b);
  }, [formularios]);

  function handleOpenForm(form) {
    setSelectedForm(form);
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
    try {
      setSubmitting(true);
      const formId = selectedForm?.id;
      if (!formId) {
        toast.error("ID do formulário não encontrado.");
        return;
      }
      const campos = selectedForm?.campos || selectedForm?.estrutura?.campos || [];
      const titulo = selectedForm?.titulo || selectedForm?.estrutura?.titulo || "";
      const respostasDetalhadas = campos.map((c) => ({
        idCampo: c.id,
        label: c.label,
        type: c.type,
        options: Array.isArray(c.options) ? c.options : [],
        resposta: formValues[c.id] ?? null,
      }));

      await axios.post(`/forms/registrar/${formId}`, {
        formId,
        caregiverId: id,
        titulo,
        respostas: respostasDetalhadas,
        formModel: {
          campos,
          titulo,
        },
      });
      toast.success("Formulário registrado com sucesso!");
      handleCloseDialog();
    } catch (error) {
      const mainMessage =
        error?.response?.data?.message || "Falha ao registrar formulário.";
      toast.error(mainMessage);
      const errs = error?.response?.data?.errors;
      if (Array.isArray(errs)) {
        errs.forEach((m) => {
          if (typeof m === "string" && m) toast.error(m);
        });
      }
    } finally {
      setSubmitting(false);
    }
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
              Formulários do(a) Beneficiário
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Selecione um modelo para preencher com o cuidador (Gestante)
            </Typography>
          </Box>
        </Box>

        <Card elevation={1} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Cuidador(a)
            </Typography>
            <Typography variant="body1">
              {cuidador?.name || "Carregando..."}
            </Typography>
          </CardContent>
          <CardActions sx={{ p: 2, pt: 0 }}>
            <Button
              variant="outlined"
              size="small"
              component={Link}
              to={`/planos/planos-da-gestante/${cuidador?.id}`}
            >
              Acessar Planos de Visita
            </Button>
          </CardActions>
        </Card>

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Modelos disponíveis
          </Typography>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 2 }}>
            <TextField
              label="Filtrar por etapa"
              size="small"
              select
              value={selectedEtapa}
              onChange={(e) => setSelectedEtapa(e.target.value === "" ? "" : Number(e.target.value))}
              sx={{ width: 220 }}
            >
              <MenuItem value="">Todas</MenuItem>
              {etapasDisponiveis.map((et) => (
                <MenuItem key={et} value={et}>{`Etapa ${et}`}</MenuItem>
              ))}
            </TextField>
            <Button variant={showModels ? "outlined" : "contained"} size="small" onClick={() => setShowModels((v) => !v)}>
              {showModels ? "Ocultar modelos" : "Mostrar modelos"}
            </Button>
          </Box>
          {loadingForms ? (
            <Typography variant="body2">Carregando modelos...</Typography>
          ) : !showModels ? (
            <Typography variant="body2" color="text.secondary">
              Clique em &quot;Mostrar modelos&quot; para visualizar os formulários disponíveis.
            </Typography>
          ) : formulariosFiltrados.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Nenhum modelo disponível para o filtro atual.
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
            <Button
              variant="contained"
              type="submit"
              onClick={handleSubmitForm}
              disabled={submitting}
            >
              {submitting ? "Salvando..." : "Salvar"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}
