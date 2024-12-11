import styled from "styled-components";

export const Questionnaire = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Question = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

export const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: black;
`;

export const Answers = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const AnswerLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: black;
`;

export const Area = styled.div`
  font-size: 12px;
  font-style: italic;
  color: #555;
  margin-top: 10px;
`;

export const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
