import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Tooltip
} from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ContentCopy, FormatQuote } from '@mui/icons-material';

const PostRenderer = ({ content }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const renderBlock = (block) => {
    switch (block.type) {
      case 'heading': {
        const HeadingComponent = Typography;
        const variant = {
          1: 'h1',
          2: 'h2',
          3: 'h3',
          4: 'h4',
          5: 'h5',
          6: 'h6'
        }[block.data.level] || 'h2';

        return (
          <HeadingComponent
            variant={variant}
            component={`h${block.data.level}`}
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
              mb: 2,
              mt: block.data.level === 1 ? 0 : 3
            }}
          >
            {block.data.text}
          </HeadingComponent>
        );
      }

      case 'paragraph':
        return (
          <Typography
            variant="body1"
            sx={{
              mb: 2,
              lineHeight: 1.7,
              textAlign: 'justify'
            }}
          >
            {block.data.text}
          </Typography>
        );

      case 'image':
        return (
          <Box sx={{ mb: 3 }}>
            <Card elevation={2}>
              <CardMedia
                component="img"
                image={block.data.url}
                alt={block.data.alt || block.data.caption}
                sx={{
                  maxHeight: 400,
                  objectFit: 'contain',
                  width: '100%'
                }}
              />
              {block.data.caption && (
                <Box sx={{ p: 2, bgcolor: 'grey.50' }}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontStyle: 'italic',
                      color: 'text.secondary',
                      textAlign: 'center',
                      display: 'block'
                    }}
                  >
                    {block.data.caption}
                  </Typography>
                </Box>
              )}
            </Card>
          </Box>
        );

      case 'code':
        return (
          <Box sx={{ mb: 3 }}>
            <Paper elevation={1} sx={{ overflow: 'hidden' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  px: 2,
                  py: 1,
                  bgcolor: 'grey.100',
                  borderBottom: 1,
                  borderColor: 'divider'
                }}
              >
                <Chip
                  label={block.data.language}
                  size="small"
                  variant="outlined"
                />
                <Tooltip title="Copiar código">
                  <IconButton
                    size="small"
                    onClick={() => copyToClipboard(block.data.code)}
                  >
                    <ContentCopy fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
              <SyntaxHighlighter
                language={block.data.language}
                style={vscDarkPlus}
                customStyle={{
                  margin: 0,
                  fontSize: '14px',
                  lineHeight: '1.5'
                }}
              >
                {block.data.code}
              </SyntaxHighlighter>
            </Paper>
          </Box>
        );

      case 'quote':
        return (
          <Paper
            elevation={0}
            sx={{
              mb: 3,
              p: 3,
              bgcolor: 'grey.50',
              borderLeft: 4,
              borderColor: 'primary.main',
              position: 'relative'
            }}
          >
            <FormatQuote
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                color: 'primary.main',
                opacity: 0.3,
                fontSize: 32
              }}
            />
            <Typography
              variant="body1"
              sx={{
                fontStyle: 'italic',
                fontSize: '1.1rem',
                lineHeight: 1.6,
                pl: 4
              }}
            >
              {block.data.text}
            </Typography>
            {block.data.author && (
              <Typography
                variant="body2"
                sx={{
                  mt: 2,
                  textAlign: 'right',
                  color: 'text.secondary',
                  fontWeight: 'medium'
                }}
              >
                — {block.data.author}
              </Typography>
            )}
          </Paper>
        );

      case 'list': {
        const isOrdered = block.data.style === 'ordered';
        const ListComponent = isOrdered ? 'ol' : 'ul';

        return (
          <Box sx={{ mb: 3 }}>
            <List
              component={ListComponent}
              sx={{
                pl: 2,
                '& .MuiListItem-root': {
                  display: 'list-item',
                  py: 0.5
                }
              }}
            >
              {block.data.items.map((item, index) => (
                <ListItem key={index} sx={{ pl: 0 }}>
                  <ListItemText
                    primary={item}
                    sx={{
                      '& .MuiListItemText-primary': {
                        lineHeight: 1.6
                      }
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        );
      }

      default:
        return null;
    }
  };

  if (!content || !Array.isArray(content)) {
    return (
      <Typography variant="body2" color="text.secondary">
        Conteúdo não disponível
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: '100%', overflow: 'hidden' }}>
      {content.map((block, index) => (
        <Box key={block.id || index}>
          {renderBlock(block)}
        </Box>
      ))}
    </Box>
  );
};

PostRenderer.propTypes = {
  content: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PostRenderer;