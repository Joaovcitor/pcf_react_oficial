import styled from "styled-components";

export const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

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

export const Form = styled.form`
margin-top: 20px;
display: flex;
flex-direction: column;

input {
  margin-bottom: 20px;
  height: 40px;
  padding: 0 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  &:focus {
  border: 1px solid #05F2C7;
}}
`;
