import styled from 'styled-components';

import { SocialGithub } from 'styled-icons/foundation';

export const Container = styled.div`
  grid-area: FT;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--secondary);
  padding: 10px;
  line-height: 1.9;

  p {
    font-size: 12px;
    color: var(--quaternary);
  }
  
  a {
    transition: var(--filter-transition);
  }

  a:hover {
    text-decoration: none;
    filter: var(--hover-effect);
  }
`;

export const GithubIcon = styled(SocialGithub)`
  width: 20px;
  height: 20px;
  color: var(--quaternary);
`;
