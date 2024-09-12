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

export const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
  width: 20px;
  height: 20px;
  border: 2px solid #007bff;
  border-radius: 4px;
  cursor: pointer;
  outline: none;

  &:checked {
    background-color: #0CF25D;
    border-color: #007bff;
  }

  &:checked::after {
    content: '✔';
    display: block;
    color: white;
    text-align: center;
    font-size: 14px;
    line-height: 20px;
  }

  &:hover {
    border-color: #0056b3;
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
}

input {
  height: 40px;
  font-size: 18px;
  border: 1px solid #0D0D0D;
  padding: 0 10px;
  border-radius: 4px;
  &:focus {
    border: 1px solid red;
  }
}
`;
