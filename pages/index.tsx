import React from 'react';
import type {NextPage} from 'next';

import MainLayout from 'layouts/MainLayout';
import {Content, Modal} from 'components';
import {Box} from '@mui/system';
import {Button, useMediaQuery, useTheme} from '@mui/material';
import {Add} from '@mui/icons-material';
import {openModal} from 'store/Modal';

import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from 'store';

const Home: NextPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  const theme = useTheme();
  const mediumBreakpoint = useMediaQuery(theme.breakpoints.up('md'));

  const contents = useSelector((state: RootState) => state.ContentSlice.contents);

  function handleAddContent() {
    dispatch(
      openModal({
        open: true,
        title: 'Add Content',
        content: '',
        type: 'add'
      })
    );
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
