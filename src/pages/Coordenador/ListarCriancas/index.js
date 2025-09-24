import React, { useCallback, useEffect, useState } from "react";
import axios from "../../../services/axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  TextField,
  Button,
  Paper,
  Chip,
  Avatar,
  Breadcrumbs,
  Link,
  CircularProgress,
  Alert,
  Divider,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";

import {
  ChildCare as ChildCareIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Search as SearchIcon,
  Refresh as RefreshIcon,
  Person as PersonIcon,
  Cake as CakeIcon,
  LocationOn as LocationIcon,
  Warning as WarningIcon,
  Assignment as AssignmentIcon,
} from "@mui/icons-material";

import { StyledContainer, StyledCard, StyledTableContainer } from "./styled";

export default function ListarCriancas() {
  const history = useHistory();
  const [criancas, setCriancas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCriancas, setFilteredCriancas] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // Modal de confirmação para deletar
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    criancaId: null,
    criancaNome: "",
  });

  const fetchCriancas = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("/crianca/coordenador");
      console.log("Crianças carregadas:", response.data);
      
      if (Array.isArray(response.data)) {
        setCriancas(response.data);
        setFilteredCriancas(response.data);
      } else {
        toast.error("Formato inesperado de dados recebidos da API.");
        setCriancas([]);
        setFilteredCriancas([]);
      }
    } catch (error) {
      console.error("Erro ao buscar crianças:", error);
      toast.error("Erro ao carregar a lista de crianças.");
      setCriancas([]);
      setFilteredCriancas([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCriancas();
  }, [fetchCriancas]);

  // Filtro de busca
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCriancas(criancas);
    } else {
      const filtered = criancas.filter((crianca) =>
        crianca.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crianca.nis?.toString().includes(searchTerm) ||
        crianca.visitor?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCriancas(filtered);
    }
    setPage(0); // Reset página ao filtrar
  }, [searchTerm, criancas]);

  const handleRefresh = () => {
    setSearchTerm("");
    fetchCriancas();
  };

  const handleEdit = (criancaId) => {
    history.push(`/crianca/editar/${criancaId}`);
  };

  const handleDeleteClick = (crianca) => {
    setDeleteDialog({
      open: true,
      criancaId: crianca.id,
      criancaNome: crianca.name,
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/crianca/${deleteDialog.criancaId}`);
      toast.success("Criança deletada com sucesso!");
      
      // Remove da lista local
      const updatedCriancas = criancas.filter(
        (crianca) => crianca.id !== deleteDialog.criancaId
      );
      setCriancas(updatedCriancas);
      setFilteredCriancas(updatedCriancas);
      
      setDeleteDialog({ open: false, criancaId: null, criancaNome: "" });
    } catch (error) {
      console.error("Erro ao deletar criança:", error);
      toast.error("Erro ao deletar criança. Tente novamente.");
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, criancaId: null, criancaNome: "" });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Não informado";
    try {
      return new Date(dateString).toLocaleDateString("pt-BR");
    } catch {
      return "Data inválida";
    }
  };

  const formatNIS = (nis) => {
    if (!nis) return "Não informado";
    const nisStr = nis.toString();
    return nisStr.replace(/(\d{3})(\d{5})(\d{2})/, "$1.$2-$3");
  };

  // Dados paginados
  const paginatedCriancas = filteredCriancas.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <StyledContainer maxWidth="xl">
      {/* Breadcrumbs */}
      <Box sx={{ mb: 3 }}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            component="button"
            variant="body1"
            onClick={() => history.push("/home")}
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Home
          </Link>
          <Typography color="text.primary" sx={{ display: "flex", alignItems: "center" }}>
            <ChildCareIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Gerenciar Crianças
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* Header */}
      <StyledCard>
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                Gerenciar Crianças
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Lista completa de todas as crianças cadastradas no sistema
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: "primary.main", width: 56, height: 56 }}>
              <ChildCareIcon fontSize="large" />
            </Avatar>
          </Box>

          {/* Filtros e Ações */}
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Buscar por nome, NIS ou visitador..."
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
            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Tooltip title="Atualizar lista">
                  <IconButton onClick={handleRefresh} color="primary">
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Grid>
          </Grid>

          {/* Estatísticas */}
          <Box sx={{ mt: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Chip
              icon={<ChildCareIcon />}
              label={`Total: ${filteredCriancas.length} crianças`}
              color="primary"
              variant="outlined"
            />
            {searchTerm && (
              <Chip
                icon={<SearchIcon />}
                label={`Filtradas: ${filteredCriancas.length} de ${criancas.length}`}
                color="secondary"
                variant="outlined"
              />
            )}
          </Box>
        </CardContent>
      </StyledCard>

      {/* Tabela de Crianças */}
      <StyledCard sx={{ mt: 3 }}>
        <CardContent sx={{ p: 0 }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : filteredCriancas.length === 0 ? (
            <Box sx={{ textAlign: "center", p: 4 }}>
              <ChildCareIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                {searchTerm ? "Nenhuma criança encontrada" : "Nenhuma criança cadastrada"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {searchTerm
                  ? "Tente ajustar os termos de busca"
                  : "As crianças cadastradas aparecerão aqui"}
              </Typography>
            </Box>
          ) : (
            <>
              <StyledTableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Criança</TableCell>
                      <TableCell>NIS</TableCell>
                      <TableCell>Data de Nascimento</TableCell>
                      <TableCell>Visitador</TableCell>
                      <TableCell>Visitas Geolocalizadas</TableCell>
                      <TableCell>Localização</TableCell>
                      <TableCell align="center">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedCriancas.map((crianca) => (
                      <TableRow key={crianca.id} hover>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar sx={{ mr: 2, bgcolor: "primary.light" }}>
                              <PersonIcon />
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle2" fontWeight="medium">
                                {crianca.name || "Nome não informado"}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                ID: {crianca.id}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {formatNIS(crianca.nis)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <CakeIcon sx={{ mr: 1, fontSize: 16, color: "text.secondary" }} />
                            <Typography variant="body2">
                              {formatDate(crianca.birth_date)}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {crianca.visitor?.name || "Não atribuído"}
                          </Typography>
                          {(crianca._count?.visitPlans > 0 || crianca.visitPlans?.length > 0) && (
                            <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                              <AssignmentIcon sx={{ mr: 0.5, fontSize: 14, color: "text.secondary" }} />
                              <Typography variant="caption" color="text.secondary">
                                {crianca._count?.visitPlans || crianca.visitPlans?.length || 0} plano(s) de visita
                              </Typography>
                            </Box>
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <LocationIcon sx={{ mr: 1, fontSize: 16, color: "text.secondary" }} />
                            <Typography variant="body2" fontWeight="medium">
                              {crianca._count?.geoLocatedVisits || crianca.geoLocatedVisits?.length || 0}
                            </Typography>
                          </Box>
                          <Typography variant="caption" color="text.secondary" display="block" textAlign="center">
                            visita(s) realizada(s)
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <LocationIcon sx={{ mr: 1, fontSize: 16, color: "text.secondary" }} />
                            <Typography variant="body2">
                              {crianca.address || "Não informado"}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                            <Tooltip title="Editar criança">
                              <IconButton
                                size="small"
                                color="primary"
                                onClick={() => handleEdit(crianca.id)}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Deletar criança">
                              <IconButton
                                size="small"
                                color="error"
                                onClick={() => handleDeleteClick(crianca)}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </StyledTableContainer>

              {/* Paginação */}
              <TablePagination
                component="div"
                count={filteredCriancas.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25, 50]}
                labelRowsPerPage="Linhas por página:"
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`
                }
              />
            </>
          )}
        </CardContent>
      </StyledCard>

      {/* Modal de Confirmação para Deletar */}
      <Dialog
        open={deleteDialog.open}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title" sx={{ display: "flex", alignItems: "center" }}>
          <WarningIcon sx={{ mr: 1, color: "warning.main" }} />
          Confirmar Exclusão
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Tem certeza que deseja deletar a criança{" "}
            <strong>{deleteDialog.criancaNome}</strong>?
            <br />
            <br />
            Esta ação não pode ser desfeita e todos os dados relacionados à criança
            serão permanentemente removidos do sistema.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
}