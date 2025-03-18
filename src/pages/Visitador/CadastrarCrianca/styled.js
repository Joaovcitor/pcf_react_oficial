import styled from "styled-components";

export const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* background-color: #04bf8a; */
  background-color: #053f5c;

  width: 300px;
  padding: 20px;
  margin: 0 auto;
  border-radius: 20px;
  margin-top: 20px;

  span {
    color: #9fe7f5;
  }

  h2 {
    font-size: 18px;
    /* margin-left: 15px; */
    color: white;
    text-align: center;
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

export const Label = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

export const RadioInput = styled.input`
  appearance: none;
  width: 10px;
  height: 10px;
  border: 2px solid #007bff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:checked {
    background-color: #007bff;
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const StyledCheckbox = styled.input`
  width: 20px;
  height: 20px;
  border: 2px solid #007bff;
  border-radius: 4px;
  cursor: pointer;
  outline: none;

  &:checked {
    background-color: #0cf25d;
    border-color: #007bff;
  }

  &:checked::after {
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
    color: rgb(255, 255, 255);
    font-weight: bolder;
  }

  input {
    height: 40px;
    font-size: 18px;
    border: 1px solid rgb(0, 0, 0);
    padding: 0 10px;
    border-radius: 4px;
    &:focus {
      border: 1px solid #7663f2;
    }
  }

  button {
    /* background-color: #e688f2; */
    background-color: #f7ad19;
    color: black;
    width: 120px;
    margin: 0 auto;
  }
`;
