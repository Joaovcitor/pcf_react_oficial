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
