import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Avatar,
  Container,
} from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
  People as PeopleIcon,
  VerifiedUser as VerifiedUserIcon,
  Assignment as AssignmentIcon,
  Article as ArticleIcon,
  Description as FormIcon,
  SupervisorAccount as SupervisorAccountIcon,
} from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function FerramentasSupervisores() {
  const ferramentas = [
    {
      id: 1,
      title: "Cadastrar Visitador",
      description: "Registrar novo visitador no sistema",
      icon: <PersonAddIcon sx={{ fontSize: 40 }} />,
      color: "#308C50",
      link: "/cadastrar-visitador",
    },
    {
      id: 2,
      title: "Visitadores",
      description: "Gerenciar visitadores supervisionados",
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      color: "#11B4D9",
      link: "/meus-visitadores",
    },
    {
      id: 3,
      title: "Validar Adesão",
      description: "Validar beneficiários pendentes",
      icon: <VerifiedUserIcon sx={{ fontSize: 40 }} />,
      color: "#F2D544",
      link: "/beneficiarios-pendente",
    },
    {
      id: 4,
      title: "Posts",
      description: "Criar e visualizar posts do sistema",
      icon: <ArticleIcon sx={{ fontSize: 40 }} />,
      color: "#9C27B0",
      link: "/supervisor/posts",
    },
    {
      id: 5,
      title: "Formulários",
      description: "Gerenciar formulários personalizados",
      icon: <FormIcon sx={{ fontSize: 40 }} />,
      color: "#FF5722",
      link: "/supervisor/formularios",
    },
    {
      id: 6,
      title: "Modelos de Planos",
      description: "Gerenciar modelos de planos de visitas",
      icon: <AssignmentIcon sx={{ fontSize: 40 }} />,
      color: "#308C50",
      link: "/modelos",
    },
    {
      id: 7,
      title: "Meus Cuidadores",
      description: "Listar cuidadores e suas crianças",
      icon: <SupervisorAccountIcon sx={{ fontSize: 40 }} />,
      color: "#308C50",
      link: "/supervisor/cuidadores",
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            textAlign: 'center',
            mb: 1,
            background: 'linear-gradient(45deg, #F2D544, #11B4D9)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Ferramentas do Supervisor
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            mb: 4,
          }}
        >
          Gerencie visitadores e valide beneficiários do programa
        </Typography>
      </Box>

      <Grid container spacing={3} justifyContent="center">
        {ferramentas.map((ferramenta) => (
          <Grid item xs={12} sm={6} md={4} key={ferramenta.id}>
            <Card
              component={Link}
              to={ferramenta.link}
              sx={{
                height: '100%',
                textDecoration: 'none',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 3,
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.15)',
                  '& .avatar': {
                    transform: 'scale(1.1)',
                  },
                },
              }}
            >
              <CardActionArea sx={{ height: '100%' }}>
                <CardContent
                  sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    height: '100%',
                  }}
                >
                  <Avatar
                    className="avatar"
                    sx={{
                      bgcolor: ferramenta.color,
                      width: 64,
                      height: 64,
                      mb: 2,
                      transition: 'transform 0.3s ease-in-out',
                    }}
                  >
                    {ferramenta.icon}
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      color: 'text.primary',
                    }}
                  >
                    {ferramenta.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.5,
                    }}
                  >
                    {ferramenta.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
