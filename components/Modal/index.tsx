import React from 'react';
import dynamic from 'next/dynamic';

import {Modal as MuiModal, Container, Box, Typography, IconButton} from '@mui/material';
import {Close} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from 'store';
import {closeModal} from 'store/Modal';

const TextEditor = dynamic(() => import('components/TextEditor'), {
  ssr: false
});
const Modal = () => {
  const dispatch = useDispatch<AppDispatch>();

  const modalState = useSelector((state: RootState) => state.ModalSlice);

  const handleClose = () => {
    dispatch(closeModal());
  };
  return (
    <MuiModal
      open={modalState.open}
      onClose={handleClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          backgroundColor: 'white',
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 3
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography component="h3" variant="h5">
            {modalState.title}
          </Typography>
          <IconButton color={'error'} onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
        <Box
          dangerouslySetInnerHTML={{
            __html: modalState.content
          }}
        />
        <Box>
          {modalState.type === 'add' && (
            <React.Suspense fallback={`Loading...`}>
              <TextEditor />
            </React.Suspense>
          )}
        </Box>
      </Container>
    </MuiModal>
  );
};

export default Modal;
