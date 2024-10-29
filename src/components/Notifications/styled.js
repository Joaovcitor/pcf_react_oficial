import styled from "styled-components";
import { primaryColor } from "../../config/colors";

export const Section = styled.section`
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;

  p {
    color: white;
  }

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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
  align-items: start;
  padding: 10px;

  a {
    color: #fff;
    margin: 0 10px 0 0;
    font-weight: bold;
  }

  p {
    color: #05060f;
  font-size: 1rem;
  line-height: 1.25;
  font-weight: 700;
  }

  div {
    width: 240px;
  background: #00ffa0;
  padding: 1rem;
  border-radius: 1rem;
  border: 0.5vmin solid #05060f;
  box-shadow: 0.4rem 0.4rem #05060f;
  overflow: hidden;
  color: black;
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
