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
    font-family: sans-serif;
    background: ${primaryDarkColor};
  }

  html, body, #root {
    height: 100%;
  }

  button {
    cursor: pointer;
    background-color: #038C7F;
    border: none;
    color: #fff;
    padding: 10px 20px;
    border-radius: 4px;
    margin-top: 20px;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }
`;

export const Container = styled.section`
  max-width: 550px;
  background-color: #F2E7DC;
  margin: 0 auto;
  padding: 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  align-items: center;
  display: flex;
  flex-direction: column;
`;
