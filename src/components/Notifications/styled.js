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
`

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

  div {
    margin-bottom: 10px;
    padding: 10px;
    margin: 10px;
    background-color: #0528F2;
    text-align: center;
    border-radius: 5px;
    justify-content: center;
    color: white;
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
