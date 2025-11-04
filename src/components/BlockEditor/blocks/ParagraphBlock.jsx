import React from 'react';
import PropTypes from 'prop-types';
import { TextField, IconButton, Box, Typography } from '@mui/material';
import {
  Delete as DeleteIcon,
  TextFields as TextIcon,
} from '@mui/icons-material';

export default function ParagraphBlock({ data, onChange, onDelete, canDelete = true }) {
  const { text = '' } = data;

  const handleTextChange = (event) => {
    onChange({ ...data, text: event.target.value });
  };

  return (
    <Box>
      {/* Controles */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextIcon color="primary" />
          <Typography variant="body2" color="text.secondary">
            Parágrafo
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

      {/* Campo de Texto */}
      <TextField
        fullWidth
        multiline
        minRows={3}
        value={text}
        onChange={handleTextChange}
        placeholder="Digite seu texto aqui..."
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'divider',
            },
            '&:hover fieldset': {
              borderColor: 'primary.main',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
            },
          },
          '& .MuiInputBase-input': {
            fontSize: '1rem',
            lineHeight: 1.6,
          },
        }}
      />

      {/* Preview */}
      {text && (
        <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Preview:
          </Typography>
          <Typography 
            variant="body1"
            sx={{ 
              color: 'text.primary',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
            }}
          >
            {text}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

ParagraphBlock.propTypes = {
  data: PropTypes.shape({
    text: PropTypes.string.isRequired,
    author: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  canDelete: PropTypes.bool,
};