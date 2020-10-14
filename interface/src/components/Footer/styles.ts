/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';

export const Container = styled.div`
  background: transparent;
  padding: 15px;
  > p {
    margin-top: 45px;
    color: var(--text-color);
    font-size: 12px;
    font-weight: 500;
    text-align: center;

    > a {
      text-decoration: none;
      color: var(--color-primary);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
    }
  }
`;
