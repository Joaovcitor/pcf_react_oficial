import styled from "styled-components";

export const Div = styled.form`
  display: flex;
  flex-direction: column;
  width: 330px;
  padding: 10px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  background: white;
  border-radius: 10px;
  transition: border-radius 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow:
    inset 0 -3em 3em rgba(0, 0, 0, 0.1),
    0 0 0 2px rgb(190, 190, 190),
    0.3em 0.3em 1em rgba(0, 0, 0, 0.3);
  align-items: center;

  h2 {
    color: black;
    text-align: center;
  }

  textarea {
    padding: 10px;
    font-family: Arial, Helvetica, sans-serif;
  }

  button {
    margin-top: 20px;
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
    color: black;
    font-weight: bolder;
    width: 180px;
    text-align: center;
    font-size: 18px;
    margin: 0 auto;
  }

  option {
    color: black;
    background-color: transparent;
    font-size: 20px;
  }

  textarea {
    width: 300px;
    height: 150px;
    font-size: 18px;
    padding: 4px;
  }

  input {
    border: none;
    border-bottom: solid 1px black;
    background-color: transparent;
    /* color: white; */
    text-align: center;
    font-size: 18px;
    margin-top: 10px;
  }
`;
