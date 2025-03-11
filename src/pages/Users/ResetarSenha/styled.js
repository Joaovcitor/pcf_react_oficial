import styled from "styled-components";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export const Organizador = styled.form`
  display: flex;
  flex-wrap: wrap; /* Permite que os itens quebrem a linha quando necessário */
  gap: 20px; /* Espaçamento entre os elementos */
  padding: 30px;

  .lideranca {
    width: 150px;
  }

  h2 {
    width: 100%; /* O título ocupa toda a largura */
    text-align: center;
  }

  label {
    flex: 1 1 calc(33.33% - 20px); /* Cada label ocupa 1/3 da largura disponível, menos o espaçamento */
    display: flex;
    flex-direction: column;
    font-size: 1rem;
  }

  input,
  select {
    margin-top: 5px;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    width: 100%; /* Botão ocupa toda a largura */
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 20px; /* Espaçamento acima do botão */
  }

  button:hover {
    background-color: #0056b3;
  }

  @media (max-width: 1050px) {
    label {
      flex: 1 1 calc(50% - 20px); /* Em telas menores, dois elementos por linha */
    }
  }

  @media (max-width: 520px) {
    label {
      flex: 1 1 100%; /* Em telas muito pequenas, cada label ocupa toda a largura */
    }

    button {
      margin-top: 10px; /* Ajusta o espaçamento do botão em telas menores */
    }
  }
`;

export const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  nav {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #032859;
    -webkit-box-shadow: 10px 6px 4px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 10px 6px 4px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 10px 6px 4px 0px rgba(0, 0, 0, 0.75);
    width: 300px;
    margin-top: 60px;
    margin-left: 30px;
    border-radius: 5px;
    padding: 10px;

    h4 {
      color: white;
      font-size: 20px;
    }
  }

  p {
    font-size: 18px;
    /* margin-left: 15px; */
    color: black;
  }
`;

export const Links = styled(Link)`
  background-color: #f24162;
  padding: 7px;
  margin-bottom: 10px;
  margin-top: 10px;
  border-radius: 4px;
  color: white;
`;

export const Section = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 40px;

  div {
    margin-left: 20px;
    background-color: #011126;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    text-align: center;
    -webkit-box-shadow: 10px 6px 4px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 10px 6px 4px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 10px 6px 4px 0px rgba(0, 0, 0, 0.75);

    p {
      display: flex;
      justify-content: center;
      text-align: center;
      color: white;
    }
  }
`;

export const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 20px;
    height: 40px;
    padding: 0 10px;
    border-radius: 4px;
    border: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    &:focus {
      border: 1px solid #05f2c7;
    }
  }
`;
