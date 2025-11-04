import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardContent,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  IconButton,
  Typography,
  Box,
  Chip,
  Button,
  Collapse,
  Divider,
  Alert
} from '@mui/material';
import {
  Delete as DeleteIcon,
  DragIndicator as DragIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Visibility as PreviewIcon
} from '@mui/icons-material';

export default function FormFieldEditor({ campo, index, tiposCampos, onUpdate, onRemove }) {
  const [expanded, setExpanded] = useState(false);
  const [novaOpcao, setNovaOpcao] = useState('');

  const handleChange = (propriedade, valor) => {
    onUpdate(campo.id, propriedade, valor);
  };

  const adicionarOpcao = () => {
    if (novaOpcao.trim()) {
      const novasOpcoes = [...(campo.options || []), novaOpcao.trim()];
      handleChange('options', novasOpcoes);
      setNovaOpcao('');
    }
  };

  const removerOpcao = (index) => {
    const novasOpcoes = campo.options.filter((_, i) => i !== index);
    handleChange('options', novasOpcoes);
  };

  const precisaOpcoes = ['select', 'radio', 'checkbox'].includes(campo.type);

  const renderPreview = () => {
    const commonProps = {
      label: campo.label || 'Campo sem título',
      placeholder: campo.placeholder,
      required: campo.required,
      disabled: true,
      size: 'small'
    };

    switch (campo.type) {
      case 'textarea':
        return (
          <TextField
            {...commonProps}
            multiline
            rows={3}
            fullWidth
          />
        );
      
      case 'select':
        return (
          <FormControl fullWidth size="small">
            <InputLabel>{campo.label || 'Campo sem título'}</InputLabel>
            <Select
              value=""
              label={campo.label || 'Campo sem título'}
              disabled
            >
              {(campo.options || []).map((opcao, idx) => (
                <MenuItem key={idx} value={opcao}>
                  {opcao}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      
      case 'radio':
        return (
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {campo.label || 'Campo sem título'}
            </Typography>
            {(campo.options || []).map((opcao, idx) => (
              <FormControlLabel
                key={idx}
                control={<input type="radio" disabled />}
                label={opcao}
                disabled
              />
            ))}
          </Box>
        );
      
      case 'checkbox':
        return (
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {campo.label || 'Campo sem título'}
            </Typography>
            {(campo.options || []).map((opcao, idx) => (
              <FormControlLabel
                key={idx}
                control={<input type="checkbox" disabled />}
                label={opcao}
                disabled
              />
            ))}
          </Box>
        );
      
      case 'range':
        return (
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {campo.label || 'Campo sem título'}
            </Typography>
            <input
              type="range"
              disabled
              style={{ width: '100%' }}
              min={campo.validation?.min || 0}
              max={campo.validation?.max || 100}
            />
          </Box>
        );
      
      case 'color':
        return (
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {campo.label || 'Campo sem título'}
            </Typography>
            <input
              type="color"
              disabled
              style={{ width: '50px', height: '40px', border: 'none' }}
            />
          </Box>
        );
      
      case 'file':
        return (
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {campo.label || 'Campo sem título'}
            </Typography>
            <Button variant="outlined" disabled size="small">
              Escolher arquivo
            </Button>
          </Box>
        );
      
      default:
        return (
          <TextField
            {...commonProps}
            type={campo.type}
            fullWidth
          />
        );
    }
  };

  return (
    <Card variant="outlined" sx={{ position: 'relative' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton size="small" sx={{ cursor: 'grab' }}>
              <DragIcon />
            </IconButton>
            <Typography variant="h6" component="div">
              Campo {index + 1}
            </Typography>
            <Chip 
              label={tiposCampos.find(t => t.value === campo.type)?.label || campo.type}
              size="small"
              color="primary"
              variant="outlined"
            />
            {campo.required && (
              <Chip label="Obrigatório" size="small" color="error" variant="outlined" />
            )}
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              size="small"
              onClick={() => setExpanded(!expanded)}
              color="primary"
            >
              {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
            <IconButton
              size="small"
              onClick={() => onRemove(campo.id)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Rótulo do Campo"
              value={campo.label}
              onChange={(e) => handleChange('label', e.target.value)}
              required
              size="small"
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <FormControl fullWidth size="small">
              <InputLabel>Tipo do Campo</InputLabel>
              <Select
                value={campo.type}
                label="Tipo do Campo"
                onChange={(e) => handleChange('type', e.target.value)}
              >
                {tiposCampos.map((tipo) => (
                  <MenuItem key={tipo.value} value={tipo.value}>
                    {tipo.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Collapse in={expanded}>
          <Box sx={{ mt: 3 }}>
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Placeholder"
                  value={campo.placeholder || ''}
                  onChange={(e) => handleChange('placeholder', e.target.value)}
                  size="small"
                  helperText="Texto de exemplo que aparece no campo"
                />
              </Grid>
              
              <Grid item xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={campo.required || false}
                      onChange={(e) => handleChange('required', e.target.checked)}
                    />
                  }
                  label="Campo obrigatório"
                />
              </Grid>

              {/* Validações específicas por tipo */}
              {(campo.type === 'number' || campo.type === 'range') && (
                <>
                  <Grid item xs={6} md={3}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Valor Mínimo"
                      value={campo.validation?.min || ''}
                      onChange={(e) => handleChange('validation', { 
                        ...campo.validation, 
                        min: e.target.value ? parseInt(e.target.value) : undefined 
                      })}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Valor Máximo"
                      value={campo.validation?.max || ''}
                      onChange={(e) => handleChange('validation', { 
                        ...campo.validation, 
                        max: e.target.value ? parseInt(e.target.value) : undefined 
                      })}
                      size="small"
                    />
                  </Grid>
                </>
              )}

              {(campo.type === 'text' || campo.type === 'textarea') && (
                <>
                  <Grid item xs={6} md={3}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Mín. Caracteres"
                      value={campo.validation?.minLength || ''}
                      onChange={(e) => handleChange('validation', { 
                        ...campo.validation, 
                        minLength: e.target.value ? parseInt(e.target.value) : undefined 
                      })}
                      size="small"
                    />
                  </Grid>
                  <Grid item xs={6} md={3}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Máx. Caracteres"
                      value={campo.validation?.maxLength || ''}
                      onChange={(e) => handleChange('validation', { 
                        ...campo.validation, 
                        maxLength: e.target.value ? parseInt(e.target.value) : undefined 
                      })}
                      size="small"
                    />
                  </Grid>
                </>
              )}

              {/* Opções para select, radio, checkbox */}
              {precisaOpcoes && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Opções do Campo
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
                    <TextField
                      size="small"
                      label="Nova opção"
                      value={novaOpcao}
                      onChange={(e) => setNovaOpcao(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          adicionarOpcao();
                        }
                      }}
                      sx={{ flexGrow: 1 }}
                    />
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={adicionarOpcao}
                      disabled={!novaOpcao.trim()}
                      size="small"
                    >
                      Adicionar
                    </Button>
                  </Box>

                  {(!campo.options || campo.options.length === 0) ? (
                    <Alert severity="warning" size="small">
                      Este tipo de campo precisa de pelo menos uma opção.
                    </Alert>
                  ) : (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {campo.options.map((opcao, idx) => (
                        <Chip
                          key={idx}
                          label={opcao}
                          onDelete={() => removerOpcao(idx)}
                          deleteIcon={<RemoveIcon />}
                          variant="outlined"
                          size="small"
                        />
                      ))}
                    </Box>
                  )}
                </Grid>
              )}

              {/* Preview do campo */}
              <Grid item xs={12}>
                <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <PreviewIcon fontSize="small" />
                  Pré-visualização
                </Typography>
                <Box sx={{ p: 2, bgcolor: 'grey.50', borderRadius: 1, border: '1px dashed', borderColor: 'grey.300' }}>
                  {renderPreview()}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
}

FormFieldEditor.propTypes = {
  campo: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.string),
    validation: PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number,
      minLength: PropTypes.number,
      maxLength: PropTypes.number
    }),
    order: PropTypes.number
  }).isRequired,
  index: PropTypes.number.isRequired,
  tiposCampos: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};