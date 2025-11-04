import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #ffeef8 0%, #f8e8ff 50%, #e8f4fd 100%);
  padding: 2rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  h1 {
    font-size: 2.5rem;
    color: #8b5a8c;
    margin-bottom: 0.5rem;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(139, 90, 140, 0.1);
    
    &::before {
      content: "🤱";
      margin-right: 1rem;
      font-size: 3rem;
    }
    
    @media (max-width: 768px) {
      font-size: 2rem;
      
      &::before {
        font-size: 2.5rem;
      }
    }
  }
  
  .subtitle {
    font-size: 1.2rem;
    color: #6b7280;
    font-weight: 400;
    margin-bottom: 1rem;
  }
  
  .count-badge {
    display: inline-flex;
    align-items: center;
    background: linear-gradient(135deg, #f472b6, #ec4899);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    font-weight: 600;
    font-size: 1.1rem;
    box-shadow: 0 4px 15px rgba(244, 114, 182, 0.3);
    
    &::before {
      content: "📋";
      margin-right: 0.5rem;
      font-size: 1.2rem;
    }
  }
`;

export const Div = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const Section = styled.section`
  background: linear-gradient(145deg, #ffffff, #fef7ff);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 
    0 10px 30px rgba(139, 90, 140, 0.1),
    0 1px 8px rgba(139, 90, 140, 0.05);
  border: 1px solid rgba(244, 114, 182, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #f472b6, #ec4899, #d946ef);
    border-radius: 20px 20px 0 0;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 20px 40px rgba(139, 90, 140, 0.15),
      0 5px 15px rgba(139, 90, 140, 0.1);
  }

  .plan-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(244, 114, 182, 0.1);

    .plan-icon {
      font-size: 2rem;
      margin-right: 1rem;
    }

    .plan-date {
      background: linear-gradient(135deg, #fef3f4, #fdf2f8);
      color: #be185d;
      padding: 0.5rem 1rem;
      border-radius: 15px;
      font-size: 0.9rem;
      font-weight: 600;
      border: 1px solid rgba(244, 114, 182, 0.2);
    }
  }

  .plan-content {
    margin-bottom: 2rem;

    .objective {
      background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
      padding: 1rem;
      border-radius: 12px;
      margin-bottom: 1rem;
      border-left: 4px solid #0ea5e9;

      .label {
        font-size: 0.8rem;
        color: #0369a1;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;

        &::before {
          content: "🎯";
          margin-right: 0.5rem;
        }
      }

      .text {
        color: #0c4a6e;
        font-size: 1rem;
        line-height: 1.5;
        font-weight: 500;
      }
    }

    .difficulty {
      background: linear-gradient(135deg, #fef3c7, #fde68a);
      padding: 0.75rem 1rem;
      border-radius: 10px;
      margin-bottom: 1.5rem;
      border-left: 4px solid #f59e0b;

      .label {
        font-size: 0.8rem;
        color: #92400e;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 0.3rem;
        display: flex;
        align-items: center;

        &::before {
          content: "⭐";
          margin-right: 0.5rem;
        }
      }

      .text {
        color: #78350f;
        font-size: 0.95rem;
        font-weight: 500;
      }
    }

    .moments {
      .moment {
        background: linear-gradient(135deg, #f0fdf4, #dcfce7);
        padding: 1rem;
        border-radius: 12px;
        margin-bottom: 0.75rem;
        border-left: 4px solid #22c55e;

        .label {
          font-size: 0.8rem;
          color: #15803d;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;

          &::before {
            content: "📝";
            margin-right: 0.5rem;
          }
        }

        .text {
          color: #14532d;
          font-size: 0.95rem;
          line-height: 1.5;
          font-weight: 400;
        }
      }
    }
  }

  .plan-actions {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
  }

  a {
    background: linear-gradient(135deg, #f472b6, #ec4899);
    color: white;
    padding: 1rem 2rem;
    border-radius: 50px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1rem;
    display: inline-flex;
    align-items: center;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 15px rgba(244, 114, 182, 0.3);
    border: none;
    cursor: pointer;

    &::before {
      content: "👁️";
      margin-right: 0.5rem;
      font-size: 1.1rem;
    }

    &:hover {
      background: linear-gradient(135deg, #ec4899, #db2777);
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(244, 114, 182, 0.4);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 4px 15px rgba(244, 114, 182, 0.3);
    }
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
  padding: 2rem;

  button {
    background: linear-gradient(135deg, #f472b6, #ec4899);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(244, 114, 182, 0.3);

    &:disabled {
      background: linear-gradient(135deg, #d1d5db, #9ca3af);
      cursor: not-allowed;
      box-shadow: none;
    }

    &:not(:disabled):hover {
      background: linear-gradient(135deg, #ec4899, #db2777);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(244, 114, 182, 0.4);
    }
  }

  .page-info {
    background: white;
    padding: 0.75rem 1.5rem;
    border-radius: 25px;
    color: #8b5a8c;
    font-weight: 600;
    box-shadow: 0 2px 10px rgba(139, 90, 140, 0.1);
    border: 1px solid rgba(244, 114, 182, 0.2);
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  color: #8b5a8c;

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(244, 114, 182, 0.2);
    border-top: 4px solid #f472b6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-bottom: 1rem;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  p {
    font-size: 1.2rem;
    font-weight: 500;
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  color: #dc2626;

  .error-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    font-weight: 500;
    text-align: center;
  }
`;

export const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  color: #6b7280;

  .empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    font-weight: 500;
    text-align: center;
  }
`;
