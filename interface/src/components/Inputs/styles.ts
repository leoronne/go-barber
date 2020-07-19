import styled, { css } from 'styled-components';

import { Eye, EyeWithLine, Email, Key } from 'styled-icons/entypo';
import { User } from 'styled-icons/boxicons-solid';

import { IconProps } from '.';

const iconCSS = css`
  width: 20px;
  height: 20px;
  color: var(--primary);
  cursor: pointer;
`;

export const Content = styled.div`
  margin-bottom: 20px;
  text-align: left;

  label {
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 5px !important;
  }

  input {
    width: 100% !important;
    margin-top: 10px;
    padding: 10px !important;
    padding-left: 36px !important;
  }

  input:focus ~ svg {
    color: var(--primary);
  }

  .eyeslash-span,
  .eye-span {
    float: right;
    margin-right: 12px;
    margin-top: -34px;
    position: relative;
    z-index: 2;
    height: 40px;
  }

  .placeholder-icon {
    float: left;
    margin-left: 9px;
    margin-top: -34px;
    position: relative;
    z-index: 2;
    height: 40px;
  }

  .error {
    border: 1px solid var(--error) !important;
  }

  .error-message {
    color: var(--error);
    padding: 1px 2px;
    position: absolute;
    font-size: 10px;
    margin: 0px 0 5px 0;
  }
`;

export const EyeIcon = styled(Eye)`
  ${iconCSS}
`;

export const EyeSlashIcon = styled(EyeWithLine)`
  ${iconCSS}
`;

export const MailIcon = styled(Email)<IconProps>`
  width: 15px;
  height: 15px;
  color: ${props => (props.color ? props.color : 'color: var(--light-gray)')};
  transition: 0.9s ease;
`;

export const KeyIcon = styled(Key)<IconProps>`
  width: 15px;
  height: 15px;
  color: ${props => (props.color ? props.color : 'color: var(--light-gray)')};
  transition: 0.9s ease;
`;

export const UserIcon = styled(User)<IconProps>`
  width: 15px;
  height: 15px;
  color: ${props => (props.color ? props.color : 'color: var(--light-gray)')};
  transition: 0.9s ease;
`;
