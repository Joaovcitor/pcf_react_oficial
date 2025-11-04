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

import axios from "../../../services/axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function FormulariosBeneficiario({ match }) {
  const { id } = match.params;
  const [child, setChild] = useState([]);
  const [formularios, setFormularios] = useState([]);
  const [loadingForms, setLoadingForms] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showModels, setShowModels] = useState(false);
  const [selectedEtapa, setSelectedEtapa] = useState("");
  const [showRegistros, setShowRegistros] = useState(false);
  const [loadingRegistros, setLoadingRegistros] = useState(false);
  const [registros, setRegistros] = useState([]);
  const [selectedRegistro, setSelectedRegistro] = useState(null);
  const [dialogRegistroOpen, setDialogRegistroOpen] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`/crianca/${id}`);
        setChild(response.data);
      } catch (error) {
        console.error("Erro ao carregar beneficiário:", error);
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

  // Mapeia a etapa conforme a idade da criança (0–7 anos)
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
      .filter((f) => f.tipo === "tipo5" || f.tipo === "tipo7")
      .filter((f) => (selectedEtapa ? f.etapa === selectedEtapa : true))
      .filter((f) => (etapaPorIdade ? true : true));
  }, [formularios, selectedEtapa, etapaPorIdade]);

  const etapasDisponiveis = useMemo(() => {
    const set = new Set();
    (formularios || [])
      .filter((f) => f.tipo === "tipo5" || f.tipo === "tipo7")
      .forEach((f) => {
        if (typeof f.etapa !== "undefined" && f.etapa !== null)
          set.add(f.etapa);
      });
    return Array.from(set).sort((a, b) => a - b);
  }, [formularios]);

  useEffect(() => {
    if (!selectedEtapa && etapaPorIdade) {
      setSelectedEtapa(etapaPorIdade);
    }
  }, [etapaPorIdade, selectedEtapa]);

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
    try {
      setSubmitting(true);
      const formId = selectedForm?.id;
      if (!formId) {
        toast.error("ID do formulário não encontrado.");
        return;
      }
      const campos =
        selectedForm?.campos || selectedForm?.estrutura?.campos || [];
      const titulo =
        selectedForm?.titulo || selectedForm?.estrutura?.titulo || "";
      const respostasDetalhadas = campos.map((c) => ({
        idCampo: c.id,
        label: c.label,
        type: c.type,
        options: Array.isArray(c.options) ? c.options : [],
        resposta: formValues[c.id] ?? null,
      }));

      await axios.post(`/forms/registrar/${formId}`, {
        formId,
        childId: id,
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

  async function fetchRegistros() {
    try {
      setLoadingRegistros(true);
      const response = await axios.get(`/forms/registros/${id}`);
      console.log("Registros de formulários:", response.data);
      setRegistros(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Erro ao buscar registros de formulários:", error);
      const mainMessage =
        error?.response?.data?.message ||
        "Não foi possível carregar os formulários preenchidos.";
      toast.error(mainMessage);
      const errs = error?.response?.data?.errors;
      if (Array.isArray(errs)) {
        errs.forEach((m) => {
          if (typeof m === "string" && m) toast.error(m);
        });
      }
    } finally {
      setLoadingRegistros(false);
    }
  }

  function handleToggleRegistros() {
    setShowRegistros((prev) => {
      const next = !prev;
      if (next) fetchRegistros();
      return next;
    });
  }

  function handleOpenRegistro(registro) {
    setSelectedRegistro(registro);
    setDialogRegistroOpen(true);
  }

  function handleCloseRegistroDialog() {
    setSelectedRegistro(null);
    setDialogRegistroOpen(false);
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
              Selecione um modelo para preencher com o beneficiário
              (Desenvolvimento Infantil)
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
                <Chip
                  label={`Etapa recomendada: ${etapaPorIdade}`}
                  size="small"
                />
              </Box>
            )}
          </CardContent>
          <CardActions sx={{ p: 2, pt: 0 }}>
            <Button
              variant="outlined"
              size="small"
              component={Link}
              to={`/planos/planos-do-beneficiario/${child?.id}`}
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
              onChange={(e) =>
                setSelectedEtapa(
                  e.target.value === "" ? "" : Number(e.target.value)
                )
              }
              sx={{ width: 220 }}
            >
              <MenuItem value="">Todas</MenuItem>
              {etapasDisponiveis.map((et) => (
                <MenuItem key={et} value={et}>{`Etapa ${et}`}</MenuItem>
              ))}
            </TextField>
            <Button
              variant={showModels ? "outlined" : "contained"}
              size="small"
              onClick={() => setShowModels((v) => !v)}
            >
              {showModels ? "Ocultar modelos" : "Mostrar modelos"}
            </Button>
          </Box>
          {loadingForms ? (
            <Typography variant="body2">Carregando modelos...</Typography>
          ) : !showModels ? (
            <Typography variant="body2" color="text.secondary">
              Clique em &quot;Mostrar modelos&quot; para visualizar os
              formulários disponíveis.
            </Typography>
          ) : formulariosFiltrados.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Nenhum modelo disponível para o filtro atual.
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {formulariosFiltrados.map((f) => {
                const camposCount =
                  f.campos?.length ?? f.estrutura?.campos?.length ?? 0;
                const titulo = f.titulo || f.estrutura?.titulo || "Formulário";
                return (
                  <Grid item xs={12} sm={6} md={4} key={f.id}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          <Avatar sx={{ bgcolor: "secondary.main", mr: 1 }}>
                            <FormIcon />
                          </Avatar>
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: 600 }}
                              noWrap
                            >
                              {titulo}
                            </Typography>
                            <Box sx={{ mt: 0.5 }}>
                              <Chip
                                label={`Etapa ${f.etapa ?? "-"}`}
                                size="small"
                                sx={{ mr: 0.5 }}
                              />
                              <Chip
                                label={`${camposCount} campo(s)`}
                                size="small"
                                variant="outlined"
                              />
                            </Box>
                          </Box>
                        </Box>
                        {f.createdAt && (
                          <Typography variant="caption" color="text.secondary">
                            Criado em:{" "}
                            {new Date(f.createdAt).toLocaleDateString("pt-BR")}
                          </Typography>
                        )}
                      </CardContent>
                      <CardActions sx={{ p: 2, pt: 0 }}>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => handleOpenForm(f)}
                        >
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

        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Modelos preenchidos
          </Typography>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 2 }}>
            <Button
              variant={showRegistros ? "outlined" : "contained"}
              size="small"
              onClick={handleToggleRegistros}
            >
              {showRegistros ? "Ocultar preenchidos" : "Mostrar preenchidos"}
            </Button>
          </Box>
          {!showRegistros ? (
            <Typography variant="body2" color="text.secondary">
              Clique em &quot;Mostrar preenchidos&quot; para visualizar os
              formulários registrados.
            </Typography>
          ) : loadingRegistros ? (
            <Typography variant="body2">Carregando registros...</Typography>
          ) : registros.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              Nenhum formulário preenchido.
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {registros.map((reg) => {
                const modelo = reg.modelo || reg.formModel || {};
                const titulo =
                  modelo.titulo || reg.titulo || "Formulário preenchido";
                const respostas =
                  reg.respostas || reg.answers || reg.respostasDetalhadas || [];
                const respostasCount = Array.isArray(respostas)
                  ? respostas.length
                  : 0;
                return (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    key={reg.id || `${titulo}-${Math.random()}`}
                  >
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          <Avatar sx={{ bgcolor: "success.main", mr: 1 }}>
                            <FormIcon />
                          </Avatar>
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: 600 }}
                              noWrap
                            >
                              {titulo}
                            </Typography>
                            <Box sx={{ mt: 0.5 }}>
                              <Chip
                                label={`${respostasCount} resposta(s)`}
                                size="small"
                                variant="outlined"
                                sx={{ mr: 0.5 }}
                              />
                              {reg.createdAt && (
                                <Chip
                                  label={`Criado em: ${new Date(reg.createdAt).toLocaleDateString("pt-BR")}`}
                                  size="small"
                                />
                              )}
                            </Box>
                          </Box>
                        </Box>
                        {modelo &&
                          modelo.campos &&
                          Array.isArray(modelo.campos) &&
                          modelo.campos.length > 0 && (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {`Modelo com ${modelo.campos.length} campo(s)`}
                            </Typography>
                          )}
                      </CardContent>
                      <CardActions sx={{ p: 2, pt: 0 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleOpenRegistro(reg)}
                        >
                          Ver detalhes
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
        <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            {selectedForm?.titulo ||
              selectedForm?.estrutura?.titulo ||
              "Preencher Formulário"}
          </DialogTitle>
          <DialogContent dividers>
            <Box component="form" onSubmit={handleSubmitForm} sx={{ mt: 1 }}>
              {(
                selectedForm?.campos ||
                selectedForm?.estrutura?.campos ||
                []
              ).map((campo) => {
                const value = formValues[campo.id] ?? "";
                switch (campo.type) {
                  case "textarea":
                    return (
                      <TextField
                        key={campo.id}
                        label={campo.label}
                        value={value}
                        onChange={(e) =>
                          handleChangeField(campo.id, e.target.value)
                        }
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
                        onChange={(e) =>
                          handleChangeField(campo.id, e.target.value)
                        }
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
                          onChange={(e) =>
                            handleChangeField(campo.id, e.target.value)
                          }
                        >
                          {(campo.options || []).map((opt, idx) => (
                            <FormControlLabel
                              key={`${campo.id}-${idx}`}
                              value={opt}
                              control={<Radio />}
                              label={opt}
                            />
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
                            onChange={(e) =>
                              handleChangeField(campo.id, e.target.checked)
                            }
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
                        onChange={(e) =>
                          handleChangeField(campo.id, e.target.value)
                        }
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

        {/* Dialog de detalhes do registro */}
        <Dialog
          open={dialogRegistroOpen}
          onClose={handleCloseRegistroDialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            {selectedRegistro?.modelo?.titulo ||
              selectedRegistro?.titulo ||
              "Detalhes do registro"}
          </DialogTitle>
          <DialogContent dividers>
            {(() => {
              const respostas =
                selectedRegistro?.respostas ||
                selectedRegistro?.answers ||
                selectedRegistro?.respostasDetalhadas ||
                [];
              if (Array.isArray(respostas) && respostas.length > 0) {
                return (
                  <Box>
                    {respostas.map((r, idx) => (
                      <Box key={r.idCampo || idx} sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                          {r.label || `Pergunta ${idx + 1}`}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 0.5 }}
                        >
                          {`Tipo: ${r.type || "-"}`}
                        </Typography>
                        {Array.isArray(r.options) && r.options.length > 0 && (
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ mb: 0.5, display: "block" }}
                          >
                            {`Opções: ${r.options.join(", ")}`}
                          </Typography>
                        )}
                        <Typography variant="body1">
                          {`Resposta: ${r.resposta ?? "-"}`}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                );
              }
              // Fallback: mostrar JSON do registro
              return (
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                  >
                    Não há respostas detalhadas; exibindo conteúdo bruto.
                  </Typography>
                  <Box
                    component="pre"
                    sx={{
                      p: 1,
                      bgcolor: "grey.100",
                      borderRadius: 1,
                      overflow: "auto",
                    }}
                  >
                    {JSON.stringify(selectedRegistro || {}, null, 2)}
                  </Box>
                </Box>
              );
            })()}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseRegistroDialog}>Fechar</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}
