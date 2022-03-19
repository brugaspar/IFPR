import styled from "styled-components";

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 0;

  > p,
  h2 {
    margin: 1rem 0.5rem;
    line-height: 1.25rem;
  }

  .content {
    border: 1px solid #a1a1a1;
    border-radius: 0.25rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .question {
      &:not(:last-child) {
        border-bottom: 1px solid #a1a1a1;
        padding-bottom: 1rem;
      }

      .grade {
        margin-left: 0.5rem;
      }

      > textarea {
        margin: 1rem 0 0;
        width: 100%;
        max-height: 200px;
        min-height: 48px;
        resize: vertical;
        padding: 0.5rem;
      }

      .alternatives {
        margin: 1rem 0 0 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.8rem;

        div {
          display: flex;
          gap: 0.5rem;
          align-items: center;

          input {
            width: 15px;
            height: 15px;
          }
        }
      }
    }
  }
`;
