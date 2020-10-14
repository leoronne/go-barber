import styled from 'styled-components';
import { MdEmail, MdPowerSettingsNew, MdKeyboardArrowDown } from 'react-icons/md';

import { FaUserCircle } from 'react-icons/fa';

export const Container = styled.div`
  margin: 0 15px 0 5px;
  display: flex;
  align-items: center;

  .icon-button {
    margin-top: 3px;
    font-size: 22px;
    cursor: pointer;
  }

  .titleDropdown {
    font-family: var(--font-family);
    font-size: 14px !important;
  }
`;

export const Toggler = styled(MdKeyboardArrowDown) <{ open: boolean }>`
  color: ${props => (props.open ? 'var(--color-primary)' : 'var(--color-primary-lighter)')};
  cursor: pointer;
`;

export const LogoutIcon = styled(MdPowerSettingsNew)`
  color: var(--color-primary);
`;

export const UserIcon = styled(FaUserCircle)`
  color: var(--disabled);
`;

export const MailIcon = styled(MdEmail)`
  color: var(--disabled);
`;
