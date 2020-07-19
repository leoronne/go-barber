import styled from 'styled-components';

export const Container = styled.div`
  grid-area: HD;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  background-color: var(--secondary);
  padding: 10px;
  line-height: 1.9;
  -webkit-box-shadow: var(--box-shadow);
  -moz-box-shadow: var(--box-shadow);
  box-shadow: var(--box-shadow);
  z-index: 2;

  @media (min-width: 320px) {
    .header-left {
      margin-left: 0px;
    }

    .header-right {
      margin-right: 0px;
    }

    .header-title {
      display: none;
    }
  }

  @media (min-width: 480px) {
    .header-left {
      margin-left: 15px;
    }

    .header-right {
      margin-right: 15px;
    }

    .header-title {
      display: flex;
    }
  }

  .header-cointainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    height: 40px;
  }

  .header-left {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .header-title {
    font-weight: 600;
    color: var(--primary);
    margin-left: 15px;
  }

  .header-right {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .logo {
    max-width: 40px;
  }

  .nav-profile {
    width: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .nav-profile span {
    font-size: 14px;
    margin-left: 10px;
    text-decoration: none;
  }

  .icon-profile-active {
    width: 100%;
    color: var(--quaternary);
    font-weight: 600;
    height: 36px;
    background-color: var(--terciary);
    border-radius: 18px;
    padding: 5px;
    margin: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: filter 300ms;
  }

  .icon-profile-active:hover {
    filter: brightness(1.2);
  }

  .avatar-profile {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  a {
    height: 100%;
    text-decoration: none;
    transition: var(--filter-transition);
  }

  a:hover {
    text-decoration: none;
    filter: var(--hover-effect);
  }
`;
