import React, { useEffect, useMemo, useState } from "react";
import axios from "../../../services/axios";
import { Link } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Avatar,
  Chip,
  Paper,
  Breadcrumbs,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import {
  Home as HomeIcon,
  ChildCare as ChildCareIcon,
  PregnantWoman as PregnantWomanIcon,
  Assignment as AssignmentIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";

export default function PlanosDeVisita() {
  const [children, setChildren] = useState([]);
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchChildren, setSearchChildren] = useState("");
  const [searchPregnant, setSearchPregnant] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const [respChildren, respCaregivers] = await Promise.all([
        axios.get("/crianca/"),
        axios.get("/cuidador/meus-cuidadores"),
      ]);
      setChildren(Array.isArray(respChildren.data) ? respChildren.data : []);
      setCaregivers(Array.isArray(respCaregivers.data) ? respCaregivers.data : []);
      setError(null);
    } catch (e) {
      setError("Falha ao carregar dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const pregnantCaregivers = useMemo(
    () => caregivers.filter((c) => c.pregnant === true),
    [caregivers]
  );

  const filteredChildren = useMemo(() => {
    if (!searchChildren) return children;
    const term = searchChildren.toLowerCase();
    return children.filter(
      (c) => c.name && c.name.toLowerCase().includes(term)
    );
  }, [children, searchChildren]);

  const filteredPregnants = useMemo(() => {
    if (!searchPregnant) return pregnantCaregivers;
    const term = searchPregnant.toLowerCase();
    return pregnantCaregivers.filter(
      (c) => c.name && c.name.toLowerCase().includes(term)
    );
  }, [pregnantCaregivers, searchPregnant]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ textAlign: "center" }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <ButtonLink href="/" startIcon={<HomeIcon />}>Início</ButtonLink>
        <Typography color="text.primary">Planos</Typography>
      </Breadcrumbs>

      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          background: "linear-gradient(135deg, #11B4D9 0%, #308C50 100%)",
          color: "white",
          borderRadius: 3,
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 56, height: 56 }}>
              <AssignmentIcon sx={{ fontSize: 30 }} />
            </Avatar>
            <Box>
              <Typography variant="h4" component="h1" fontWeight="bold">
                Planos de Visita
              </Typography>
              <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                Crie planos para crianças e gestantes
              </Typography>
            </Box>
          </Box>
          <Tooltip title="Atualizar lista">
            <IconButton
              onClick={fetchData}
              sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white", "&:hover": { bgcolor: "rgba(255,255,255,0.3)" } }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>

      {/* Estatísticas */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Box textAlign="center">
              <Typography variant="h3" color="primary" fontWeight="bold">
                {children.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">Crianças</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box textAlign="center">
              <Typography variant="h3" color="warning.main" fontWeight="bold">
                {pregnantCaregivers.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">Gestantes</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box textAlign="center">
              <Typography variant="h3" color="success.main" fontWeight="bold">
                {children.length + pregnantCaregivers.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">Total</Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Seção Crianças */}
      <Box mb={4}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <ChildCareIcon color="primary" />
          <Typography variant="h5" fontWeight="bold">Crianças</Typography>
          <Chip label={`${children.length} cadastrada${children.length !== 1 ? "s" : ""}`} color="primary" variant="outlined" />
        </Box>
        <TextField
          fullWidth
          placeholder="Buscar por nome da criança..."
          value={searchChildren}
          onChange={(e) => setSearchChildren(e.target.value)}
          sx={{ mb: 3 }}
          InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>) }}
        />

        {filteredChildren.length > 0 ? (
          <Grid container spacing={3}>
            {filteredChildren.map((child) => (
              <Grid item xs={12} md={6} lg={4} key={child.id}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column", transition: "all 0.3s ease", "&:hover": { transform: "translateY(-4px)", boxShadow: "0 8px 25px rgba(0,0,0,0.15)" } }}>
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                        <ChildCareIcon />
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>{child.name}</Typography>
                        {child.idade && (
                          <Typography variant="caption" color="text.secondary">Idade: {child.idade}</Typography>
                        )}
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="body2" color="text.secondary">
                      Crie um plano de visita personalizado para esta criança.
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <ButtonLink
                      to={`/planos/criarplano/${child.id}`}
                      variant="contained"
                      startIcon={<VisibilityIcon />}
                      fullWidth
                      sx={{ background: "linear-gradient(45deg, #11B4D9, #308C50)", "&:hover": { background: "linear-gradient(45deg, #0ea5c7, #2a7a45)" } }}
                    >
                      Criar Plano
                    </ButtonLink>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Alert severity="info" sx={{ textAlign: "center" }}>
            Nenhuma criança encontrada com os filtros aplicados.
          </Alert>
        )}
      </Box>

      {/* Seção Gestantes */}
      <Box>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <PregnantWomanIcon color="warning" />
          <Typography variant="h5" fontWeight="bold">Gestantes</Typography>
          <Chip label={`${pregnantCaregivers.length} cadastrada${pregnantCaregivers.length !== 1 ? "s" : ""}`} color="warning" variant="outlined" />
        </Box>
        <TextField
          fullWidth
          placeholder="Buscar por nome da gestante..."
          value={searchPregnant}
          onChange={(e) => setSearchPregnant(e.target.value)}
          sx={{ mb: 3 }}
          InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon color="action" /></InputAdornment>) }}
        />

        {filteredPregnants.length > 0 ? (
          <Grid container spacing={3}>
            {filteredPregnants.map((caregiver) => (
              <Grid item xs={12} md={6} lg={4} key={caregiver.id}>
                <Card sx={{ height: "100%", display: "flex", flexDirection: "column", transition: "all 0.3s ease", "&:hover": { transform: "translateY(-4px)", boxShadow: "0 8px 25px rgba(0,0,0,0.15)" } }}>
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar sx={{ bgcolor: "warning.main", mr: 2 }}>
                        <PregnantWomanIcon />
                      </Avatar>
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>{caregiver.name}</Typography>
                        <Chip label="Gestante" color="warning" size="small" />
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="body2" color="text.secondary">
                      Crie um plano de visita personalizado para esta gestante.
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <ButtonLink
                      to={`/planos/criarplano-gravida/${caregiver.id}`}
                      variant="contained"
                      startIcon={<VisibilityIcon />}
                      fullWidth
                      sx={{ background: "linear-gradient(45deg, #FF9800, #F57C00)", "&:hover": { background: "linear-gradient(45deg, #F57C00, #E65100)" } }}
                    >
                      Criar Plano
                    </ButtonLink>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Alert severity="info" sx={{ textAlign: "center" }}>
            Nenhuma gestante encontrada com os filtros aplicados.
          </Alert>
        )}
      </Box>
    </Container>
  );
}

// Utilitário simples para usar Button como Link do react-router
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const ButtonLink = styled(({ to, href, ...props }) => {
  // decide render as Link or 'a' based on provided prop
  if (to) {
    const { Link: RouterLink } = require("react-router-dom");
    return <RouterLink to={to} {...props} />;
  }
  return <a href={href} {...props} />;
})(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.common.white,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(1.25, 2),
  borderRadius: theme.shape.borderRadius,
}));
