import styled from "styled-components";

export const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  p {
    font-size: 18px;
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

export const Section = styled.section`
background-color: #F2B705;
display: flex;
justify-content: center;
text-align: center;
flex-direction: column;
padding: 10px;
margin: 20px;
border-radius: 2px 35px 2px 35px;

`;
