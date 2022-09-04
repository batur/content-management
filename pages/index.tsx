import React from 'react';
import type {NextPage} from 'next';
import {Box, Card, CardContent, Container} from '@mui/material';

import dynamic from 'next/dynamic';
import {api} from 'hooks';

const TextEditor = dynamic(() => import('components/TextEditor'), {
  suspense: true,
  ssr: false,
  loading: () => <div>Loading...</div>
});

const Home: NextPage = () => {
  const {data: contents} = api.useGetAllContent();

  return (
    <Box>
      <Container>
        <h1>Hello World</h1>
        <React.Suspense fallback={<div>Loading...</div>}>
          <TextEditor />
        </React.Suspense>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            gap: 4
          }}
        >
          {contents &&
            contents.map((content: Contents, index: number) => (
              <Card key={index}>
                <CardContent>{`${content.user.id}- ${content.user.username}`}</CardContent>
                <CardContent dangerouslySetInnerHTML={{__html: content.content}} />
              </Card>
            ))}
        </Box>
      </Container>
    </Box>
  );
};

export default dynamic(() => Promise.resolve(Home), {
  ssr: false
});
