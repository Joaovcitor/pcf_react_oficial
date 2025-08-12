import styled from "styled-components";

export const Div = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 20px;
  padding: 0 10px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  p {
    font-size: 1rem;
    color: #333;
  }

  h2 {
    color: #0367a6;
    font-weight: bold;
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
    }
  }
`;

export const Section = styled.section`
  background: white;
  border-radius: 12px;
  box-shadow:
    0 4px 10px rgba(0, 0, 0, 0.06),
    inset 0 -2px 6px rgba(0, 0, 0, 0.02);
  padding: 16px;
  text-align: center;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.08);
  }

  p {
    font-size: 0.95rem;
    margin: 8px 0;
    color: #555;
  }

  a {
    display: inline-block;
    background-color: #0367a6;
    border-radius: 8px;
    color: white;
    font-size: 0.95rem;
    font-weight: 600;
    padding: 10px 18px;
    text-decoration: none;
    transition:
      background 0.3s ease,
      transform 0.2s ease;

    &:hover {
      background-color: #024d7a;
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  }
`;
