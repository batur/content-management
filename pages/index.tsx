import React from 'react';
import type {NextPage} from 'next';

import {api} from 'hooks';
import MainLayout from 'layouts/MainLayout';
import {Content, Modal} from 'components';
import {Box} from '@mui/system';
import {Button} from '@mui/material';
import {Add} from '@mui/icons-material';
import {useSetAtom} from 'jotai';
import ModalAtom from 'store/Modal';

const Home: NextPage = () => {
  const setModalState = useSetAtom(ModalAtom);
  const {data: contents} = api.useGetAllContent();

  function handleAddContent() {
    setModalState({
      open: true,
      title: 'Add Content',
      content: '',
      type: 'add'
    });
  }
  return (
    <MainLayout>
      <Box
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 4,
          width: '100%'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%'
          }}
        >
          <Button size="large" variant="contained" color="success" startIcon={<Add />} onClick={handleAddContent}>
            Add New
          </Button>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            width: '100%'
          }}
        >
          {contents?.map((content: Content, index: number) => (
            <Content key={index} content={content} />
          ))}
        </Box>
      </Box>
      <Modal />
    </MainLayout>
  );
};

export default Home;
