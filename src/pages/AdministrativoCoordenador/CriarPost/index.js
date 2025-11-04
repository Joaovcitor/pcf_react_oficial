import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Breadcrumbs,
  Link,
  CircularProgress,
  Alert,
  Grid,
  Divider,
  Avatar
} from '@mui/material';
import {
  Create as CreateIcon,
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Article as ArticleIcon,
  AdminPanelSettings as AdminIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import axios from '../../../services/axios';
import BlockEditor from '../../../components/BlockEditor';

export default function CriarPost() {
  const [title, setTitle] = useState('');
  const [blocks, setBlocks] = useState([
    {
      id: 'block-1',
      type: 'paragraph',
      data: { text: '' }
    }
  ]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error('Título é obrigatório');
      return;
    }
    
    // Verificar se há pelo menos um bloco com conteúdo
    const hasContent = blocks.some(block => {
      switch (block.type) {
        case 'heading':
          return block.data.text && block.data.text.trim();
        case 'paragraph':
          return block.data.text && block.data.text.trim();
        case 'image':
          return block.data.url && block.data.url.trim();
        case 'code':
          return block.data.code && block.data.code.trim();
        case 'quote':
          return block.data.text && block.data.text.trim();
        case 'list':
          return block.data.items && block.data.items.some(item => item.trim());
        default:
          return false;
      }
    });

    if (!hasContent) {
      toast.error('Adicione pelo menos um bloco com conteúdo');
      return;
    }

    setLoading(true);
    
    try {
      const postData = {
        title: title.trim(),
        content: blocks
      };

      await axios.post('/post', postData);
      toast.success('Post criado com sucesso!');
      history.push('/coordenador/posts');
    } catch (error) {
      console.error('Erro ao criar post:', error);
      toast.error('Erro ao criar post. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    history.goBack();
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
          <Link
            color="inherit"
            href="/coordenador/posts"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <ArticleIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Posts
          </Link>
          <Typography
            color="text.primary"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <CreateIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Criar Post
          </Typography>
        </Breadcrumbs>
      </Box>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
            <AdminIcon />
          </Avatar>
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              Criar Novo Post
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Compartilhe comunicados e informações importantes com toda a equipe usando blocos de conteúdo
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                    <CreateIcon sx={{ mr: 1 }} />
                    Informações do Post
                  </Typography>
                  
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                      Título do Post *
                    </Typography>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Digite o título do post..."
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontFamily: 'inherit',
                        outline: 'none',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#1976d2'}
                      onBlur={(e) => e.target.style.borderColor = '#ddd'}
                    />
                  </Box>

                  <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 'bold' }}>
                    Conteúdo do Post *
                  </Typography>
                  
                  <BlockEditor
                    blocks={blocks}
                    onChange={setBlocks}
                  />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  startIcon={<ArrowBackIcon />}
                  disabled={loading}
                >
                  Voltar
                </Button>
                
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                  disabled={loading}
                  sx={{
                    background: 'linear-gradient(45deg, #FF6B6B 30%, #FF8E53 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #FF5252 30%, #FF7043 90%)',
                    }
                  }}
                >
                  {loading ? 'Criando...' : 'Criar Post'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>

        {loading && (
          <Box sx={{ mt: 2 }}>
            <Alert severity="info">
              Criando post... Por favor, aguarde.
            </Alert>
          </Box>
        )}
      </Paper>
    </Container>
  );
}