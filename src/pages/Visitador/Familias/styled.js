import styled from "styled-components";

export const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 12px;
  padding: 20px;

  p {
    font-size: 1rem;
    color: #333;
    font-weight: 600;
    margin: 4px 0;
  }

  h2 {
    color: #0367a6;
    font-weight: bold;
    margin-bottom: 10px;
  }

  input {
    border: none;
    border-bottom: 2px solid #ccc;
    background-color: transparent;
    color: #333;
    text-align: center;
    font-size: 1rem;
    padding: 6px;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-bottom-color: #0367a6;
    }

    &::placeholder {
      color: #aaa;
      font-style: italic;
    }
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: min(90%, 320px);
  background: white;
  border-radius: 16px;
  padding: 20px;
  margin: 20px auto;
  box-shadow:
    0 4px 12px rgba(0, 0, 0, 0.08),
    inset 0 -2px 6px rgba(0, 0, 0, 0.03);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow:
      0 6px 16px rgba(0, 0, 0, 0.12),
      inset 0 -2px 6px rgba(0, 0, 0, 0.03);
  }

  .link {
    background-color: #0367a6;
    color: white;
    border-radius: 8px;
    font-size: 0.95rem;
    font-weight: 600;
    padding: 10px 18px;
    cursor: pointer;
    transition:
      background 0.3s ease,
      transform 0.2s ease;
    border: none;
    margin-top: 20px;

    &:hover {
      background-color: #024d7a;
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  p {
    color: #555;
    font-size: 0.95rem;
  }
`;
