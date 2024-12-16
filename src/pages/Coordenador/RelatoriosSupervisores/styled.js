import styled from "styled-components";

export const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  justify-content: center;
  align-items: center;

  h3 {
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 20px;
    color: #333;

    span {
      color: #007bff; /* Destaque para o nome do visitador */
    }
  }

  .dados {
    margin-bottom: 20px;
    text-align: center;

    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;

      .naoBateu {
        background-color: #cc2235;
        padding: 10px;
        border-radius: 5px;

        p {
          color: #ffff;
          font-weight: bold;
        }
      }

      p {
        font-size: 1rem;
        color: #333;
      }
    }
  }

  .criancas {
    width: 190px;
    background: rgb(236, 236, 236);
    box-shadow:
      rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    border-radius: 8px;
    margin-bottom: 10px;
    text-align: center;
    padding: 20px;

    .links {
      display: inline-block;
      margin-right: 15px;
      margin-top: 5px;
      padding: 5px 10px;
      background-color: #007bff;
      color: white;
      text-decoration: none;
      border: none;
      border-radius: 5px;
      font-size: 0.9rem;

      &:hover {
        background-color: #0056b3;
      }
    }

    p {
      font-size: 1rem;
      color: black;
    }
  }

  /* Estilos responsivos */
  @media (max-width: 768px) {
    h3 {
      font-size: 1.5rem;
    }

    .dados nav {
      flex-direction: column;
      align-items: flex-start;
    }

    .criancas {
      p {
        font-size: 0.9rem;
      }
    }
  }

  @media (max-width: 480px) {
    h3 {
      font-size: 1.2rem;
    }

    .dados nav {
      p {
        font-size: 0.8rem;
      }
    }

    .criancas {
      p {
        font-size: 0.8rem;
      }
    }
  }
`;
