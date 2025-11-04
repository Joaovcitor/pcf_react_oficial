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
  Paper,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Code as CodeIcon,
  ContentCopy as CopyIcon,
} from '@mui/icons-material';

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'cpp', label: 'C++' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'sql', label: 'SQL' },
  { value: 'json', label: 'JSON' },
  { value: 'xml', label: 'XML' },
  { value: 'bash', label: 'Bash' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'go', label: 'Go' },
  { value: 'rust', label: 'Rust' },
  { value: 'swift', label: 'Swift' },
  { value: 'kotlin', label: 'Kotlin' },
  { value: 'dart', label: 'Dart' },
  { value: 'plaintext', label: 'Texto Simples' },
];

export default function CodeBlock({ data, onChange, onDelete, canDelete = true }) {
  const { language = 'javascript', code = '' } = data;

  const handleLanguageChange = (event) => {
    onChange({ ...data, language: event.target.value });
  };

  const handleCodeChange = (event) => {
    onChange({ ...data, code: event.target.value });
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      // Aqui você poderia adicionar um toast de sucesso
    } catch (err) {
      console.error('Erro ao copiar código:', err);
    }
  };

  const getLanguageLabel = (lang) => {
    const found = LANGUAGES.find(l => l.value === lang);
    return found ? found.label : lang;
  };

  return (
    <Box>
      {/* Controles */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CodeIcon color="primary" />
          <Typography variant="body2" color="text.secondary">
            Código
          </Typography>
        </Box>
        
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Linguagem</InputLabel>
          <Select
            value={language}
            onChange={handleLanguageChange}
            label="Linguagem"
          >
            {LANGUAGES.map((lang) => (
              <MenuItem key={lang.value} value={lang.value}>
                {lang.label}
              </MenuItem>
            ))}
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

      {/* Campo de Código */}
      <TextField
        fullWidth
        multiline
        minRows={5}
        value={code}
        onChange={handleCodeChange}
        placeholder={`Digite seu código ${getLanguageLabel(language)} aqui...`}
        variant="outlined"
        sx={{
          '& .MuiInputBase-input': {
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
            fontSize: '0.875rem',
            lineHeight: 1.5,
          },
        }}
      />

      {/* Preview do Código */}
      {code && (
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Preview:
            </Typography>
            <IconButton
              size="small"
              onClick={handleCopyCode}
              title="Copiar código"
              sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}
            >
              <CopyIcon fontSize="small" />
            </IconButton>
          </Box>
          
          <Paper
            sx={{
              p: 2,
              bgcolor: '#1e1e1e',
              color: '#d4d4d4',
              borderRadius: 1,
              overflow: 'auto',
              position: 'relative',
            }}
          >
            {/* Header do bloco de código */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 1,
                pb: 1,
                borderBottom: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: '#569cd6',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                }}
              >
                {getLanguageLabel(language)}
              </Typography>
            </Box>

            {/* Código */}
            <Box
              component="pre"
              sx={{
                m: 0,
                fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                fontSize: '0.875rem',
                lineHeight: 1.5,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              <code>{code}</code>
            </Box>
          </Paper>
        </Box>
      )}

      {/* Placeholder quando não há código */}
      {!code && (
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
          <CodeIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
          <Typography variant="body2" color="text.secondary">
            Digite seu código {getLanguageLabel(language)} acima
          </Typography>
        </Box>
      )}
    </Box>
  );
}

CodeBlock.propTypes = {
  data: PropTypes.shape({
    language: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  canDelete: PropTypes.bool,
};