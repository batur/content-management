import React, {FC} from 'react';

import {Box, Container} from '@mui/material';

type Props = {
  children: React.ReactNode;
};

const MainLayout: FC<Props> = ({children}) => {
  return (
    <Box>
      <Container
        sx={{
          display: 'flex',
          alignItems: 'flex-start'
        }}
        maxWidth="xl"
        component="main"
      >
        <Box component="header"></Box>
        <Box component="section" maxWidth="md" width="100%">
          {children}
        </Box>
      </Container>
    </Box>
  );
};

export default React.memo(MainLayout);
