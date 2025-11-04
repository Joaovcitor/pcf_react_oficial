import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Typography,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Title as TitleIcon,
} from '@mui/icons-material';

export default function HeadingBlock({ data, onChange, onDelete, canDelete = true }) {
  const { level = 2, text = '' } = data;

  const handleLevelChange = (event) => {
    onChange({ ...data, level: parseInt(event.target.value) });
  };

  const handleTextChange = (event) => {
    onChange({ ...data, text: event.target.value });
  };

  const getHeadingVariant = (level) => {
    const variants = {
      1: 'h3',
      2: 'h4',
      3: 'h5',
      4: 'h6',
      5: 'subtitle1',
      6: 'subtitle2',
    };
    return variants[level] || 'h4';
  };

  return (
    <Box>
      {/* Controles */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TitleIcon color="primary" />
          <Typography variant="body2" color="text.secondary">
            Título
          </Typography>
        </Box>
        
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Nível</InputLabel>
          <Select
            value={level}
            onChange={handleLevelChange}
            label="Nível"
          >
            <MenuItem value={1}>H1 - Principal</MenuItem>
            <MenuItem value={2}>H2 - Seção</MenuItem>
            <MenuItem value={3}>H3 - Subseção</MenuItem>
            <MenuItem value={4}>H4 - Tópico</MenuItem>
            <MenuItem value={5}>H5 - Subtópico</MenuItem>
            <MenuItem value={6}>H6 - Menor</MenuItem>
          </Select>
        </FormControl>

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
        value={text}
        onChange={handleTextChange}
        placeholder={`Digite seu título H${level}...`}
        variant="outlined"
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none',
            },
          },
          '& .MuiInputBase-input': {
            fontSize: level === 1 ? '2rem' : 
                     level === 2 ? '1.75rem' :
                     level === 3 ? '1.5rem' :
                     level === 4 ? '1.25rem' :
                     level === 5 ? '1.125rem' : '1rem',
            fontWeight: 'bold',
            lineHeight: 1.2,
            padding: '8px 0',
          },
        }}
      />

      {/* Preview */}
      {text && (
        <Box sx={{ mt: 1, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Preview:
          </Typography>
          <Typography 
            variant={getHeadingVariant(level)} 
            component={`h${level}`}
            sx={{ 
              fontWeight: 'bold',
              color: 'text.primary',
              m: 0,
            }}
          >
            {text}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

HeadingBlock.propTypes = {
  data: PropTypes.shape({
    level: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  canDelete: PropTypes.bool,
};