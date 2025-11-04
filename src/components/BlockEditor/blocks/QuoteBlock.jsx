import React from 'react';
import PropTypes from 'prop-types';
import { TextField, IconButton, Box, Typography, Paper } from '@mui/material';
import {
  Delete as DeleteIcon,
  FormatQuote as QuoteIcon,
} from '@mui/icons-material';

export default function QuoteBlock({ data, onChange, onDelete, canDelete = true }) {
  const { text = '', author = '' } = data;

  const handleTextChange = (event) => {
    onChange({ ...data, text: event.target.value });
  };

  const handleAuthorChange = (event) => {
    onChange({ ...data, author: event.target.value });
  };

  return (
    <Box>
      {/* Controles */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <QuoteIcon color="primary" />
          <Typography variant="body2" color="text.secondary">
            Citação
          </Typography>
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
        <TextField
          fullWidth
          multiline
          minRows={3}
          label="Texto da Citação"
          value={text}
          onChange={handleTextChange}
          placeholder="Digite a citação aqui..."
          variant="outlined"
          sx={{
            '& .MuiInputBase-input': {
              fontSize: '1.1rem',
              lineHeight: 1.6,
              fontStyle: 'italic',
            },
          }}
        />

        <TextField
          fullWidth
          label="Autor (opcional)"
          value={author}
          onChange={handleAuthorChange}
          placeholder="Nome do autor..."
          variant="outlined"
        />
      </Box>

      {/* Preview da Citação */}
      {text && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Preview:
          </Typography>
          
          <Paper
            sx={{
              p: 3,
              bgcolor: 'grey.50',
              borderLeft: '4px solid',
              borderLeftColor: 'primary.main',
              position: 'relative',
            }}
          >
            {/* Ícone de aspas */}
            <QuoteIcon
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                fontSize: 24,
                color: 'primary.main',
                opacity: 0.3,
              }}
            />

            {/* Texto da citação */}
            <Typography
              variant="body1"
              sx={{
                fontStyle: 'italic',
                fontSize: '1.1rem',
                lineHeight: 1.6,
                color: 'text.primary',
                pl: 2,
                whiteSpace: 'pre-wrap',
              }}
            >
              &ldquo;{text}&rdquo;
            </Typography>

            {/* Autor */}
            {author && (
              <Typography
                variant="body2"
                sx={{
                  mt: 2,
                  textAlign: 'right',
                  color: 'text.secondary',
                  fontWeight: 'medium',
                }}
              >
                — {author}
              </Typography>
            )}
          </Paper>
        </Box>
      )}

      {/* Placeholder quando não há texto */}
      {!text && (
        <Box 
          sx={{ 
            mt: 2,
            p: 3,
            border: '2px dashed',
            borderColor: 'divider',
            borderRadius: 2,
            textAlign: 'center',
            bgcolor: 'grey.50',
          }}
        >
          <QuoteIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
          <Typography variant="body2" color="text.secondary">
            Adicione uma citação inspiradora
          </Typography>
        </Box>
      )}
    </Box>
  );
}

QuoteBlock.propTypes = {
  data: PropTypes.shape({
    text: PropTypes.string.isRequired,
    author: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  canDelete: PropTypes.bool,
};