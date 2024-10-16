import styled from "styled-components";
import { primaryColor } from "../../config/colors";

export const Section = styled.section`
  /* display: grid;
  grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
  gap: 20px;
  margin-top: 20px; */

  p {
    color: black;
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
    margin-bottom: 10px;
    padding: 10px;
    margin: 10px;
    background-color: #E3CD40;
    width: 250px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin: 0 auto;
    margin-top: 20px;
    text-align: center;
    border-radius: 5px;
    justify-content: center;
  }

  .links {
    border: none;
    background-color: blue;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    margin-top: 7px;
    padding: 5px;
    border-radius: 4px;
    color: white;
  }
`

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
