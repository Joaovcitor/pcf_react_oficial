import styled from "styled-components";

export const Div = styled.div`
 display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 20px;

  p {
    font-size: 18px;
    color: white;
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
background-color: #2DA657;
width: 250px;
margin: 0 auto;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;

  p {
    font-size: 16px;
    margin: 10px 0;
  }

  a {
    display: inline-block;
    background-color: blue;
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    text-decoration: none;
    font-size: 14px;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 0 auto;

    &:hover {
      background-color: #0056b3;
    }
  }
`;
