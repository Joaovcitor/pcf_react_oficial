import styled from "styled-components";

export const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h2 {
    color: white;
  }

  p {
    font-size: 18px;
    /* margin-left: 15px; */
    color: black;
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

export const Nav = styled.nav`
  background-color: blue;
  padding: 20px;
  border-radius: 10px;
  box-shadow: -10px -2px 0px 0px rgba(0,0,0,0.75);
  -webkit-box-shadow: -10px -2px 0px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: -10px -2px 0px 0px rgba(0,0,0,0.75);

  span {
    color: #F2B441;
    font-weight: bolder;
  }

  p {
    color: white;
  }

  .link {
    color: black;
    display: flex;
    background-color: #F2B441;
    padding: 5px;
    border-radius: 4px;
    width: 120px;
    margin: 0 auto;
    text-align: center;
    justify-content: center;
    margin-top: 10px;
  }

`;
