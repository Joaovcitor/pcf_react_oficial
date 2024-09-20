import styled from "styled-components";

export const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  p {
    font-size: 18px;
    /* margin-left: 15px; */
    color: white;
  }

  a {
    border: 1px solid #F2DD72;
    padding: 10px;
    border-radius: 4px;
    width: 120px;
    margin: 0 auto;
    text-align: center;
    margin-top: 10px;
    color: white;
  }

  h2 {
    color: black;
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }

  .planos {
    background-color: white;
    margin-top: 20px;
  }

  .dados {
    display: flex;
    justify-content: space-between;
  }

  nav {
    margin: 20px;
  }

  input {
    border: none;
    border-bottom: solid 1px black;
    background-color: transparent;
    color: white;
    text-align: center;
    font-size: 18px;
  }
`;

export const Paragrafo = styled.p``;
