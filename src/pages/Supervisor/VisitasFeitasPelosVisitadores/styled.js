import styled from "styled-components";

export const Div = styled.div`
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column; /* Adiciona essa linha para empilhar os elementos em telas menores */

  /* Define uma largura máxima e margem lateral */
  max-width: 800px; /* Largura máxima do componente */
  width: 100%; /* Ocupa toda a largura disponível */

  /* Responsividade */
  @media (max-width: 768px) {
    padding: 15px; /* Diminui o padding em telas menores */
  }

  @media (max-width: 480px) {
    padding: 10px; /* Diminui ainda mais o padding em telas muito pequenas */
  }


`;
