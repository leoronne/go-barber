import styled, { css } from 'styled-components';

import { RiMoonLine, RiSunLine } from 'react-icons/ri';

import signinbgRight from '~assets/img/background.png';
import signinbgLeft from '~assets/img/background-left.png';

interface ContainerProps {
  direction: string;
}

const iconCSS = css`
  margin-top: 3px;
  width: 15px;
  height: 15px;
  fill: var(--light-grey);
  color: var(--light-grey);
  cursor: pointer;
`;

export const Container = styled.div<ContainerProps>`
  display: flex;
  align-items: center;
  height: 100vh;
  transition: all 0.5s ease;
  position: relative;

  @media (min-width: 760px) {
    background: ${props => (props.direction === 'left' ? `url(${signinbgLeft})` : `url(${signinbgRight})`)} no-repeat center;
    background-size: auto 100%;
    background-position: top ${props => (props.direction === 'left' ? `left` : `right`)};
    transition: all 0.5s ease;
    justify-content: ${props => (props.direction === 'left' ? `flex-end` : `flex-start`)};
  }
`;

export const Logo = styled.div<ContainerProps>`
  position: absolute;
  top: 0;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  width: 260px;
  justify-content: space-between;
  transition: all 0.5s ease;

  img {
    width: 31px;
    height: 31px;
  }

  a {
    text-decoration: none;
    height: 100%;
    display: flex;
    align-items: center;
  }

  span {
    font-size: 20px;
    font-weight: 500;
    color: var(--title-color);
  }

  @media (min-width: 768px) {
    flex-direction: ${props => (props.direction === 'left' ? `row-reverse` : `row`)};
  }
`;

export const Main = styled.div`
  width: 100%;
  height: calc(100% - 71px);
  margin-top: 71px;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  flex-direction: column;
`;

export const MoonIcon = styled(RiMoonLine)`
  ${iconCSS}
`;

export const SunIcon = styled(RiSunLine)`
  ${iconCSS}
`;
