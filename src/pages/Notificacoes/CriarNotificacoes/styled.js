import styled from "styled-components";

export const Div = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #F28705;
  width: 350px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 10px;
  border-radius: 5px;
  text-align: center;

  h2 {
    color: white;
  }

  p {
    font-size: 18px;
    /* margin-left: 15px; */
    color: black;
    margin-top: 10px;
  }

  select {
    border: solid 1px black;
    padding: 5px;
    border-radius: 5px;
    background-color: transparent;
    color: white;
    font-weight: bolder;
    width: 180px;
    text-align: center;
    font-size: 18px;
  }

  option {
    color: black;
    background-color: transparent;
    font-size: 20px;
  }



  textarea {
    width: 280px;
    height: 100px;
    font-size: 18px;
  }

  input {
    border: none;
    border-bottom: solid 1px black;
    background-color: transparent;
    color: white;
    text-align: center;
    font-size: 18px;
    margin-top: 10px;
  }
`;

export const Nav = styled.nav`
  background-color: blue;
  padding: 10px;
  border-radius: 10px;

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