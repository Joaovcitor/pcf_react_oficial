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
    font-family: Arial, Helvetica, sans-serif;
    /* background: #1F3140; */
    /* background-color: #F2EDDC; */
    /* background-color: #0C2840; */
    /* background-color: #0367A6; */
    background-color: #429ebd;
  }

  html, body, #root {
    height: 100%;
  }

  button {
    cursor: pointer;
    background-color: #D90452;
    border: none;
    color: #fff;
    padding: 10px 20px;
    border-radius: 4px;
    margin-top: 20px;
    font-size: 16px;
    font-weight: bolder;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }
`;

export const Container = styled.section`
  max-width: 370px;
  background-color: #010326;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  align-items: center;
  display: flex;
  flex-direction: column;
  color: white;
`;
