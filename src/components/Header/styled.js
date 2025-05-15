import styled from "styled-components";
import { primaryColor } from "../../config/colors";

export const Nav = styled.nav`
  background: white url("/images/image.png") no-repeat center center;
  background-size: cover;
  /* position: relative; */
  padding: 2.8rem;
  display: flex;
  align-items: end;
  justify-content: space-around;

  /* Overlay escuro para melhor contraste (opcional) */
  &::before {
    width: 100%;
    height: 100%;
    background-color: rgba(
      255,
      255,
      255,
      0.01
    ); /* Overlay branco semi-transparente */
    z-index: 0;
  }

  /* Links (acima do overlay) */
  a {
    color: #011126; /* Cor escura para contraste */
    margin: 0 1vw; /* Margem responsiva (1% da largura da tela) */
    font-weight: bold;
    position: relative;
    z-index: 1;
    font-size: clamp(14px, 2vw, 18px); /* Fonte responsiva */
  }

  /* Media Query para telas pequenas (ex: mobile) */
  @media (max-width: 768px) {
    flex-direction: column; /* Empilha os itens verticalmente */
    padding: 1rem 5%;
    a {
      margin: 0.5rem 0; /* Margem vertical em telas pequenas */
    }
  }
`;
