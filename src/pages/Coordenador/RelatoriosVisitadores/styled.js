import styled, { keyframes } from "styled-components";

const hoverShadow = keyframes`
  to {
    box-shadow: 0 12px 30px rgba(33, 150, 243, 0.3);
  }
`;

export const Div = styled.div`
  background: #f9fbfc;
  min-height: 100vh;
  padding: 30px 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

  h3 {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 25px;
    color: #222e3e;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-width: 400px;
    margin: 0 auto 40px auto;
    padding: 25px 30px;
    background: white;
    border-radius: 14px;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.07);
    transition: box-shadow 0.3s ease;

    &:hover {
      box-shadow: 0 8px 30px rgba(33, 150, 243, 0.15);
    }

    label {
      font-weight: 600;
      color: #33475b;
      font-size: 1rem;
    }

    input {
      padding: 14px 18px;
      font-size: 1rem;
      border: 1.8px solid #cbd5e1;
      border-radius: 10px;
      transition:
        border-color 0.3s ease,
        box-shadow 0.3s ease;

      &:focus {
        outline: none;
        border-color: #1e88e5;
        box-shadow: 0 0 8px rgba(30, 136, 229, 0.3);
      }
    }

    button {
      padding: 14px;
      font-size: 1.1rem;
      font-weight: 700;
      color: white;
      background: linear-gradient(90deg, #1e88e5 0%, #1565c0 100%);
      border: none;
      border-radius: 12px;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(30, 136, 229, 0.4);
      transition:
        background 0.3s ease,
        box-shadow 0.3s ease;

      &:hover {
        background: linear-gradient(90deg, #1565c0 0%, #0d47a1 100%);
        box-shadow: 0 6px 20px rgba(13, 71, 161, 0.6);
      }
    }
  }

  .naoBateu {
    background-color: #ef5350;
    padding: 16px;
    border-radius: 12px;
    max-width: 300px;
    margin: 0 auto 30px auto;
    color: white;
    font-weight: 700;
    text-align: center;
    box-shadow: 0 4px 12px rgba(239, 83, 80, 0.3);
    letter-spacing: 0.02em;
  }

  .bateu {
    max-width: 300px;
    margin: 0 auto 30px auto;
    background-color: #43a047;
    padding: 16px;
    border-radius: 12px;
    color: white;
    font-weight: 700;
    text-align: center;
    box-shadow: 0 4px 12px rgba(67, 160, 71, 0.3);
  }
`;

export const PainelResumo = styled.div`
  max-width: 960px;
  margin: 0 auto 40px auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
`;

export const CardResumo = styled.div`
  background: white;
  border-radius: 14px;
  padding: 22px 28px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.07);
  text-align: center;
  cursor: default;
  transition:
    box-shadow 0.4s ease,
    transform 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    box-shadow: 0 12px 30px rgba(33, 150, 243, 0.3);
    transform: translateY(-6px);
  }

  svg {
    font-size: 3rem;
    margin-bottom: 12px;
    color: ${({ color }) => color || "#2196f3"};
  }

  h5 {
    margin: 0 0 10px;
    font-weight: 700;
    font-size: 1.4rem;
    color: #222e3e;
    user-select: none;
  }

  p {
    margin: 0;
    font-weight: 600;
    font-size: 1.2rem;
    color: #444;
  }
`;
