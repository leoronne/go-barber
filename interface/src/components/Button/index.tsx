import React from 'react';

import DotLoaderComp from '../DotLoaderComp';

import { Container } from './styles';

interface Props {
  loading: boolean;
  size: number;
  defaultText: string;
  disableCond: boolean;
}

const Button: React.FC<Props> = ({ loading, size, defaultText, disableCond }) => {
  return (
    <Container>
      <button type={!loading ? 'submit' : 'button'} className="btn-primary-custom" disabled={disableCond}>
        <DotLoaderComp loading={loading} size={size} color="#fff" defaultText={defaultText} />
      </button>
    </Container>
  );
};

export default Button;
