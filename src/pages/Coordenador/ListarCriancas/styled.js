import styled from 'styled-components';
import { 
  Container, 
  Card, 
  TableContainer,
  Paper 
} from '@mui/material';

export const StyledContainer = styled(Container)`
  padding: 24px 16px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);

  @media (max-width: 768px) {
    padding: 16px 8px;
  }
`;

export const StyledCard = styled(Card)`
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

export const StyledTableContainer = styled(TableContainer)`
  max-height: 600px;
  
  .MuiTableHead-root {
    .MuiTableCell-root {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      font-weight: 600;
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border: none;
      position: sticky;
      top: 0;
      z-index: 10;
    }
  }

  .MuiTableBody-root {
    .MuiTableRow-root {
      transition: all 0.2s ease;
      
      &:hover {
        background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
        transform: scale(1.01);
      }

      &:nth-of-type(even) {
        background-color: rgba(0, 0, 0, 0.02);
      }
    }

    .MuiTableCell-root {
      border-bottom: 1px solid rgba(224, 224, 224, 0.5);
      padding: 16px;
      
      .MuiAvatar-root {
        transition: all 0.3s ease;
        
        &:hover {
          transform: scale(1.1);
        }
      }

      .MuiIconButton-root {
        transition: all 0.2s ease;
        
        &:hover {
          transform: scale(1.1);
        }
        
        &.MuiIconButton-colorPrimary:hover {
          background-color: rgba(25, 118, 210, 0.1);
        }
        
        &.MuiIconButton-colorError:hover {
          background-color: rgba(211, 47, 47, 0.1);
        }
      }
    }
  }

  /* Scrollbar personalizada */
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 4px;
    
    &:hover {
      background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
    }
  }
`;

export const StyledPaper = styled(Paper)`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    transform: scale(1.1);
  }
  
  &.edit-button:hover {
    background-color: rgba(25, 118, 210, 0.1);
  }
  
  &.delete-button:hover {
    background-color: rgba(211, 47, 47, 0.1);
  }
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 48px 24px;
  text-align: center;
  
  .empty-icon {
    font-size: 64px;
    color: #bdbdbd;
    margin-bottom: 16px;
    opacity: 0.7;
  }
  
  .empty-title {
    font-size: 1.25rem;
    font-weight: 500;
    color: #757575;
    margin-bottom: 8px;
  }
  
  .empty-subtitle {
    font-size: 0.875rem;
    color: #9e9e9e;
  }
`;

export const StatsChip = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border: 1px solid rgba(102, 126, 234, 0.2);
  font-size: 0.875rem;
  font-weight: 500;
  color: #667eea;
  margin-right: 8px;
  margin-bottom: 8px;
  
  .chip-icon {
    margin-right: 6px;
    font-size: 16px;
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 48px;
  
  .MuiCircularProgress-root {
    color: #667eea;
  }
`;