import styled, { css } from 'styled-components';

import { RiMoonLine, RiSunLine } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';

const iconCSS = css`
  margin-top: 3px;
  width: 15px;
  height: 15px;
  fill: var(--light-grey);
  color: var(--light-grey);
  cursor: pointer;
`;

export const Container = styled.header`
  padding: 15px 40px;
  background: var(--dark-grey);
  box-shadow: var(--box-shadow);
  width: 100%;
`;

export const HeaderContent = styled.div`
  margin: 0 auto;
  display: flex;
  align-items: center;

  justify-content: space-between;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  width: 180px;
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
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  @media (min-width: 640px) {
    min-width: 300px;
    justify-content: space-between;
  }
`;

export const Profile = styled.div`
  display: none;
  align-items: center;
  width: 180px;
  justify-content: space-evenly;
  padding: 5px;

  &.active {
    background: var(--calendar-background);
    border-radius: 25px;
    > a {
      color: var(--color-primary);
    }
  }

  a {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    font-weight: 500;
    text-decoration: none;
    color: var(--text-color);

    span {
      font-size: 20px;
      max-width: 120px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }

  @media (min-width: 640px) {
    display: flex;
  }
`;

export const MoonIcon = styled(RiMoonLine)`
  ${iconCSS}
`;

export const SunIcon = styled(RiSunLine)`
  ${iconCSS}
`;

export const UserIcon = styled(FaUserCircle)`
  color: var(--disabled);
`;
