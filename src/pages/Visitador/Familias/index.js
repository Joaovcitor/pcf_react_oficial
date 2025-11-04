import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  subYears,
  subMonths,
} from "date-fns";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
  Avatar,
  Chip,
  Paper,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  CircularProgress,
  Divider,
} from "@mui/material";
import {
  Search as SearchIcon,
  ChildCare as ChildIcon,
  PregnantWoman as PregnantIcon,
  FamilyRestroom as FamilyIcon,
  Visibility as VisibilityIcon,
  FilterList as FilterIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";

import axios from "../../../services/axios";
import { toast } from "react-toastify";

export default function Familias() {
  const [children, setFamilia] = useState([]);
  const [pregnants, setPregnants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const [childrenResponse, pregnantsResponse] = await Promise.all([
          axios.get("/crianca/"),
          axios.get("/cuidador/meus-cuidadores")
        ]);
        
        setFamilia(childrenResponse.data);
        setPregnants(pregnantsResponse.data);
      } catch (e) {
        console.log(e);
        toast.error("Ocorreu um erro ao carregar os dados!");
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  const gravidas = pregnants.filter((p) => p.pregnant === true);

  function calcularIdadeCompleta(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);

    const anos = differenceInYears(hoje, nascimento);

    const dataAjustada = subYears(hoje, anos);
    const meses = differenceInMonths(dataAjustada, nascimento);

    const dataAjustadaMeses = subMonths(dataAjustada, meses);
    const dias = differenceInDays(dataAjustadaMeses, nascimento);

    return `${anos} anos, ${meses} meses e ${dias} dias`;
  }

  function calcularIdadeAnos(dataNascimento) {
    return differenceInYears(new Date(), new Date(dataNascimento));
  }

  const filteredChildren = useMemo(() => {
    return children.filter(child => {
      const matchesSearch = child.name.toLowerCase().includes(searchTerm.toLowerCase());
      const age = calcularIdadeAnos(child.born);
      
      let matchesAge = true;
      if (ageFilter === "0-2") matchesAge = age <= 2;
      else if (ageFilter === "3-5") matchesAge = age >= 3 && age <= 5;
      else if (ageFilter === "6+") matchesAge = age >= 6;
      
      return matchesSearch && matchesAge;
    });
  }, [children, searchTerm, ageFilter]);

  const filteredPregnants = useMemo(() => {
    return gravidas.filter(pregnant => 
      pregnant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [gravidas, searchTerm]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setAgeFilter("");
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getAvatarColor = (name) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress size={60} />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header com Estatísticas */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ 
          fontWeight: 'bold', 
          color: '#1976d2',
          textAlign: 'center',
          mb: 3
        }}>
          <FamilyIcon sx={{ mr: 2, fontSize: 40, verticalAlign: 'middle' }} />
          Gestão de Famílias
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center', bgcolor: '#e3f2fd' }}>
              <ChildIcon sx={{ fontSize: 40, color: '#1976d2', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                {children.length}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Total de Crianças
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center', bgcolor: '#fce4ec' }}>
              <PregnantIcon sx={{ fontSize: 40, color: '#e91e63', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#e91e63' }}>
                {gravidas.length}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Gestantes
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center', bgcolor: '#e8f5e8' }}>
              <FamilyIcon sx={{ fontSize: 40, color: '#4caf50', mb: 1 }} />
              <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#4caf50' }}>
                {children.length + gravidas.length}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Total de Famílias
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Filtros e Busca */}
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Buscar por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <FormControl fullWidth>
              <InputLabel>Filtrar por Idade</InputLabel>
              <Select
                value={ageFilter}
                label="Filtrar por Idade"
                onChange={(e) => setAgeFilter(e.target.value)}
                startAdornment={<FilterIcon sx={{ mr: 1 }} />}
              >
                <MenuItem value="">Todas as idades</MenuItem>
                <MenuItem value="0-2">0-2 anos</MenuItem>
                <MenuItem value="3-5">3-5 anos</MenuItem>
                <MenuItem value="6+">6+ anos</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2} md={2}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleClearFilters}
              startIcon={<ClearIcon />}
              sx={{ height: '56px' }}
            >
              Limpar
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs para alternar entre Crianças e Gestantes */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab 
            label={`Crianças (${filteredChildren.length})`} 
            icon={<ChildIcon />}
            iconPosition="start"
          />
          <Tab 
            label={`Gestantes (${filteredPregnants.length})`} 
            icon={<PregnantIcon />}
            iconPosition="start"
          />
        </Tabs>
      </Box>

      {/* Conteúdo das Tabs */}
      {tabValue === 0 && (
        <Box>
          {filteredChildren.length === 0 ? (
            <Paper elevation={1} sx={{ p: 4, textAlign: 'center' }}>
              <ChildIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                {searchTerm || ageFilter ? 'Nenhuma criança encontrada com os filtros aplicados' : 'Nenhuma criança cadastrada'}
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {filteredChildren.map((child) => (
                <Grid item xs={12} sm={6} md={4} key={child.id}>
                  <Card elevation={3} sx={{ 
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6
                    }
                  }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar 
                          sx={{ 
                            bgcolor: getAvatarColor(child.name),
                            width: 50,
                            height: 50,
                            mr: 2,
                            fontSize: '1.2rem',
                            fontWeight: 'bold'
                          }}
                        >
                          {child.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                            {child.name}
                          </Typography>
                          <Chip 
                            label="Criança" 
                            size="small" 
                            color="primary"
                            icon={<ChildIcon />}
                          />
                        </Box>
                      </Box>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        <strong>Idade:</strong> {calcularIdadeCompleta(child.born)}
                      </Typography>
                      
                      <Box sx={{ mt: 3 }}>
                        <Button
                          component={Link}
                          to={`/formularios/${child.id}`}
                          variant="contained"
                          fullWidth
                          startIcon={<VisibilityIcon />}
                          sx={{
                            bgcolor: '#1976d2',
                            '&:hover': {
                              bgcolor: '#1565c0',
                            }
                          }}
                        >
                          Acessar Formulários
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}

      {tabValue === 1 && (
        <Box>
          {filteredPregnants.length === 0 ? (
            <Paper elevation={1} sx={{ p: 4, textAlign: 'center' }}>
              <PregnantIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                {searchTerm ? 'Nenhuma gestante encontrada com os filtros aplicados' : 'Nenhuma gestante cadastrada'}
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {filteredPregnants.map((pregnant) => (
                <Grid item xs={12} sm={6} md={4} key={pregnant.id}>
                  <Card elevation={3} sx={{ 
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6
                    }
                  }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar 
                          sx={{ 
                            bgcolor: getAvatarColor(pregnant.name),
                            width: 50,
                            height: 50,
                            mr: 2,
                            fontSize: '1.2rem',
                            fontWeight: 'bold'
                          }}
                        >
                          {pregnant.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                            {pregnant.name}
                          </Typography>
                          <Chip 
                            label="Gestante" 
                            size="small" 
                            color="secondary"
                            icon={<PregnantIcon />}
                          />
                        </Box>
                      </Box>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        <strong>Idade:</strong> {calcularIdadeCompleta(pregnant.born)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        <strong>Semanas de Gestação:</strong> {pregnant.week_pregnant}
                      </Typography>
                      
                      <Box sx={{ mt: 3 }}>
                        <Button
                          component={Link}
                          to={`/formularios/gravidas/${pregnant.id}`}
                          variant="contained"
                          fullWidth
                          startIcon={<VisibilityIcon />}
                          sx={{
                            bgcolor: '#e91e63',
                            '&:hover': {
                              bgcolor: '#c2185b',
                            }
                          }}
                        >
                          Acessar Formulários
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}
    </Container>
  );
}
