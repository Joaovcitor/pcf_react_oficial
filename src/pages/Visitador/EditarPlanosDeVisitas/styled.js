import styled from "styled-components";

export const Div = styled.form`
  display: flex;
  flex-direction: column;
  width: 350px; /* A little wider for better spacing */
  background: #f8f9fa; /* Softer background color */
  border-radius: 12px; /* Slightly more rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* More subtle shadow */
  padding: 20px; /* Increased padding */
  margin: 30px auto; /* Centered with margin */
  font-family: "Arial", sans-serif; /* Modern font */

  h2 {
    color: #343a40; /* Darker heading color */
    margin-bottom: 15px; /* Space below the heading */
    text-align: center; /* Center the heading */
  }

  p {
    font-size: 16px; /* Slightly smaller font size */
    color: #343a40; /* Darker text color */
    margin-bottom: 5px; /* Space below the label */
  }

  label {
    /* Added label for better accessibility and styling */
    font-size: 14px;
    color: #6c757d; /* Lighter label color */
    margin-bottom: 5px;
  }

  select,
  textarea,
  input {
    width: 100%; /* Make input fields full width */
    padding: 10px; /* Increased padding */
    margin-bottom: 15px; /* Space below input fields */
    border: 1px solid #ced4da; /* Light gray border */
    border-radius: 6px; /* Rounded corners */
    background-color: #fff; /* White background for inputs */
    color: #343a40; /* Dark input text color */
    font-size: 16px;
    transition:
      border-color 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out; /* Smooth transitions */

    &:focus {
      border-color: #80bdff; /* Highlight on focus */
      outline: 0;
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); /* Subtle focus ring */
    }
  }

  select {
    appearance: none; /* Remove default select arrow */
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M2 5l8 8 8-8'/%3e%3c/svg%3e"); /* Custom arrow */
    background-repeat: no-repeat;
    background-position: right 10px center;
    padding-right: 30px; /* Space for the arrow */
  }

  textarea {
    resize: vertical; /* Allow vertical resizing only */
    height: 120px; /* Slightly taller textarea */
  }

  input[type="submit"] {
    /* Style the submit button */
    background-color: #007bff; /* Blue button */
    color: #fff;
    cursor: pointer;
    border: none;
    &:hover {
      background-color: #0069d9; /* Darker blue on hover */
    }
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
