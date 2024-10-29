import styled from 'styled-components';

export const CardContainer = styled.div`
  position: relative;
  width: 270px;
  height: 140px;
  padding: 20px;
  margin: 0 auto;
  margin-bottom: 15px;
  display: flex;
  background: #fff;
  border: solid 4px #333;
  box-shadow: -5px 5px #333;
  transition: all .2s ease-in-out;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
`;

export const CardImage = styled.div`
  width: 13rem;
  height: 10rem;
  background: #3bbdc4;
  border-radius: 1rem;
`;

export const CardContent = styled.div`
  p {
    &:first-child {
      font-weight: 800;
    }
  }
`;

export const CardButton = styled.button`
  background: #2c7bce;
  color: #fff;
  font-weight: 800;
  padding: 0.5rem 1.5rem;
  border-radius: 0.75rem;
  transition: background 0.3s ease;

  &:hover {
    background: #2196f3;
  }
`;
