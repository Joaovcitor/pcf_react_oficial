import styled from "styled-components";

export const Div = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;

  .dados-pesquisados {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;


    .criancas {
      display: flex;
      justify-content: center;
      align-items: baseline;
      flex-direction: column;

      h3 {
        display: flex;
        justify-content: center;
        text-align: center;
      }
    }
  }

  form {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 10px;
    text-align: center;

    input {
      width: 190px;
      margin: 0 auto;
      margin-top: 10px;
      padding: 10px;
      font-size: 18px;
    }

    button {
      width: 200px;
      margin: 0 auto;
      margin-top: 10px;
      cursor: pointer;
    }
  }

  h3 {
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 20px;
    color: #333;

    span {
      color: #007BFF; /* Destaque para o nome do visitador */
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
        background-color: #CC2235;
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
    background-color: #0F8C3B;
    padding: 15px;
    border: 1px solid #DDD;
    width: 300px;
    margin: 0 auto;
    border-radius: 8px;
    margin-bottom: 10px;
    text-align: center;

    .links {
      display: inline-block;
      margin-right: 15px;
      margin-top: 5px;
      padding: 5px 10px;
      background-color: #F2D4AE;
      color: black;
      text-decoration: none;
      border: none;
      border-radius: 5px;
      font-size: 0.9rem;

      &:hover {
        background-color: #0056b3;
        color: white;
      }
    }

    p {
      font-size: 1rem;
      color: black;
      font-weight: bold;
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



export const PlanosContainer = styled.div`
  margin: 20px 0;

  h3 {
    margin-bottom: 10px;
  }
`;

export const PlanoItem = styled.div`
  display: flex;
  flex-direction: column; /* Mantenha os detalhes empilhados */
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;

  p {
    margin: 5px 0;
  }

  span {
    font-weight: bold; /* Destaque o texto "Objetivo:" */
  }
`;

export const VisitasFeitas = styled.div`
  margin-top: 20px;

  h3 {
    margin-bottom: 10px;
  }
`;

export const VisitasList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    margin: 5px 0;
  }
`;

