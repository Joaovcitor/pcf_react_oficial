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
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  width: 190px;
 background: white;
 border-radius: 10px;
 transition: border-radius 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  margin: 0 auto;
  justify-content: space-around;
  box-shadow: inset 0 -3em 3em rgba(0,0,0,0.1),
             0 0  0 2px rgb(190, 190, 190),
             0.3em 0.3em 1em rgba(0,0,0,0.3);

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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 16px;
  padding: 16px;
`

export const Paragrafo = styled.p``;
