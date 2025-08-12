import styled from "styled-components";

export const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  padding: 20px;
  background-color: #f9fafc;
  border-radius: 16px;
  width: 85%;
  margin: 20px auto;

  @media (max-width: 768px) {
    width: 95%;
  }
`;

export const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;

  h4 {
    width: 100%;
    font-size: 1.4rem;
    font-weight: bold;
    color: #0367a6;
    text-align: center;
    margin-bottom: 10px;
    border-bottom: 2px solid #e0e0e0;
    padding-bottom: 5px;
  }

  div {
    background: white;
    border-radius: 12px;
    padding: 1rem;
    border: 1px solid #e0e0e0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    color: #333;
    width: 260px;
    text-align: left;
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }
  }

  .links {
    display: inline-block;
    background-color: #0367a6;
    color: white;
    font-weight: 600;
    padding: 6px 12px;
    margin-top: 8px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    text-align: center;
    transition: background 0.2s ease;

    &:hover {
      background-color: #024d7a;
    }
  }

  p {
    margin: 6px 0 0;
    font-size: 0.9rem;
    color: #555;
  }

  span {
    font-weight: bold;
    color: #222;
    display: block;
    margin-bottom: 8px;
  }
`;
