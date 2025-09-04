import styled from 'styled-components';

export const Container = styled.div`
  padding: 32px;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%);
    backdrop-filter: blur(10px);
  }
  
  & > * {
    position: relative;
    z-index: 1;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding: 32px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%);
  border-radius: 24px;
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 8px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #F2D544 0%, #308C50 50%, #11B4D9 100%);
  }
`;

export const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #308C50 0%, #11B4D9 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 8px;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 16px;
  
  &::before {
    content: '📋';
    font-size: 2rem;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
  }
`;

export const Subtitle = styled.p`
  color: #555;
  font-size: 1.1rem;
  margin-bottom: 30px;
  opacity: 0.9;
  font-weight: 500;
  letter-spacing: 0.5px;
  margin-top: 4px;
`;

export const AddButton = styled.button`
  background: linear-gradient(135deg, #308C50 0%, #11B4D9 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 24px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 25px rgba(48, 140, 80, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '✨';
    margin-right: 8px;
    font-size: 1.2rem;
  }
  
  &:hover {
    background: linear-gradient(135deg, #267A42 0%, #0E9BC4 100%);
    box-shadow: 0 12px 35px rgba(48, 140, 80, 0.4);
    transform: translateY(-3px) scale(1.02);
  }
  
  &:active {
    transform: translateY(-1px) scale(0.98);
  }
`;

export const ModelsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
  margin-top: 32px;
`;

export const ModelCard = styled.div`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  padding: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #F2D544 0%, #308C50 50%, #11B4D9 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover {
    transform: translateY(-12px) scale(1.02);
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.2);
    
    &::before {
      opacity: 1;
    }
  }
`;

export const ModelHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 16px;
`;

export const AgeChip = styled.span`
  background: linear-gradient(135deg, #F2D544 0%, #F2A544 100%);
  color: #8B4513;
  padding: 8px 16px;
  border-radius: 16px;
  font-size: 0.9rem;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(242, 213, 68, 0.3);
  border: 1px solid rgba(242, 213, 68, 0.5);
  display: flex;
  align-items: center;
  gap: 4px;
  
  &::before {
    content: '🎯';
    font-size: 0.9rem;
  }
`;

export const ModelTitle = styled.h3`
  font-weight: 700;
  background: linear-gradient(135deg, #308C50 0%, #11B4D9 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.4rem;
  margin: 16px 0 8px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &::before {
    content: '📝';
    font-size: 1.2rem;
    filter: none;
    -webkit-text-fill-color: initial;
  }
`;

export const ModelObjetivo = styled.p`
  color: #555;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 24px;
  font-weight: 400;
  letter-spacing: 0.2px;
  position: relative;
  padding: 16px;
  background: rgba(248, 250, 252, 0.6);
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  padding-left: 32px;
  
  &::before {
    content: '💡';
    position: absolute;
    top: 8px;
    left: 8px;
    font-size: 1rem;
    opacity: 0.7;
  }
`;

export const StepsContainer = styled.div`
  border-top: 1px solid #eee;
  padding-top: 16px;
  margin-top: 16px;
  margin-bottom: 24px;
  padding: 0 8px;
`;

export const StepsTitle = styled.h4`
  font-weight: 700;
  background: linear-gradient(135deg, #308C50 0%, #11B4D9 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 1.1rem;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &::before {
    content: '🚀';
    font-size: 1rem;
    -webkit-text-fill-color: initial;
  }
`;

export const Step = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
  padding: 16px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(48, 140, 80, 0.08) 0%, rgba(17, 180, 217, 0.05) 100%);
  border: 1px solid rgba(48, 140, 80, 0.15);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(135deg, #308C50 0%, #11B4D9 100%);
  }
  
  &:hover {
    background: linear-gradient(135deg, rgba(48, 140, 80, 0.12) 0%, rgba(17, 180, 217, 0.08) 100%);
    transform: translateX(4px);
  }
  
  .step-number {
    min-width: 32px;
    height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, #308C50 0%, #11B4D9 100%);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    font-weight: 700;
    margin-right: 12px;
    flex-shrink: 0;
    box-shadow: 0 4px 12px rgba(48, 140, 80, 0.3);
  }
  
  .step-text {
    font-size: 0.95rem;
    color: #444;
    line-height: 1.5;
    font-weight: 500;
    letter-spacing: 0.2px;
  }
`;

export const CardActions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
  padding: 24px;
  padding-top: 16px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(255, 255, 255, 0.9) 100%);
  justify-content: flex-end;
`;

export const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.color || '#11B4D9'};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 12px;
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background-color: ${props => props.color ? `${props.color}15` : 'rgba(17, 180, 217, 0.15)'};
  border: 1px solid ${props => props.color ? `${props.color}30` : 'rgba(17, 180, 217, 0.3)'};
  
  &:hover {
    background-color: ${props => props.color ? `${props.color}25` : 'rgba(17, 180, 217, 0.25)'};
    transform: scale(1.15) ${props => props.color === '#e74c3c' ? 'rotate(-5deg)' : 'rotate(5deg)'};
    box-shadow: 0 6px 20px ${props => props.color ? `${props.color}30` : 'rgba(17, 180, 217, 0.3)'};
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 80px 20px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%);
  border-radius: 32px;
  backdrop-filter: blur(20px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #F2D544 0%, #308C50 50%, #11B4D9 100%);
  }
  
  .empty-icon {
    font-size: 5rem;
    background: linear-gradient(135deg, #308C50 0%, #11B4D9 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 24px;
    filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
  }
  
  h3 {
    font-size: 1.8rem;
    font-weight: 700;
    background: linear-gradient(135deg, #308C50 0%, #11B4D9 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 16px;
  }
  
  p {
    font-size: 1.1rem;
    color: #666;
    margin-bottom: 32px;
    font-weight: 500;
    letter-spacing: 0.3px;
    line-height: 1.6;
  }
`;