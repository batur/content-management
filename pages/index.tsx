import React from 'react';
import type {NextPage} from 'next';
import {Box, Container} from '@mui/material';

import dynamic from 'next/dynamic';

const TextEditor = dynamic(() => import('components/TextEditor'), {
  suspense: true,
  ssr: false,
  loading: () => <div>Loading...</div>
});

const Home: NextPage = () => {
  return (
    <Box>
      <Container>
        <h1>Hello World</h1>
        <React.Suspense fallback={<div>Loading...</div>}>
          <TextEditor />
        </React.Suspense>
      </Container>
    </Box>
  );
};

export default dynamic(() => Promise.resolve(Home), {
  ssr: false
});
