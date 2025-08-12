import styled from "styled-components";

// --- Paleta de Cores e Tema ---
// Centralizar as cores e valores comuns facilita a manutenção do design.
const theme = {
  primary: "#F2594B", // Um laranja/vermelho vibrante para destaque
  primaryHover: "#D94A3D", // Tom mais escuro para efeito hover
  bgDark: "#0C1A26", // Fundo principal escuro
  bgCard: "#1B2A38", // Um fundo um pouco mais claro para os cards
  textLight: "#F1F5F9", // Texto principal claro (quase branco)
  textMuted: "#A0AEC0", // Texto secundário (cinza claro)
  borderRadius: "8px",
  shadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
};

// --- Componentes Reutilizáveis ---

// Um botão estilizado que pode ser usado em qualquer lugar do app.
export const Button = styled.button`
  background-color: ${theme.primary};
  color: ${theme.textLight};
  border: none;
  border-radius: ${theme.borderRadius};
  padding: 10px 20px;
  font-weight: bold;
  cursor: pointer;
  text-align: center;
  transition:
    background-color 0.2s ease-in-out,
    transform 0.2s ease-in-out;
  align-self: center; // Centraliza o botão dentro de um container flex

  &:hover {
    background-color: ${theme.primaryHover};
    transform: translateY(-2px);
  }
`;

// O card para exibir os dados de cada cuidador/gestante.
export const Card = styled.div`
  background-color: ${theme.bgCard};
  border-radius: ${theme.borderRadius};
  padding: 24px;
  box-shadow: ${theme.shadow};
  display: flex;
  flex-direction: column;
  gap: 16px; // Espaçamento interno entre os elementos do card
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px); // Efeito de elevação no hover
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
  }

  h2,
  h3,
  h4 {
    color: ${theme.primary};
    margin: 0;
    text-align: left; // Alinha os títulos à esquerda para melhor leitura
  }

  h2 {
    font-size: 1.5rem;
  }

  h3,
  h4 {
    font-size: 1.1rem;
    border-bottom: 1px solid ${theme.primary};
    padding-bottom: 8px;
    margin-bottom: 8px;
  }

  p {
    color: ${theme.textLight};
    margin: 0;
    line-height: 1.6;
    text-align: left;

    strong {
      color: ${theme.textMuted};
    }
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: left;
  }

  li {
    background-color: ${theme.bgDark};
    padding: 8px 12px;
    border-radius: 4px;
    margin-bottom: 6px;
    color: ${theme.textMuted};
  }
`;

// --- Layouts de Página ---

// O container principal que organiza os cards em um grid responsivo.
export const Section = styled.section`
  display: grid;
  // Grid responsivo: de 1 a 4 colunas dependendo do espaço da tela.
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 24px;
  padding: 24px; // Espaçamento nas laterais da página
`;

// A barra de navegação superior.
export const Nav = styled.nav`
  background-color: ${theme.bgDark};
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between; // Espaça os itens (ex: logo e links)
  box-shadow: ${theme.shadow};
  position: sticky; // Mantém a nav no topo ao rolar a página
  top: 0;
  z-index: 10;

  a {
    color: ${theme.textLight};
    margin: 0 12px;
    font-weight: bold;
    text-decoration: none;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: ${theme.primary};
    }
  }
`;
