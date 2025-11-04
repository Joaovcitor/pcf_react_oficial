import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Divider,
  Fab,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Title as TitleIcon,
  TextFields as TextIcon,
  Image as ImageIcon,
  Code as CodeIcon,
  FormatQuote as QuoteIcon,
  List as ListIcon,
  DragIndicator as DragIcon,
} from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import HeadingBlock from './blocks/HeadingBlock';
import ParagraphBlock from './blocks/ParagraphBlock';
import ImageBlock from './blocks/ImageBlock';
import CodeBlock from './blocks/CodeBlock';
import QuoteBlock from './blocks/QuoteBlock';
import ListBlock from './blocks/ListBlock';

const BLOCK_TYPES = [
  {
    type: 'heading',
    label: 'Título',
    icon: <TitleIcon />,
    description: 'Adicionar um título ou subtítulo',
  },
  {
    type: 'paragraph',
    label: 'Parágrafo',
    icon: <TextIcon />,
    description: 'Adicionar texto simples',
  },
  {
    type: 'image',
    label: 'Imagem',
    icon: <ImageIcon />,
    description: 'Inserir uma imagem',
  },
  {
    type: 'code',
    label: 'Código',
    icon: <CodeIcon />,
    description: 'Bloco de código com syntax highlighting',
  },
  {
    type: 'quote',
    label: 'Citação',
    icon: <QuoteIcon />,
    description: 'Adicionar uma citação',
  },
  {
    type: 'list',
    label: 'Lista',
    icon: <ListIcon />,
    description: 'Lista com marcadores ou numerada',
  },
];

export default function BlockEditor({ value = [], onChange, placeholder = "Comece a escrever seu post..." }) {
  const [blocks, setBlocks] = useState(value.length > 0 ? value : [
    {
      id: 'initial-block',
      type: 'paragraph',
      data: { text: '' }
    }
  ]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBlockIndex, setSelectedBlockIndex] = useState(null);

  const handleAddBlock = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedBlockIndex(index);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedBlockIndex(null);
  };

  const addBlock = (type) => {
    const newBlock = {
      id: `block-${Date.now()}-${Math.random()}`,
      type,
      data: getDefaultData(type),
    };

    const newBlocks = [...blocks];
    newBlocks.splice(selectedBlockIndex + 1, 0, newBlock);
    setBlocks(newBlocks);
    onChange?.(newBlocks);
    handleCloseMenu();
  };

  const getDefaultData = (type) => {
    switch (type) {
      case 'heading':
        return { level: 2, text: '' };
      case 'paragraph':
        return { text: '' };
      case 'image':
        return { url: '', caption: '', alt: '' };
      case 'code':
        return { language: 'javascript', code: '' };
      case 'quote':
        return { text: '', author: '' };
      case 'list':
        return { style: 'unordered', items: [''] };
      default:
        return {};
    }
  };

  const updateBlock = (index, newData) => {
    const newBlocks = [...blocks];
    newBlocks[index] = { ...newBlocks[index], data: newData };
    setBlocks(newBlocks);
    onChange?.(newBlocks);
  };

  const deleteBlock = (index) => {
    if (blocks.length === 1) return; // Não permitir deletar o último bloco
    
    const newBlocks = blocks.filter((_, i) => i !== index);
    setBlocks(newBlocks);
    onChange?.(newBlocks);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newBlocks = Array.from(blocks);
    const [reorderedItem] = newBlocks.splice(result.source.index, 1);
    newBlocks.splice(result.destination.index, 0, reorderedItem);

    setBlocks(newBlocks);
    onChange?.(newBlocks);
  };

  const renderBlock = (block, index) => {
    const commonProps = {
      data: block.data,
      onChange: (newData) => updateBlock(index, newData),
      onDelete: () => deleteBlock(index),
      canDelete: blocks.length > 1,
    };

    switch (block.type) {
      case 'heading':
        return <HeadingBlock key={block.id} {...commonProps} />;
      case 'paragraph':
        return <ParagraphBlock key={block.id} {...commonProps} />;
      case 'image':
        return <ImageBlock key={block.id} {...commonProps} />;
      case 'code':
        return <CodeBlock key={block.id} {...commonProps} />;
      case 'quote':
        return <QuoteBlock key={block.id} {...commonProps} />;
      case 'list':
        return <ListBlock key={block.id} {...commonProps} />;
      default:
        return <ParagraphBlock key={block.id} {...commonProps} />;
    }
  };

  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="blocks">
          {(provided) => (
            <Box {...provided.droppableProps} ref={provided.innerRef}>
              {blocks.map((block, index) => (
                <Draggable key={block.id} draggableId={block.id} index={index}>
                  {(provided, snapshot) => (
                    <Box
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      sx={{
                        mb: 2,
                        position: 'relative',
                        '&:hover .block-controls': {
                          opacity: 1,
                        },
                      }}
                    >
                      {/* Controles do Bloco */}
                      <Box
                        className="block-controls"
                        sx={{
                          position: 'absolute',
                          left: -50,
                          top: 8,
                          opacity: 0,
                          transition: 'opacity 0.2s',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 0.5,
                        }}
                      >
                        <IconButton
                          {...provided.dragHandleProps}
                          size="small"
                          sx={{
                            bgcolor: 'background.paper',
                            boxShadow: 1,
                            '&:hover': { bgcolor: 'grey.100' },
                          }}
                        >
                          <DragIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={(e) => handleAddBlock(e, index)}
                          sx={{
                            bgcolor: 'primary.main',
                            color: 'white',
                            boxShadow: 1,
                            '&:hover': { bgcolor: 'primary.dark' },
                          }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>

                      {/* Bloco de Conteúdo */}
                      <Paper
                        elevation={snapshot.isDragging ? 4 : 1}
                        sx={{
                          p: 2,
                          border: snapshot.isDragging ? '2px dashed' : '1px solid',
                          borderColor: snapshot.isDragging ? 'primary.main' : 'divider',
                          transition: 'all 0.2s',
                        }}
                      >
                        {renderBlock(block, index)}
                      </Paper>
                    </Box>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>

      {/* Botão de Adicionar no Final */}
      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Tooltip title="Adicionar novo bloco">
          <Fab
            color="primary"
            onClick={(e) => handleAddBlock(e, blocks.length - 1)}
            sx={{ boxShadow: 3 }}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>

      {/* Menu de Tipos de Bloco */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          sx: { minWidth: 280, maxHeight: 400 }
        }}
      >
        <Typography variant="subtitle2" sx={{ px: 2, py: 1, color: 'text.secondary' }}>
          Escolha um tipo de bloco
        </Typography>
        <Divider />
        {BLOCK_TYPES.map((blockType) => (
          <MenuItem
            key={blockType.type}
            onClick={() => addBlock(blockType.type)}
            sx={{ py: 1.5 }}
          >
            <Box sx={{ mr: 2, color: 'primary.main' }}>
              {blockType.icon}
            </Box>
            <Box>
              <Typography variant="body2" fontWeight="medium">
                {blockType.label}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {blockType.description}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

BlockEditor.propTypes = {
  value: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};