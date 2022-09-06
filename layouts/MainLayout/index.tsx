import React, {FC} from 'react';

import {Box, Button, Container, useMediaQuery, useTheme} from '@mui/material';

import {ExitToApp} from '@mui/icons-material';
import {useRouter} from 'next/router';
import {useSetAtom} from 'jotai';
import AuthAtom from 'store/Auth';

type Props = {
  children: React.ReactNode;
};

const MainLayout: FC<Props> = ({children}) => {
  const router = useRouter();
  const theme = useTheme();
  const mediumBreakpoint = useMediaQuery(theme.breakpoints.up('md'));

  const setAuth = useSetAtom(AuthAtom);

  const handleLogout = () => {
    router.push('/login');
    setAuth(null);
  };
  return (
    <Box>
      <Container
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexDirection: mediumBreakpoint ? 'row' : 'column-reverse',
          width: '100%',
          height: '100%',
          padding: 4
        }}
        maxWidth="lg"
        component="main"
      >
        <Box
          component="header"
          maxWidth="xs"
          display="flex"
          flexGrow={0}
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'stretch'
          }}
        >
          <Button variant="text" color="warning" startIcon={<ExitToApp />} onClick={handleLogout}>
            Log out
          </Button>
        </Box>
        <Box
          component="section"
          maxWidth="md"
          display="flex"
          flexGrow={1}
          sx={{
            width: '100%',
            height: mediumBreakpoint ? 'auto' : 'calc(100vh - 96px)'
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default React.memo(MainLayout);
