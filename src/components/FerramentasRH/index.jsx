import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  Fade,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function FerramentasRH() {
  const ferramentas = [
    {
      id: 1,
      title: "Dashboard RH",
      description: "Visualize todos os funcionários e gerencie faltas",
      icon: <DashboardIcon sx={{ fontSize: 40 }} />,
      color: "#2196f3",
      link: "/rh/dashboard",
      primary: true,
    },
    {
      id: 2,
      title: "Gerenciar Usuários",
      description: "Acesse a lista completa de funcionários",
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      color: "#4caf50",
      link: "/rh/dashboard",
    },
    {
      id: 3,
      title: "Registrar Faltas",
      description: "Registre faltas para os funcionários",
      icon: <WarningIcon sx={{ fontSize: 40 }} />,
      color: "#ff9800",
      link: "/rh/dashboard",
    },
  ];

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          mb: 3,
          color: "text.primary",
        }}
      >
        Ferramentas de Recursos Humanos
      </Typography>

      <Grid container spacing={3}>
        {ferramentas.map((ferramenta, index) => (
          <Grid item xs={12} sm={6} md={4} key={ferramenta.id}>
            <Fade in={true} timeout={600 + index * 200}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease-in-out",
                  cursor: "pointer",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0px 12px 40px rgba(0, 0, 0, 0.15)",
                  },
                  border: ferramenta.primary ? `2px solid ${ferramenta.color}` : "1px solid rgba(0, 0, 0, 0.12)",
                  borderRadius: 3,
                  background: ferramenta.primary 
                    ? `linear-gradient(135deg, ${ferramenta.color}15, ${ferramenta.color}05)`
                    : "white",
                }}
              >
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    p: 3,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: ferramenta.color,
                        width: 56,
                        height: 56,
                        mr: 2,
                      }}
                    >
                      {ferramenta.icon}
                    </Avatar>
                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          color: "text.primary",
                          mb: 0.5,
                        }}
                      >
                        {ferramenta.title}
                      </Typography>
                    </Box>
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      mb: 3,
                      flexGrow: 1,
                      lineHeight: 1.6,
                    }}
                  >
                    {ferramenta.description}
                  </Typography>

                  <Button
                    component={Link}
                    to={ferramenta.link}
                    variant={ferramenta.primary ? "contained" : "outlined"}
                    fullWidth
                    sx={{
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 600,
                      py: 1.5,
                      backgroundColor: ferramenta.primary ? ferramenta.color : "transparent",
                      borderColor: ferramenta.color,
                      color: ferramenta.primary ? "white" : ferramenta.color,
                      "&:hover": {
                        backgroundColor: ferramenta.color,
                        color: "white",
                        transform: "scale(1.02)",
                      },
                    }}
                  >
                    Acessar
                  </Button>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>

      {/* Informações Adicionais */}
      <Box
        sx={{
          mt: 4,
          p: 3,
          bgcolor: "rgba(33, 150, 243, 0.05)",
          borderRadius: 2,
          border: "1px solid rgba(33, 150, 243, 0.2)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "#2196f3",
            mb: 1,
          }}
        >
          Recursos Humanos - Sistema PCF
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            lineHeight: 1.6,
          }}
        >
          Como usuário do RH, você tem acesso ao dashboard para visualizar todos os funcionários 
          do sistema e registrar faltas quando necessário. Use as ferramentas acima para gerenciar 
          eficientemente os recursos humanos do Programa Criança Feliz.
        </Typography>
      </Box>
    </Box>
  );
}