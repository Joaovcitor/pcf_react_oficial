import styled from "styled-components";

export const Div = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 330px;
  background: white;
  border-radius: 10px;
  transition: border-radius 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow:
    inset 0 -3em 3em rgba(0, 0, 0, 0.1),
    0 0 0 2px rgb(190, 190, 190),
    0.3em 0.3em 1em rgba(0, 0, 0, 0.3);
  padding: 10px;
  margin: 0 auto;
  margin-top: 30px;

  h2 {
    color: black;
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
  }

  option {
    color: black;
  }

  textarea {
    width: 250px;
    height: 100px;
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
    color: #f2b441;
    font-weight: bolder;
  }

  p {
    color: white;
  }

  .link {
    color: black;
    display: flex;
    background-color: #f2b441;
    padding: 5px;
    border-radius: 4px;
    width: 120px;
    margin: 0 auto;
    text-align: center;
    justify-content: center;
    margin-top: 10px;
  }
`;
