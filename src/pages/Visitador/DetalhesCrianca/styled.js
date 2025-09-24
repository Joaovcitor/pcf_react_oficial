import styled from 'styled-components';
import { Card, Box } from '@mui/material';

export const Container = styled(Box)`
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
`;

export const InfoCard = styled(Card)`
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
`;

export const InfoItem = styled(Box)`
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const InfoLabel = styled(Box)`
  display: flex;
  align-items: center;
  font-weight: 600;
  color: #555;
  min-width: 200px;
  font-size: 16px;
`;

export const InfoValue = styled(Box)`
  font-size: 16px;
  color: #333;
  flex: 1;
`;

export const LoadingContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
`;