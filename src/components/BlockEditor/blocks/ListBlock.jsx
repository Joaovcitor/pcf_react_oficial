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
  Button,
  Paper,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  List as ListIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material';

export default function ListBlock({ data, onChange, onDelete, canDelete = true }) {
  const { style = 'unordered', items = [''] } = data;

  const handleStyleChange = (event) => {
    onChange({ ...data, style: event.target.value });
  };

  const handleItemChange = (index, value) => {
    const newItems = [...items];
    newItems[index] = value;
    onChange({ ...data, items: newItems });
  };

  const addItem = () => {
    const newItems = [...items, ''];
    onChange({ ...data, items: newItems });
  };

  const removeItem = (index) => {
    if (items.length <= 1) return; // Manter pelo menos um item
    const newItems = items.filter((_, i) => i !== index);
    onChange({ ...data, items: newItems });
  };

  const getListMarker = (index, style) => {
    if (style === 'ordered') {
      return `${index + 1}.`;
    }
    return '•';
  };

  return (
    <Box>
      {/* Controles */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ListIcon color="primary" />
          <Typography variant="body2" color="text.secondary">
            Lista
          </Typography>
        </Box>
        
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Tipo</InputLabel>
          <Select
            value={style}
            onChange={handleStyleChange}
            label="Tipo"
          >
            <MenuItem value="unordered">Com Marcadores</MenuItem>
            <MenuItem value="ordered">Numerada</MenuItem>
          </Select>
        </FormControl>

        <Button
          size="small"
          startIcon={<AddIcon />}
          onClick={addItem}
          variant="outlined"
        >
          Adicionar Item
        </Button>

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

      {/* Itens da Lista */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {items.map((item, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
            <Typography
              variant="body2"
              sx={{
                minWidth: '24px',
                pt: 1.5,
                color: 'text.secondary',
                fontWeight: 'bold',
              }}
            >
              {getListMarker(index, style)}
            </Typography>
            
            <TextField
              fullWidth
              multiline
              value={item}
              onChange={(e) => handleItemChange(index, e.target.value)}
              placeholder={`Item ${index + 1}...`}
              variant="outlined"
              size="small"
              sx={{
                '& .MuiInputBase-input': {
                  fontSize: '1rem',
                  lineHeight: 1.5,
                },
              }}
            />

            {items.length > 1 && (
              <IconButton
                size="small"
                onClick={() => removeItem(index)}
                color="error"
                sx={{ 
                  mt: 0.5,
                  opacity: 0.7, 
                  '&:hover': { opacity: 1 } 
                }}
              >
                <RemoveIcon />
              </IconButton>
            )}
          </Box>
        ))}
      </Box>

      {/* Preview da Lista */}
      {items.some(item => item.trim()) && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            Preview:
          </Typography>
          
          <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
            <Box
              component={style === 'ordered' ? 'ol' : 'ul'}
              sx={{
                m: 0,
                pl: style === 'ordered' ? 2 : 2,
                '& li': {
                  mb: 0.5,
                  lineHeight: 1.6,
                },
                '& li:last-child': {
                  mb: 0,
                },
              }}
            >
              {items
                .filter(item => item.trim())
                .map((item, index) => (
                  <li key={index}>
                    <Typography variant="body1" component="span">
                      {item}
                    </Typography>
                  </li>
                ))}
            </Box>
          </Paper>
        </Box>
      )}

      {/* Placeholder quando não há itens */}
      {!items.some(item => item.trim()) && (
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
          <ListIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
          <Typography variant="body2" color="text.secondary">
            Adicione itens à sua lista {style === 'ordered' ? 'numerada' : 'com marcadores'}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

ListBlock.propTypes = {
  data: PropTypes.shape({
    style: PropTypes.oneOf(['ordered', 'unordered']).isRequired,
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  canDelete: PropTypes.bool,
};