// Mantineを使うために必要なやつ
import { MantineProvider, createTheme } from '@mantine/core';
import type { ReactNode } from 'react';

const theme = createTheme({
  breakpoints: {
    xs: '40em',
    sm: '48em',
    md: '64em',
    lg: '80em',
    xl: '96em',
  },
});

interface Props {
  readonly children: ReactNode;
}

export default function CustomMantineProvider({ children }: Props) {
  return (
    <MantineProvider theme={theme}>
      {children}
    </MantineProvider>
  );
}