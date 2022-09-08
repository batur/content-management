import React from 'react';
import type {NextPage} from 'next';

import {api} from 'hooks';
import MainLayout from 'layouts/MainLayout';
import {Content, Loading, Modal} from 'components';
import {Box} from '@mui/system';
import {Button, useMediaQuery, useTheme} from '@mui/material';
import {Add} from '@mui/icons-material';
import {useSetAtom} from 'jotai';
import ModalAtom from 'store/Modal';

const Home: NextPage = () => {
  const auth = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth');
    } else {
      return null;
    }
  };

  const theme = useTheme();
  const mediumBreakpoint = useMediaQuery(theme.breakpoints.up('md'));

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

  if (!auth()) {
    return <Loading />;
  }

  return (
    <MainLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 4,
          width: '100%',
          height: mediumBreakpoint ? 'auto' : 'calc(100vh - 96px)',
          overflow: mediumBreakpoint ? 'auto' : 'scroll'
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
            paddingY: mediumBreakpoint ? 2 : 0,
            paddingTop: mediumBreakpoint ? 0 : 6,
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
