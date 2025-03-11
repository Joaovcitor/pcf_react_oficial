import styled from "styled-components";
import { primaryColor } from "../../config/colors";

export const Section = styled.section`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  gap: 20px;
  margin: 0 auto;
  margin-top: 20px;

  p {
    color: black;
    font-weight: bolder;
  }

  h3 {
    color: white;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }
  div {
    position: relative;
    width: 260px;
    padding: 20px;
    margin: 0 auto;
    margin-bottom: 15px;
    display: flex;
    background: #fff;
    border: solid 4px #333;
    box-shadow: -5px 5px #333;
    transition: all 0.2s ease-in-out;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    cursor: pointer;
  }

  .links {
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
    margin-top: 10px;
    &:hover {
      transform: translateY(-4px) translateX(-2px);
      box-shadow: 2px 5px 0 0 black;
    }
  }
`;

export const Nav = styled.nav`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px;

  a {
    color: #fff;
    margin: 0 10px 0 0;
    font-weight: bold;
  }

  div {
    margin-bottom: 10px;
    padding: 10px;
    margin: 10px;
    background-color: ${primaryColor};
    text-align: center;
    border-radius: 5px;
    justify-content: center;
  }

  .links {
    border: none;
    background-color: blue;
    display: flex;
    margin-top: 25px;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }
`;
