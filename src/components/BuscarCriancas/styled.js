import styled from "styled-components";

export const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  p {
    font-size: 18px;
    color: white;
    font-weight: bolder;
  }

  h2 {
    color: white;
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

export const Section = styled.section`
  div {
    width: 220px;
    padding: 20px;
    display: flex;
    background: #a0d9d9;
    border: solid 1px #333;
    border-radius: 16px;
    transition: all 0.2s ease-in-out;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 15px;
    margin-top: 10px;
  }

  .link {
    background-color: white;
    color: black;
    border-radius: 10em;
    font-size: 17px;
    font-weight: 600;
    padding: 10px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    border: 1px solid black;
    box-shadow: 0 0 0 0 black;
    &:hover {
      transform: translateY(-4px) translateX(-2px);
      box-shadow: 2px 5px 0 0 black;
    }
  }

  p {
    color: black;
    font-weight: bolder;
    margin-bottom: 20px;
  }
`;
