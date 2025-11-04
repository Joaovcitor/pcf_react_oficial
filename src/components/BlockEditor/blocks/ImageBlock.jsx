import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Button,
  Card,
  CardMedia,
  Alert,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Image as ImageIcon,
  CloudUpload as UploadIcon,
  Link as LinkIcon,
} from '@mui/icons-material';

export default function ImageBlock({ data, onChange, onDelete, canDelete = true }) {
  const { url = '', caption = '', alt = '' } = data;
  const [uploadMode, setUploadMode] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleUrlChange = (event) => {
    const newUrl = event.target.value;
    onChange({ ...data, url: newUrl });
    setImageError(false);
  };

  const handleCaptionChange = (event) => {
    onChange({ ...data, caption: event.target.value });
  };

  const handleAltChange = (event) => {
    onChange({ ...data, alt: event.target.value });
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageError(false);
  };

  return (
    <Box>
      {/* Controles */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ImageIcon color="primary" />
          <Typography variant="body2" color="text.secondary">
            Imagem
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            size="small"
            variant={!uploadMode ? "contained" : "outlined"}
            startIcon={<LinkIcon />}
            onClick={() => setUploadMode(false)}
          >
            URL
          </Button>
          <Button
            size="small"
            variant={uploadMode ? "contained" : "outlined"}
            startIcon={<UploadIcon />}
            onClick={() => setUploadMode(true)}
            disabled
            title="Upload será implementado futuramente"
          >
            Upload
          </Button>
        </Box>

        <Box sx={{ ml: 'auto' }}>
          {canDelete && (
            <IconButton
              onClick={onDelete}
              size="small"
              color="error"
              sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      </Box>

      {/* Campos de Entrada */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {!uploadMode && (
          <TextField
            fullWidth
            label="URL da Imagem"
            value={url}
            onChange={handleUrlChange}
            placeholder="https://exemplo.com/imagem.jpg"
            variant="outlined"
            error={imageError}
            helperText={imageError ? "Erro ao carregar a imagem. Verifique a URL." : "Cole o link da imagem aqui"}
          />
        )}

        <TextField
          fullWidth
          label="Legenda (opcional)"
          value={caption}
          onChange={handleCaptionChange}
          placeholder="Descrição da imagem..."
          variant="outlined"
        />

        <TextField
          fullWidth
          label="Texto Alternativo"
          value={alt}
          onChange={handleAltChange}
          placeholder="Descrição para acessibilidade..."
          variant="outlined"
          helperText="Importante para acessibilidade e SEO"
        />
      </Box>

      {/* Preview da Imagem */}
      {url && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Preview:
          </Typography>
          
          {imageError ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              Não foi possível carregar a imagem. Verifique se a URL está correta e acessível.
            </Alert>
          ) : (
            <Card sx={{ maxWidth: '100%' }}>
              <CardMedia
                component="img"
                image={url}
                alt={alt || caption || 'Imagem do post'}
                onError={handleImageError}
                onLoad={handleImageLoad}
                sx={{
                  maxHeight: 400,
                  objectFit: 'contain',
                  bgcolor: 'grey.100',
                }}
              />
              {caption && (
                <Box sx={{ p: 2, bgcolor: 'grey.50' }}>
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ fontStyle: 'italic' }}
                  >
                    {caption}
                  </Typography>
                </Box>
              )}
            </Card>
          )}
        </Box>
      )}

      {/* Placeholder quando não há URL */}
      {!url && (
        <Box 
          sx={{ 
            mt: 2,
            p: 4,
            border: '2px dashed',
            borderColor: 'divider',
            borderRadius: 2,
            textAlign: 'center',
            bgcolor: 'grey.50',
          }}
        >
          <ImageIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
          <Typography variant="body2" color="text.secondary">
            Adicione uma URL de imagem para ver o preview
          </Typography>
        </Box>
      )}
    </Box>
  );
}

ImageBlock.propTypes = {
  data: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string,
    caption: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  canDelete: PropTypes.bool,
};