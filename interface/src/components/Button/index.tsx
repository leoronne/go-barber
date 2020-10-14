import React from 'react';
import { useTranslation } from 'react-i18next';
import { CircularProgress } from '@material-ui/core';

import { Container } from './styles';

interface Props {
  loading: boolean;
  text: string;
}

export const ButtonContent: React.FC<Props> = ({ loading, text }) => {
  const { t } = useTranslation();
  return <Container>{loading ? <CircularProgress size={15} style={{ color: '#ccc' }} /> : <span>{t(text)}</span>}</Container>;
};

const Button: React.FC = () => {
  return (
    <Container>
      <h1>Button</h1>
    </Container>
  );
};

export default Button;
