import {Box, Typography} from '@mui/material';
import {Container} from '@mui/system';
import React, {FC} from 'react';

const Loading: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw'
      }}
    >
      <Container
        sx={{
          textAlign: 'center',
          color: 'GrayText'
        }}
      >
        <Typography component="h1" variant="h4">
          Loading...
        </Typography>
      </Container>
    </Box>
  );
};

export default Loading;
