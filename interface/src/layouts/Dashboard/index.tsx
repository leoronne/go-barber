import React from 'react';
import { Header } from '../../components';

import { Container } from './styles';

interface Props {
  direction?: 'left' | 'right' | null;
  title?: string;
}

const Dashboard: React.FC<Props> = ({ title, children }) => {
  document.title = `${title ? `${title} | ` : ''}Go Barber`;

  return (
    <Container>
      <Header />
      {children}
    </Container>
  );
};

export default Dashboard;
