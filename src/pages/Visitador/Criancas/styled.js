import styled from "styled-components";

export const Section = styled.section`
  justify-content: center;
  align-items: center;
  text-align: center;
  p {
    font-size: 18px;
    /* margin-left: 15px; */
    color: black;
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

export const Info = styled.nav`
  background-color: #2DA657;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 250px;
  margin: 0 auto;
  justify-content: space-around;

  p {
    font-size: 1.2rem;
    margin-bottom: 12px;
    font-weight: bold;
  }

  a {
    text-decoration: none;
    color: #ffffff;
    background-color: #030640;
    padding: 5px;
    border-radius: 4px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
  }
`

export const Infos = styled.div`
 display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  grid-gap: 16px;
  padding: 16px;
`

export const Paragrafo = styled.p``;
