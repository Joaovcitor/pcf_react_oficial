import styled from "styled-components";

export const Div = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  border-radius: 4px;
  width: 310px;
  padding: 15px;
  margin: 0 auto;
  margin-top: 20px;
  text-align: center;

  p {
    font-size: 18px;
    /* margin-left: 15px; */
    color: black;
  }

  input {
    border: none;
    border-bottom: solid 1px black;
    background-color: transparent;
    color: black;
    text-align: center;
    font-size: 18px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    color: black;
    font-weight: bold;
  }

  input {
    height: 40px;
    font-size: 18px;
    border: 1px solid rgb(0, 0, 0);
    padding: 0 10px;
    border-radius: 4px;
    &:focus {
      border: 1px solid green;
    }
  }
`;
