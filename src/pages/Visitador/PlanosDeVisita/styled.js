import styled from "styled-components";

export const CardContainer = styled.div`
  position: relative;
  padding: 20px;
  margin: 0 auto;
  margin-bottom: 15px;
  display: flex;
  width: 190px;
  height: 200px;
  background: rgb(236, 236, 236);
  box-shadow:
    rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  transition: all 0.2s ease-in-out;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  margin-top: 20px;
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
    span {
      color: #f24c27;
    }
  }
`;

export const CardButton = styled.button`
  background: #d94a64;
  color: #fff;
  font-weight: 800;
  padding: 0.5rem 1.5rem;
  border-radius: 0.75rem;
  transition: background 0.3s ease;

  &:hover {
    background: #865ebf;
  }
`;
