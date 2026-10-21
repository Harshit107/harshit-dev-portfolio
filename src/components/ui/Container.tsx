import styled from 'styled-components';
import { breakpoints } from '../../theme/theme';

export const Container = styled.div<{ $wide?: boolean }>`
  width: 100%;
  max-width: ${({ $wide }) => ($wide ? '1440px' : '1200px')};
  margin: 0 auto;
  padding: 0 1.5rem;

  @media (min-width: ${breakpoints.tablet}) {
    padding: 0 2rem;
  }

  @media (min-width: ${breakpoints.desktop}) {
    padding: 0 3rem;
  }
`;
