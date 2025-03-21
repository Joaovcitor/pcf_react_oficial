import styled from "styled-components";
import { primaryColor } from "../../config/colors";

export const Section = styled.section`
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;

  h3 {
    color: white;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }
`;

export const Nav = styled.nav`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  a {
    color: black;
    margin: 0 10px 0 0;
    font-weight: bold;
  }

  p {
    font-family: Arial, Helvetica, sans-serif;
    color: white;
  }

  div {
    box-sizing: border-box;
    width: 200px;
    height: 200px;
    /* background: rgba(217, 217, 217, 0.58); */
    /* background-color: #085a8c; */
    background-color: #011140;
    border: 1px solid #011126;
    box-shadow: 12px 17px 51px rgba(0, 0, 0, 0.22);
    backdrop-filter: blur(6px);
    border-radius: 17px;
    text-align: center;
    cursor: pointer;
    transition: all 0.5s;
    display: flex;
    align-items: center;
    justify-content: space-around;
    user-select: none;
    font-weight: bolder;
    color: black;
    flex-direction: column;
    margin: 10px;
    &:hover {
      border: 1px solid black;
      transform: scale(1.05);
    }
  }

  .links {
    border: none;
    /* background-color: #e3cd40; */
    background-color: #a7d5f2;
    display: flex;
    margin-top: 25px;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    div {
      width: 150px;
      height: 150px;
    }
    .links {
      margin-top: 15px;
    }
  }

  @media (max-width: 480px) {
    div {
      width: 100%;
      height: auto;
      padding: 10px;
    }
    .links {
      width: 100%;
    }
  }
`;
