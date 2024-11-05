import styled from "styled-components";

export const Div = styled.div`
 display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Coluna única para telas menores */
  }

  p {
    font-size: 18px;
    color: white;
  }

  h2 {
    color: white;
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

export const Section = styled.section`
  width: 300px;
  padding: 10px;
  margin: 20px;
  border-radius: 1rem;
  background-color: #4158D0;
  background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
  rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
  rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset,
  rgba(0, 0, 0, 0.06) 0px 2px 1px,
  rgba(0, 0, 0, 0.09) 0px 4px 2px,
  rgba(0, 0, 0, 0.09) 0px 8px 4px,
  rgba(0, 0, 0, 0.09) 0px 16px 8px,
  rgba(0, 0, 0, 0.09) 0px 32px 16px;

  p {
    font-size: 16px;
    margin: 10px 0;
  }

  a {
    appearance: none;
 background-color: transparent;
 border: 0.125em solid #1A1A1A;
 border-radius: 0.9375em;
 box-sizing: border-box;
 color: white;
 cursor: pointer;
 display: inline-block;
 font-family: Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
 font-size: 16px;
 font-weight: 600;
 line-height: normal;
 margin: 0 auto;
 min-height: 3.75em;
 min-width: 0;
 outline: none;
 padding: 1em 2.3em;
 text-align: center;
 text-decoration: none;
 transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
 user-select: none;
 -webkit-user-select: none;
 touch-action: manipulation;
 will-change: transform;
 width: 140px;

    &:hover {
      color: #fff;
 background-color: #1A1A1A;
 box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
 transform: translateY(-2px);
    }
    &:active {
      box-shadow: none;
 transform: translateY(0);
    }
  }

  .links {
    display: flex;
  }
`;
