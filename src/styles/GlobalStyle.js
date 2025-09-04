import styled, { createGlobalStyle } from "styled-components";
import { primaryColor, primaryDarkColor } from "../config/colors";
import "react-toastify/dist/ReactToastify.css";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
  }

  body {
    font-family: "Inter", "Roboto", "Helvetica", "Arial", sans-serif;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    min-height: 100vh;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html, body, #root {
    height: 100%;
  }

  /* Estilos para scrollbar moderna */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #2563eb, #7c3aed);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(45deg, #1d4ed8, #5b21b6);
  }

  /* Animações suaves */
  * {
    transition: all 0.2s ease-in-out;
  }

  /* Botões customizados para compatibilidade */
  button:not([class*="Mui"]) {
    cursor: pointer;
    background: linear-gradient(45deg, #2563eb 30%, #7c3aed 90%);
    border: none;
    color: #fff;
    padding: 12px 24px;
    border-radius: 8px;
    margin-top: 20px;
    font-size: 16px;
    font-weight: 600;
    font-family: "Inter", "Roboto", "Helvetica", "Arial", sans-serif;
    box-shadow: 0px 4px 12px rgba(37, 99, 235, 0.3);
    transition: all 0.3s ease;
    
    &:hover {
      background: linear-gradient(45deg, #1d4ed8 30%, #5b21b6 90%);
      transform: translateY(-2px);
      box-shadow: 0px 8px 20px rgba(37, 99, 235, 0.4);
    }
    
    &:active {
      transform: translateY(0);
    }
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
  }

  /* Toast customization */
  .toast-container {
    .Toastify__toast {
      border-radius: 12px;
      font-family: "Inter", "Roboto", "Helvetica", "Arial", sans-serif;
    }
    
    .Toastify__toast--success {
      background: linear-gradient(45deg, #10b981, #34d399);
    }
    
    .Toastify__toast--error {
      background: linear-gradient(45deg, #ef4444, #f87171);
    }
    
    .Toastify__toast--warning {
      background: linear-gradient(45deg, #f59e0b, #fbbf24);
    }
    
    .Toastify__toast--info {
      background: linear-gradient(45deg, #06b6d4, #22d3ee);
    }
  }
`;

export const Container = styled.section`
  max-width: 420px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0px 8px 32px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  align-items: center;
  display: flex;
  flex-direction: column;
  color: #1e293b;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #2563eb, #7c3aed, #06b6d4);
    border-radius: 16px 16px 0 0;
  }
  
  @media (max-width: 768px) {
    max-width: 90%;
    margin-top: 20px;
    padding: 24px;
  }
`;
