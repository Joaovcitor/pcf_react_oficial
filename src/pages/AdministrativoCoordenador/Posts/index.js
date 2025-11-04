import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Breadcrumbs,
  Link,
  CircularProgress,
  Alert,
  Grid,
  Divider,
  Chip,
  Avatar,
  IconButton,
  Skeleton,
  Button,
  Fab
} from '@mui/material';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Article as ArticleIcon,
  Person as PersonIcon,
  AccessTime as TimeIcon,
  Refresh as RefreshIcon,
  Add as AddIcon,
  AdminPanelSettings as AdminIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import axios from '../../../services/axios';
import PostRenderer from '../../../components/PostRenderer';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('/post');
      setPosts(response.data);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
      setError('Erro ao carregar posts. Tente novamente.');
      toast.error('Erro ao carregar posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getAuthorRole = (author) => {
    if (author?.role === 'coordinator') return 'Coordenador';
    if (author?.role === 'supervisor') return 'Supervisor';
    return 'Usuário';
  };

  const getAuthorColor = (author) => {
    if (author?.role === 'coordinator') return 'secondary';
    if (author?.role === 'supervisor') return 'primary';
    return 'default';
  };

  const handleCreatePost = () => {
    history.push('/coordenador/criar-post');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link
            color="inherit"
            href="/"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Início
          </Link>
          <Typography
            color="text.primary"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <ArticleIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Posts
          </Typography>
        </Breadcrumbs>
      </Box>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
              <AdminIcon />
            </Avatar>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                Posts e Comunicados
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Gerencie comunicados e informações para toda a equipe
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton 
              onClick={fetchPosts} 
              disabled={loading}
              sx={{ bgcolor: 'action.hover' }}
            >
              <RefreshIcon />
            </IconButton>
            
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreatePost}
              sx={{
                background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #FF5252 30%, #FF7043 90%)',
                }
              }}
            >
              Criar Post
            </Button>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {loading && (
          <Grid container spacing={3}>
            {[1, 2, 3].map((item) => (
              <Grid item xs={12} key={item}>
                <Card variant="outlined">
                  <CardContent>
                    <Skeleton variant="text" width="60%" height={32} />
                    <Skeleton variant="text" width="30%" height={20} sx={{ mb: 2 }} />
                    <Skeleton variant="rectangular" height={100} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {!loading && !error && posts.length === 0 && (
          <Alert severity="info">
            Nenhum post encontrado. Clique em &ldquo;Criar Post&rdquo; para adicionar o primeiro comunicado.
          </Alert>
        )}

        {!loading && !error && posts.length > 0 && (
          <Grid container spacing={3}>
            {posts.map((post) => (
              <Grid item xs={12} key={post.id}>
                <Card 
                  variant="outlined" 
                  sx={{ 
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: 3,
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h5" component="h2" gutterBottom>
                        {post.title}
                      </Typography>
                      
                      <Chip
                        label={getAuthorRole(post.author)}
                        color={getAuthorColor(post.author)}
                        size="small"
                        icon={<PersonIcon />}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
                      <PersonIcon sx={{ mr: 1, fontSize: 16 }} />
                      <Typography variant="body2" sx={{ mr: 2 }}>
                        {post.author?.name || 'Autor não identificado'}
                      </Typography>
                      
                      <TimeIcon sx={{ mr: 1, fontSize: 16 }} />
                      <Typography variant="body2">
                        {formatDate(post.createdAt)}
                      </Typography>
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    <PostRenderer content={post.content} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>

      {/* Floating Action Button para criar post */}
      <Fab
        color="secondary"
        aria-label="criar post"
        onClick={handleCreatePost}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #FF5252 30%, #FF7043 90%)',
          }
        }}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
}